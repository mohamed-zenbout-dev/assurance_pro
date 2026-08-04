<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mime\Address;
use SymfonyCasts\Bundle\ResetPassword\ResetPasswordHelperInterface;
use SymfonyCasts\Bundle\ResetPassword\Exception\ResetPasswordExceptionInterface;

final class ApiResetPasswordController extends AbstractController
{
    public function __construct(
        private ResetPasswordhelperInterface $resetPasswordHelper,
        private EntityManagerInterface $entityManager){                
    }

    #[Route('/api/forgot-password', name: 'api_forgot_password', methods: ['POST'])]
    public function forgotPassword(
        Request $request,
        MailerInterface $mailer
    ): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $email = $data['email'] ?? null;

        if (!$email) {
            return $this->json([
                'error' => 'Email is required'
            ], 400);
        }

        $user = $this->entityManager
            ->getRepository(User::class)
            ->findOneBy([
                'email' => $email
            ]);

            if (!$user) {
        return $this->json([
            'message' => 'If an account exists with this email, a reset link has been sent.'
        ], 200);
    }

    try {
        $resetToken = $this->resetPasswordHelper->generateResetToken($user);
    } catch (ResetPasswordExceptionInterface $e) {
        return $this->json([
            'message' => 'If an account exists with this email, a reset link has been sent.'
        ], 200);
    }

    return $this->json([
        'message' => 'Reset token generated successfully',
        'token' => $resetToken->getToken()
    ], 200);

        // return $this->json([
        //     'message' => 'Endpoint reached successfully'
        // ]);
    }
}
