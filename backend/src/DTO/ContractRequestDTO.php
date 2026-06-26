<?php

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class ContractRequestDTO{
    #[Assert\NotBlank]
    public ?string $contractNumber = null;

    #[Assert\NotBlank]
    public ?string $insuranceType = null;

    #[Assert\NotBlank]
    public ?string $startDate = null;

    #[Assert\NotBlank]
    public ?string $endDate = null;

    #[Assert\NotBlank]
    public ?string $status = null;

    #[Assert\NotBlank]
    #[Assert\Positive]
    public ?float $premiumAmount = null;

    #[Assert\NotBlank]
    #[Assert\Positive]
    public ?int $clientId = null;
}