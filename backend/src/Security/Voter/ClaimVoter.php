<?php

namespace App\Security\Voter;

use App\Entoty\Claim;
use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

final class ClaimVoter extends Voter
{
    public const VIEW = 'CLAIM_VIEW';
    public const EDIT = 'CLAIM_EDIT';
    public const DELETE = 'CLAIM_DELETE';
    

    protected function supports(string $attribute, mixed $subject): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, [
            self::VIEW,
            self::EDIT,
            self::DELETE
            ])
            && $subject instanceof \App\Entity\Claim;
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {

         /** @var Claim $claim */
        $claim = $subject;

        $user = $token->getUser();

        if (!$user instanceof User) {
            return false;
        }


        if (in_array('ROLE_ADMIN', $user->getRoles())) {
            return true;
        }

        switch ($attribute) {

            case self::VIEW:
            case self::EDIT:
            case self::DELETE:
                return $claim
                    ->getClient()
                    ->getOwner()
                    ->getId() === $user->getId();
        }

        return false;
    }
}
