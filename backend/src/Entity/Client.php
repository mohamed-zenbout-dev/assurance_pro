<?php

namespace App\Entity;

use App\Repository\ClientRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
// use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ClientRepository::class)]

// Représente un client de l'application Assurance Pro.
// Un client est rattaché à un utilisateur et peut posséder plusieurs contrats, devis et sinistres.
class Client
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    // Identifiant unique du client.
    #[ORM\Column]
    #[Groups(['client:read'])]
    private ?int $id = null;


    // Nom complet du client.
    #[ORM\Column(length: 255)]
    #[Groups(['client:read'])]
    private ?string $name = null;

    // Utilisateur responsable de ce client.
    //  Relation ManyToOne : plusieurs clients peuvent appartenir au même utilisateur.
    #[ORM\ManyToOne(inversedBy: 'clients')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['client:read'])]
    private ?User $owner = null;

    /**
     * @var Collection<int, Contract>
     */
    // Ensemble des contrats appartenant au client.
    #[ORM\OneToMany(targetEntity: Contract::class, mappedBy: 'client')]
    private Collection $contracts;

    /**
     * @var Collection<int, Quote>
     */
    // Ensemble des devis associés au client.
    #[ORM\OneToMany(targetEntity: Quote::class, mappedBy: 'client')]
    private Collection $quotes;

    /**
     * @var Collection<int, Claim>
     */
    // Ensemble des sinistres déclarés par le client.
    #[ORM\OneToMany(targetEntity: Claim::class, mappedBy: 'client')]
    private Collection $claims;

    public function __construct()
    {
        $this->contracts = new ArrayCollection();
        $this->quotes = new ArrayCollection();
        $this->claims = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): static
    {
        $this->owner = $owner;

        return $this;
    }

    /**
     * @return Collection<int, Contract>
     */
    public function getContracts(): Collection
    {
        return $this->contracts;
    }

    public function addContract(Contract $contract): static
    {
        if (!$this->contracts->contains($contract)) {
            $this->contracts->add($contract);
            $contract->setClient($this);
        }

        return $this;
    }

    public function removeContract(Contract $contract): static
    {
        if ($this->contracts->removeElement($contract)) {
            // set the owning side to null (unless already changed)
            if ($contract->getClient() === $this) {
                $contract->setClient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Quote>
     */
    public function getQuotes(): Collection
    {
        return $this->quotes;
    }

    public function addQuote(Quote $quote): static
    {
        if (!$this->quotes->contains($quote)) {
            $this->quotes->add($quote);
            $quote->setClient($this);
        }

        return $this;
    }

    public function removeQuote(Quote $quote): static
    {
        if ($this->quotes->removeElement($quote)) {
            // set the owning side to null (unless already changed)
            if ($quote->getClient() === $this) {
                $quote->setClient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Claim>
     */
    public function getClaims(): Collection
    {
        return $this->claims;
    }

    public function addClaim(Claim $claim): static
    {
        if (!$this->claims->contains($claim)) {
            $this->claims->add($claim);
            $claim->setClient($this);
        }

        return $this;
    }

    public function removeClaim(Claim $claim): static
    {
        if ($this->claims->removeElement($claim)) {
            // set the owning side to null (unless already changed)
            if ($claim->getClient() === $this) {
                $claim->setClient(null);
            }
        }

        return $this;
    }
}
