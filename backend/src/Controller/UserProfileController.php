<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class UserProfileController extends AbstractController
{
    #[Route('/api/me', name: 'me_show', methods: ['GET'])]
    public function me(): JsonResponse
    {
        /** @var User|null $user */
        $user = $this->getUser();

        if (!$user) {
            return $this->json([
                'error' => 'Unauthorized'
            ], 401);
        }

        return $this->json([
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'roles' => $user->getRoles(),
        ]);
    }

    #[Route('/api/me', name: 'me_update', methods: ['PUT'])]
    public function update(
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        
        /** @var User|null $user */
        $user = $this->getUser();

        if (!$user) {
            return $this->json([
                'error' => 'Unauthorized'
            ], 401);
        }

        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return $this->json([
                'error' => 'Invalid JSON'
            ], 400);
        }

        // Mise à jour email
        if (isset($data['email']) && !empty(trim($data['email']))) {
            $user->setEmail(trim($data['email']));
        }

        // Mise à jour mot de passe
        if (isset($data['password']) && !empty(trim($data['password']))) {
            $hashedPassword = $passwordHasher->hashPassword(
                $user,
                trim($data['password'])
            );

            $user->setPassword($hashedPassword);
        }

        $em->flush();

        return $this->json([
            'message' => 'Profil mis à jour avec succès',
            'email' => $user->getEmail(),
        ]);
    }
}

