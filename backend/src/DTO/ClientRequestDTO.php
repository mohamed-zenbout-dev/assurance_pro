<?php

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class ClientRequestDTO{
    #[Assert\NotBlank(message:'Le nom du client est obligatoire.')]
    #[Assert\Length(
        min: 2,
        minMessage : 'Le nom doit contenir au moins {{ limit }} caractères.',
        max: 255,
        maxMessage : 'Le nom ne peut pas dépasser {{ limit }} caractères',

    )]
    public ?string $name = null;
}