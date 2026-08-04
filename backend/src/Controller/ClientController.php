<?php

namespace App\Controller;

use App\Entity\Client;
use App\Repository\ClientRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\DTO\ClientRequestDTO;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

// Contrôleur permettant la gestion des clients.
// Ce contrôleur expose les différentes routes REST permettant de créer, consulter, modifier et supprimer des clients.
// Les accès sont sécurisés grâce au système d'authentification Symfony ainsi qu'aux Voters permettant de contrôler les droits d'accès sur chaque ressource.

final class ClientController extends AbstractController
{
    // la méthode index retourne la liste des clients.
    // Fonctionnement :
    // Vérifie que l'utilisateur est authentifié.
    // Si l'utilisateur possède le rôle ROLE_ADMIN,   tous les clients sont retournés.
    // Sinon, seuls les clients appartenant à l'utilisateur connecté sont récupérés.
    // Les résultats sont paginés.
    #[Route('/api/client', name: 'client_index', methods: ['GET'])]
    public function index( 
        Request $request, // Contient les paramètres de pagination.
        ClientRepository $clientRepository // Repository Doctrine des clients.
    ): JsonResponse // Retourne la liste paginée des clients
    {
    $user = $this->getUser();

    if (!$user) {
        return $this->json([
            'error' => 'Unauthorized'
        ], 401);
    }

    // Pagination
    $page = max(1, $request->query->getInt('page', 1));
    $limit = max(1, $request->query->getInt('limit', 5));

    $offset = ($page - 1) * $limit;

    // ADMIN peut voir tous les clients
    if (in_array('ROLE_ADMIN', $user->getRoles())) {

        $clients = $clientRepository->findBy(
            [],
            ['id' => 'DESC'],
            $limit,
            $offset
        );

        $total = $clientRepository->count([]);

    } else {

        // USER voit uniquement ses clients
        $clients = $clientRepository->findBy(
            ['owner' => $user],
            ['id' => 'DESC'],
            $limit,
            $offset
        );

        $total = $clientRepository->count([
            'owner' => $user
        ]);
    }

    return $this->json([
        'page' => $page,
        'limit' => $limit,
        'total' => $total,
        'data' => $clients
    ], 200, [], [
        'groups' => 'client:read'
    ]);
}

    // VOIR UN CLIENT :
    #[Route('/api/client/{id}', name: 'client_show', methods: ['GET'])]
    public function show(Client $client): JsonResponse
    // Fonctionnement :
    // Vérifie les autorisations grâce au Voter CLIENT_VIEW.
    // Retourne les informations principales du client.
    {
        $this->denyAccessUnlessGranted('CLIENT_VIEW', $client);

        return $this->json([
            'id' => $client->getId(),
            'name' => $client->getName(),
            'owner' => $client->getOwner()->getEmail()
        ]);
    }

    // CREER UN NOUVEAU CLIENT :
    #[Route('/api/client', name: 'client_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em, ValidatorInterface $validator): JsonResponse
    {
        // Récupère les données JSON.
        // Hydrate un DTO.
        // Valide les données.
        // Associe automatiquement le client à l'utilisateur connecté.
        // Enregistre le client dans la base.
        $data = json_decode($request->getContent(), true);

        $dto = new ClientRequestDTO();
        $dto->name = $data['name'] ?? null;

        $errors = $validator->validate($dto);

        if (count($errors) > 0) {
            $errorMessages = [];

            foreach($errors as $error){
                $errorMessages[] = $error->getMessage();
            }

            return $this->json([
            'errors' => $errorMessages
            ], 400);
        }

        $client = new Client();
        $client->setName($dto->name);
        $client->setOwner($this->getUser());

        $em->persist($client);
        $em->flush();

        return $this->json([
            'message' => 'Client created',
            'id' => $client->getId()
        ]);
    }

    // METTRE A JOUR UN CLIENT :
    #[Route('/api/client/{id}', name: 'client_update', methods: ['PUT'])]
    public function update(Client $client, Request $request, EntityManagerInterface $em, ValidatorInterface $validator): JsonResponse
    {
        // Vérifie les autorisations via le Voter CLIENT_EDIT.
        // Valide les nouvelles données.
        // Met à jour les informations du client.
        // Sauvegarde les modifications.
        $this->denyAccessUnlessGranted('CLIENT_EDIT', $client);

        $data = json_decode($request->getContent(), true);

        $dto = new ClientRequestDTO();
        $dto->name = $data['name'] ?? null;
        if (isset($data['name'])) {
            $client->setName($data['name']);
        }

        // VALIDATION
        $errors = $validator->validate($dto);

        if (count($errors) > 0) {

            $errorMessages = [];

            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }

            return $this->json([
                'errors' => $errorMessages
            ], 400);
        }

    $em->flush();

    return $this->json([
        'message' => 'Client updated'
    ]);
}

    // SUPPRIMER UN CLIENT :
    #[Route('/api/client/{id}', name: 'client_delete', methods: ['DELETE'])]
    public function delete(Client $client, EntityManagerInterface $em): JsonResponse
    {
    // Vérifie les autorisations via le Voter CLIENT_DELETE.
    // Supprime définitivement le client de la base.
 
        $this->denyAccessUnlessGranted('CLIENT_DELETE', $client);

        $em->remove($client);
        $em->flush();

        return $this->json([
            'message' => 'Client deleted'
        ]);
    }
}