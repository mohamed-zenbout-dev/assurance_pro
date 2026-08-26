<?php

namespace App\Controller\Admin;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/admin/users')]
final class UserController extends AbstractController
{
    #[Route('', name: 'admin_users_list', methods: ['GET'])]
    public function index(UserRepository $userRepository): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $users = $userRepository->findBy([], ['id' => 'DESC']);

        return $this->json([
            'data' => $users
            ],
            200,
            [],
            [
                'groups' => 'user:read'
            ]);
    }

    #[Route('/{id}', name: 'admin_users_show', methods: ['GET'])]
    public function show(User $user): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        return $this->json($user, 200, [], [
            'groups' => 'user:read'
        ]);
    }

    #[Route('/{id}', name: 'admin_users_update', methods: ['PUT'])]
    public function update(
        User $user,
        Request $request,
        EntityManagerInterface $em
    ): JsonResponse {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $data = json_decode($request->getContent(), true);

        if (isset($data['roles'])) {
            $user->setRoles($data['roles']);
        }

        $em->flush();

        return $this->json([
            'message' => 'Utilisateur mis à jour'
        ]);
    }

    #[Route('/{id}', name: 'admin_users_delete', methods: ['DELETE'])]
    public function delete(
        User $user,
        EntityManagerInterface $em
    ): JsonResponse {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $em->remove($user);
        $em->flush();

        return $this->json([
            'message' => 'Utilisateur supprimé'
        ]);
    }
}

