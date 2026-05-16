<?php

namespace App\Controller;

use App\Entity\Client;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class ClientController extends AbstractController
{
    #[Route('/api/client/{id}', name: 'api_client_show', methods: ['GET'])]
    public function show(Client $client): JsonResponse
    {
        $this->denyAccessUnlessGranted('CLIENT_VIEW', $client);

        return $this->json([
            'id' => $client->getId(),
            'name' => $client->getName(),
            'owner' => $client->getOwner()->getEmail()
        ]);
    }

    #[Route('/api/client', name: 'create_client', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $em
    ): JsonResponse {

        $data = json_decode($request->getContent(), true);

        $client = new Client();
        $client->setName($data['name']);

        // owner automatique
        $client->setOwner($this->getUser());

        $em->persist($client);
        $em->flush();

        return $this->json([
            'message' => 'Client created',
            'client' => [
                'id' => $client->getId(),
                'name' => $client->getName(),
                'owner' => $client->getOwner()->getEmail(),
            ]
        ]);
    }
}