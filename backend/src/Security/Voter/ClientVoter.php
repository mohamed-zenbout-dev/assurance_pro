<?php

namespace App\Security\Voter;

use App\Entity\Client;
use App\Entity\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class ClientVoter extends Voter
{
    public const VIEW = 'CLIENT_VIEW';

    public function __construct(private Security $security)
    {
    }

    protected function supports(string $attribute, $subject): bool
    {
        return $attribute === self::VIEW && $subject instanceof Client;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
{
    /** @var Client $client */
    $client = $subject;

    $user = $token->getUser();

    // Si l’utilisateur est anonyme
    if (!$user instanceof User) {
        return false;
    }

    // 🔹 Assure-toi d’avoir le vrai User de la base
    $realUser = $this->security->getUser(); // récupère le User complet depuis le firewall

    if (!$realUser instanceof User) {
        return false;
    }

    // Vérification sur l’ID réel
    return $client->getOwner()->getId() === $realUser->getId();
}

    // protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    // {
    // $user = $token->getUser();

    // if (!$user instanceof User) {
    //     return false;
    // }

    // /** @var Client $client */
    // $client = $subject;

    // // Vérification sur l'ID
    // return $client->getOwner()->getId() === $user->getId();
    // }
}