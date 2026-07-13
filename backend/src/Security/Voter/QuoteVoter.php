<?php

namespace App\Security\Voter;

use App\Entity\Quote;
use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;


final class QuoteVoter extends Voter
{
    public const VIEW = 'QUOTE_VIEW';
    public const EDIT = 'QUOTE_EDIT';
    public const DELETE = 'QUOTE_DELETE';
    
    
    protected function supports(string $attribute, mixed $subject): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, [
            self::VIEW,
            self::EDIT,            
            self::DELETE
        ])
            && $subject instanceof \App\Entity\Quote;
    }

   protected function voteOnAttribute(
        string $attribute,
        mixed $subject,
        TokenInterface $token
    ): bool {

        /** @var Quote $quote */
        $quote = $subject;

        $user = $token->getUser();

        if (!$user instanceof User) {
            return false;
        }

        // Les administrateurs peuvent tout faire
        if (in_array('ROLE_ADMIN', $user->getRoles())) {
            return true;
        }

        switch ($attribute) {

            case self::VIEW:
            case self::EDIT:
            case self::DELETE:
                return $quote
                    ->getClient()
                    ->getOwner()
                    ->getId() === $user->getId();
        }

        return false;
    }
}

