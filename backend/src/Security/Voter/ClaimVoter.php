<?php

namespace App\Security\Voter;

use App\Entity\Claim;
use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

final class ClaimVoter extends Voter
{
    public const VIEW = 'CLAIM_VIEW';
    public const EDIT = 'CLAIM_EDIT';
    public const DELETE = 'CLAIM_DELETE';
    
    // Cette méthode vérifie si le Voter doit intervenir pour cette action et pour un objet Claim.
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
    // C'est ici que je prends la décision d'autoriser ou de refuser l'action.
    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {

         /** @var Claim $claim */
        $claim = $subject;
        // Je récupère l'utilisateur actuellement connecté
        $user = $token->getUser();

        // Si l'utilisateur n'est pas un utilisateur valide, je refuse l'accès.
        if (!$user instanceof User) {
            return false;
        }

        // Un administrateur est autorisé à accéder aux sinistres
        if (in_array('ROLE_ADMIN', $user->getRoles())) {
            return true;
        }
        //Je vérifie quelle action est demandée : consultation, modification ou suppression.
        switch ($attribute) {

            case self::VIEW:
            case self::EDIT:
            case self::DELETE:
                // Je vérifie que l'utilisateur est bien le propriétaire du client lié au sinistre.
                return $claim
                    ->getClient()
                    ->getOwner()
                    ->getId() === $user->getId();
        }

        return false;
    }
}
