<?php

namespace App\Command;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsCommand(
    name: 'app:create-admin',
    description: 'Créer un compte administrateur pour AssurPro',
)]
class CreateAdminCommand extends Command
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private UserPasswordHasherInterface $passwordHasher,
    ) {
        parent::__construct();
    }
    protected function configure(): void
    {
        $this
            ->setName('app:create-admin')
            ->setDescription('Créer un compte administrateur pour AssurPro');
    }

    protected function execute(
        InputInterface $input,
        OutputInterface $output
    ): int {
        $io = new SymfonyStyle($input, $output);

        // Demande et vérification de l'adresse e-mail.
        $email = $io->ask('Adresse e-mail de l’administrateur');

        if (!is_string($email) || !filter_var(trim($email), FILTER_VALIDATE_EMAIL)) {
            $io->error('Veuillez saisir une adresse e-mail valide.');

            return Command::FAILURE;
        }

        $email = strtolower(trim($email));

        // Vérifie qu'aucun compte n'utilise déjà cette adresse.
        $existingUser = $this->entityManager
            ->getRepository(User::class)
            ->findOneBy(['email' => $email]);

        if ($existingUser !== null) {
            $io->error('Un compte utilise déjà cette adresse e-mail.');

            return Command::FAILURE;
        }

        // Demande un mot de passe sans l'afficher dans le terminal.
        $password = $io->askHidden('Mot de passe (12 caractères minimum)');

        if (!is_string($password) || strlen($password) < 12) {
            $io->error('Le mot de passe doit contenir au moins 12 caractères.');

            return Command::FAILURE;
        }

        // Demande une confirmation du mot de passe.
        $confirmation = $io->askHidden('Confirmez le mot de passe');

        if (!is_string($confirmation) || $password !== $confirmation) {
            $io->error('Les deux mots de passe ne correspondent pas.');

            return Command::FAILURE;
        }

        // Création du compte administrateur.
        $user = new User();
        $user->setEmail($email);
        $user->setPassword(
            $this->passwordHasher->hashPassword($user, $password)
        );
        $user->setRoles(['ROLE_ADMIN']);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $io->success('Le compte administrateur a été créé avec succès.');

        return Command::SUCCESS;
    }
}
