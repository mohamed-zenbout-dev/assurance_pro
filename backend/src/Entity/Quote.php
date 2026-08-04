<?php

namespace App\Entity;

use App\Repository\QuoteRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: QuoteRepository::class)]
//  Représente un devis d'assurance.
//  Cette entité permet d'enregistrer les demandes de devis effectuées par un client avant la souscription d'un contrat d'assurance.
//  Chaque devis est associé à un seul client et contient les informations nécessaires à l'estimation du coût de l'assurance.
class Quote
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    // Identifiant unique du devis.
    #[ORM\Column]
    #[Groups(['quote:read'])]
    private ?int $id = null;

    // Numéro unique du devis.
    // Ce numéro permet d'identifier chaque devis de manière unique.
    #[ORM\Column(length: 100, unique: true)]
    #[Groups(['quote:read'])]
    private ?string $quoteNumber = null;

    // Type d'assurance demandé.
    // Automobile, Habitation, Santé 
    #[ORM\Column(length: 100)]
    #[Groups(['quote:read'])]
    private ?string $insuranceType = null;

    // Montant estimé du devis.
    // Correspond au coût estimatif calculé avant la création éventuelle d'un contrat d'assurance.
    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    #[Groups(['quote:read'])]
    private ?string $estimatedAmount = null;

    // État actuel du devis.
    // Exemple : En attente, Accepté, Refusé, Expiré
    #[ORM\Column(length: 50)]
    #[Groups(['quote:read'])]
    private ?string $status = null;

    // Date de création du devis.
    #[ORM\Column]
    #[Groups(['quote:read'])]
    private ?\DateTimeImmutable $createdAt = null;

    // Date de la dernière mise à jour du devis.
    #[ORM\Column]
    #[Groups(['quote:read'])]
    private ?\DateTimeImmutable $updatedAt = null;

    // Client ayant effectué la demande de devis.
    // Un sinistre est obligatoirement associé à un client.
    // Cette entité permet de stocker les informations relatives à un incident déclaré auprès de l'assurance afin d'en assurer le suivi jusqu'à sa clôture.
    #[ORM\ManyToOne(inversedBy: 'quotes')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['quote:read'])]
    private ?Client $client = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuoteNumber(): ?string
    {
        return $this->quoteNumber;
    }

    public function setQuoteNumber(string $quoteNumber): static
    {
        $this->quoteNumber = $quoteNumber;

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

    public function getEstimatedAmount(): ?string
    {
        return $this->estimatedAmount;
    }

    public function setEstimatedAmount(string $estimatedAmount): static
    {
        $this->estimatedAmount = $estimatedAmount;

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
