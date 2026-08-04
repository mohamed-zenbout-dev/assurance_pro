<?php

namespace App\Entity;

use App\Repository\ClaimRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ClaimRepository::class)]

 
class Claim
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    // Identifiant unique d'un sinistre.
    #[ORM\Column]
    #[Groups(['claim:read'])]
    private ?int $id = null;

    // Numéro unique du sinistre.
    // Il permet d'identifier chaque déclaration de sinistre.
    #[ORM\Column(length: 100, unique: true)]
    #[Groups(['claim:read'])]
    private ?string $claimNumber = null;

    // Type de sinistre déclaré.
    //Ex : Accident automobile, Dégât des eaux, Incendie, Vol.
    #[ORM\Column(length: 100)]
    #[Groups(['claim:read'])]
    private ?string $incidentType = null;

    // Description détaillée du sinistre.
    // Ce champ permet au client de décrire précisément les circonstances de l'incident.
    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['claim:read'])]
    private ?string $description = null;

    // Date à laquelle le sinistre est survenu.
    #[ORM\Column(type: Types::DATE_IMMUTABLE)]
    #[Groups(['claim:read'])]
    private ?\DateTimeImmutable $incidentDate = null;

    // État d'avancement du sinistre.
    // Ex : Déclaré, En cours d'analyse, Accepté, Refusé, Clôturé
    #[ORM\Column(length: 50)]
    #[Groups(['claim:read'])]
    private ?string $status = null;

    // Estimation financière des dommages déclarés.
    // Cette valeur permet d'évaluer le montant potentiel de l'indemnisation.
    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    #[Groups(['claim:read'])]
    private ?string $estimatedDamage = null;

    // Date de création de la déclaration de sinistre.
    #[ORM\Column]
    #[Groups(['claim:read'])]
    private ?\DateTimeImmutable $createdAt = null;

    // Date de la dernière mise à jour du sinistre.
    #[ORM\Column]
    #[Groups(['claim:read'])]
    private ?\DateTimeImmutable $updatedAt = null;

    // Client ayant déclaré le sinistre.
    //  Relation ManyToOne : plusieurs sinistres peuvent être associés à un même client.
    #[ORM\ManyToOne(inversedBy: 'claims')]
    #[Groups(['claim:read'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Client $client = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getClaimNumber(): ?string
    {
        return $this->claimNumber;
    }

    public function setClaimNumber(string $claimNumber): static
    {
        $this->claimNumber = $claimNumber;

        return $this;
    }

    public function getIncidentType(): ?string
    {
        return $this->incidentType;
    }

    public function setIncidentType(string $incidentType): static
    {
        $this->incidentType = $incidentType;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getIncidentDate(): ?\DateTimeImmutable
    {
        return $this->incidentDate;
    }

    public function setIncidentDate(\DateTimeImmutable $incidentDate): static
    {
        $this->incidentDate = $incidentDate;

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

    public function getEstimatedDamage(): ?string
    {
        return $this->estimatedDamage;
    }

    public function setEstimatedDamage(string $estimatedDamage): static
    {
        $this->estimatedDamage = $estimatedDamage;

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
