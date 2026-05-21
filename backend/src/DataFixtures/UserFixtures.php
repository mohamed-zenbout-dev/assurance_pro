<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    public function __construct(
        private UserPasswordHasherInterface $passwordHasher
    ) {
    }

    public function load(ObjectManager $manager): void
    {
        //  USER Owner ----------------------------------
        $user = new User();

        $user->setEmail('test@test.com');

        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            '123456'
        );

        $user->setPassword($hashedPassword);

        $user->setRoles(['ROLE_USER']);

        $manager->persist($user);
        // ------------------USER 2 :
        $user2 = new User();

        $user2->setEmail('test2@test.com');
        $hashedPassword2 = $this->passwordHasher->hashPassword($user2,'123456');

        $user2->setPassword($hashedPassword2);

        $user2->setRoles(['ROLE_USER']);

        $manager->persist($user2);
        // ADMIN ----------------------------------
        $admin = new User();

        $admin->setEmail('admin@admin.com');

        $hashedAdminPassword = $this->passwordHasher->hashPassword(
            $admin,
            '123456'
        );

        $admin->setPassword($hashedAdminPassword);

        $admin->setRoles(['ROLE_ADMIN']);

        $manager->persist($admin);

        $manager->flush();
    }
}

    

