<?php

namespace App\Controller;

use App\Entity\Client;
use App\Repository\ClientRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class ClientController extends AbstractController
{
    // LISTE DES CLIENTS --USER CONNECTE----
    #[Route('/api/client', name: 'client_index', methods: ['GET'])]
    public function index(ClientRepository $clientRepository): JsonResponse
    {
    $user = $this->getUser();

    if (!$user) {
        return $this->json([
            'error' => 'Unauthorized'
        ], 401);
    }

    // ADMIN → tous les clients
    if (in_array('ROLE_ADMIN', $user->getRoles())) {
        $clients = $clientRepository->findAll();
    } else {
        //  USER → uniquement ses clients
        $clients = $user->getClients();
    }

    $data = [];

    foreach ($clients as $client) {
        $data[] = [
            'id' => $client->getId(),
            'name' => $client->getName(),
            'owner' => $client->getOwner()->getEmail(),
        ];
    }

    return $this->json(
        $client,
        200,
        [],
        ['groups'=>'client:read']
        );
}

    // VOIR UN CLIENT :
    #[Route('/api/client/{id}', name: 'client_show', methods: ['GET'])]
    public function show(Client $client): JsonResponse
    {
        $this->denyAccessUnlessGranted('CLIENT_VIEW', $client);

        return $this->json([
            'id' => $client->getId(),
            'name' => $client->getName(),
            'owner' => $client->getOwner()->getEmail()
        ]);
    }

    //: CREER UN CLIENT :
    #[Route('/api/client', name: 'client_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em, ValidatorInterface $validator): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $client = new Client();
        $client->setName($data['name']);

        $errors = $validator->validate($client);

        if (count($errors) > 0) {
            $errorMessages = [];

            foreach($errors as $error){
                $errorMessages[] = $error->getMessage();
            }

            return $this->json([
            'errors' => $errorMessages
            ], 400);
        }
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
        $this->denyAccessUnlessGranted('CLIENT_EDIT', $client);

        $data = json_decode($request->getContent(), true);

        if (isset($data['name'])) {
            $client->setName($data['name']);
        }

        // VALIDATION
        $errors = $validator->validate($client);

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
        $this->denyAccessUnlessGranted('CLIENT_DELETE', $client);

        $em->remove($client);
        $em->flush();

        return $this->json([
            'message' => 'Client deleted'
        ]);
    }
}