<?php

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;


class QuoteRequestDTO{

    #[Assert\NotBlank]
    #[Assert\Length(max: 100)]
    public ?string $quoteNumber = null;

    #[Assert\NotBlank]
    #[Assert\Length(max: 100)]
    public ?string $insuranceType = null;

    #[Assert\NotBlank]
    #[Assert\Type('numeric')]
    #[Assert\Positive]
    public ?float $estimatedAmount = null;

    #[Assert\NotBlank]
    #[Assert\Length(max: 50)]
    public ?string $status = null;

    #[Assert\NotBlank]
    #[Assert\Type('integer')]
    #[Assert\Positive]
    public ?int $clientId = null;

}