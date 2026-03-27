<?php

namespace App\Controller;

use App\Entity\Client;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
}