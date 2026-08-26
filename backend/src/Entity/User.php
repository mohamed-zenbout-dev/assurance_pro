<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]

// Représente un utilisateur de l'application Assurance Pro.
// Cette entité est utilisée pour l'authentification et la gestion des
// autorisations grâce au composant Security de Symfony.
// Un utilisateur peut posséder plusieurs clients et dispose d'un ou plusieurs rôles (ROLE_USER, ROLE_ADMIN...).
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    //  Identifiant unique de l'utilisateur.
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read'])]
    private ?int $id = null;

    // Adresse e-mail de l'utilisateur.
    // Cette valeur est unique et sert également d'identifiant de connexion.
    #[ORM\Column(length: 180)]
    #[Groups(['user:read'])]
    private ?string $email = null;

    // Liste des rôles attribués à l'utilisateur 'ROLE_USER ou ROLE_ADMIN'.
    #[ORM\Column]
    #[Groups(['user:read'])]
    private array $roles = [];

    // Mot de passe chiffré de l'utilisateur.
    // Le mot de passe est automatiquement hashé avant son enregistrement en base de données.
    #[ORM\Column]
    private ?string $password = null;

    /**
     * @var Collection<int, Client>
     */
    // Liste des clients associés à cet utilisateur.
    // Relation OneToMany : un utilisateur peut gérer plusieurs clients.
    #[ORM\OneToMany(targetEntity: Client::class, mappedBy: 'owner')]
    private Collection $clients;

    // Initialise les collections Doctrine.
    public function __construct()
    {
        $this->clients = new ArrayCollection();
    }
    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    //  Retourne l'identifiant utilisé par Symfony lors de l'authentification.
    //  Ici il s'agit de l'adresse e-mail.
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    // Retourne les rôles de l'utilisateur.
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    //  Supprime les éventuelles données sensibles présentes temporairement en mémoire.
    //  Méthode imposée par Symfony Security.
    #[\Deprecated]
    public function eraseCredentials(): void
    {
        // @deprecated, to be removed when upgrading to Symfony 8
    }

    /**
     * @return Collection<int, Client>
     */
    public function getClients(): Collection
    {
        return $this->clients;
    }

    public function addClient(Client $client): static
    {
        if (!$this->clients->contains($client)) {
            $this->clients->add($client);
            $client->setOwner($this);
        }

        return $this;
    }

    public function removeClient(Client $client): static
    {
        if ($this->clients->removeElement($client)) {
            // set the owning side to null (unless already changed)
            if ($client->getOwner() === $this) {
                $client->setOwner(null);
            }
        }

        return $this;
    }
}
