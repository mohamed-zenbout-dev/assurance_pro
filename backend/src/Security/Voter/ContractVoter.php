<?php

namespace App\Security\Voter;

use App\Entity\Contract;
use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;


final class ContractVoter extends Voter
{
    public const VIEW = 'CONTRACT_VIEW';
    public const EDIT = 'CONTRACT_EDIT';   
    public const DELETE = 'CONTRACT_DELETE';

    protected function supports(string $attribute, mixed $subject): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, [
            self::VIEW,
            self::EDIT,
            self::DELETE
        ]) && $subject instanceof Contract;
    }

    protected function voteOnAttribute(string $attribute,mixed $subject,TokenInterface $token): bool{
        /** @var Contract $contract */
        $contract = $subject;

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
                return $contract
                    ->getClient()
                    ->getOwner()
                    ->getId() === $user->getId();
        }

        return false;
    }

}

