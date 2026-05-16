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
        return in_array($attribute, [
            'CLIENT_VIEW',
            'CLIENT_EDIT',
            'CLIENT_DELETE'
        ]) && $subject instanceof Client;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();

        if (!$user instanceof User) {
            return false;
        }

        /** @var Client $client */
        $client = $subject;

        return $client->getOwner()->getId() === $user->getId();
    
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