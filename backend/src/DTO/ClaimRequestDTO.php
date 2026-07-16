<?php 

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class ClaimRequestDTO{

    #[Assert\NotBlank]
    #[Assert\Length(max: 100)]
    public ?string $claimNumber = null;

    #[Assert\NotBlank]
    #[Assert\Length(max: 100)]
    public ?string $incidentType = null;

    #[Assert\NotBlank]
    public ?string $description = null;

    #[Assert\NotBlank]
    #[Assert\Date]
    public ?string $incidentDate = null;

    #[Assert\NotBlank]
    #[Assert\Length(max: 50)]
    public ?string $status = null;

    #[Assert\NotBlank]
    #[Assert\Type('numeric')]
    #[Assert\Positive]
    public ?float $estimatedDamage = null;

    #[Assert\NotBlank]
    #[Assert\Type('integer')]
    public ?int $clientId = null;

}