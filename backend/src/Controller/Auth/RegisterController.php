<?php

namespace App\Controller\Auth;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

// Contrôleur chargé de l'inscription des utilisateurs.
// Ce contrôleur expose le point d'entrée permettant à un nouvel utilisateur de créer un compte sur l'application Assurance Pro.
// Lors de l'inscription, le mot de passe est automatiquement chiffré avant d'être enregistré en base de données grâce au composant PasswordHasher de Symfony.
class RegisterController extends AbstractController
{   
    // Route api/register
    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    //Fonctionnement :
    // 1. Récupère les données JSON envoyées par le client.
    // 2. Vérifie la présence de l'adresse e-mail et du mot de passe.
    // 3. Hash le mot de passe.
    // 4. Attribue automatiquement le rôle ROLE_USER.
    // 5. Enregistre l'utilisateur dans la base de données.
    public function register(        
        Request $request, //@param Request $request Contient les données JSON de la requête.
        EntityManagerInterface $em, // @param EntityManagerInterface $em Gestionnaire Doctrine permettant de persister l'entité.
        UserPasswordHasherInterface $passwordHasher //  @param UserPasswordHasherInterface $passwordHasher Service Symfony de hachage des mots de passe.
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['email'], $data['password'])) {
            return $this->json([
                'error' => 'Email and password are required'
            ], 400);
        }

        $user = new User();
        $user->setEmail($data['email']);
        $user->setPassword(
            $passwordHasher->hashPassword($user, $data['password'])
        );
        $user->setRoles(['ROLE_USER']);

        $em->persist($user);
        $em->flush();

        return $this->json([
            'message' => 'User created successfully'
        ], 201);
    }
}
