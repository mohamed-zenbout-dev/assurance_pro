<?php

namespace App\Entity;

use App\Repository\ContractRepository;
use Doctrine\DBAL\Types\Types;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ContractRepository::class)]
class Contract
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    // Ajout des groupes de sérialisation pour contrôler les données exposées dans les réponses JSON grace à l'importation de "use Symfony\Component\Serializer\Annotation\Groups;"
    #[Groups(['contract:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 100, unique: true)]
    #[Groups(['contract:read'])]
    private ?string $contractNumber = null;

    #[ORM\Column(length: 100)]
    #[Groups(['contract:read'])]
    private ?string $insuranceType = null;

    #[ORM\Column(type: Types::DATE_IMMUTABLE)]
    #[Groups(['contract:read'])]
    private ?\DateTimeImmutable $startDate = null;

    #[ORM\Column(type: Types::DATE_IMMUTABLE)]
    #[Groups(['contract:read'])]
    private ?\DateTimeImmutable $endDate = null;

    #[ORM\Column(length: 50)]
    #[Groups(['contract:read'])]
    private ?string $status = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    #[Groups(['contract:read'])]
    private ?string $premiumAmount = null;

    #[ORM\Column]
    #[Groups(['contract:read'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    #[Groups(['contract:read'])]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\ManyToOne(inversedBy: 'contracts')]
    #[Groups(['contract:read'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Client $client = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContractNumber(): ?string
    {
        return $this->contractNumber;
    }

    public function setContractNumber(string $contractNumber): static
    {
        $this->contractNumber = $contractNumber;

        return $this;
    }

    public function getInsuranceType(): ?string
    {
        return $this->insuranceType;
    }

    public function setInsuranceType(string $insuranceType): static
    {
        $this->insuranceType = $insuranceType;

        return $this;
    }

    public function getStartDate(): ?\DateTimeImmutable
    {
        return $this->startDate;
    }

    public function setStartDate(\DateTimeImmutable $startDate): static
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getEndDate(): ?\DateTimeImmutable
    {
        return $this->endDate;
    }

    public function setEndDate(\DateTimeImmutable $endDate): static
    {
        $this->endDate = $endDate;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getPremiumAmount(): ?string
    {
        return $this->premiumAmount;
    }

    public function setPremiumAmount(string $premiumAmount): static
    {
        $this->premiumAmount = $premiumAmount;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getClient(): ?Client
    {
        return $this->client;
    }

    public function setClient(?Client $client): static
    {
        $this->client = $client;

        return $this;
    }
}
