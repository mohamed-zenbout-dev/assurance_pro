<?php

namespace App\Controller;

use App\Repository\ContractRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class ContractController extends AbstractController
{
    #[Route('/api/contracts', name:'contract_list', methods:['GET'])]
    public function index(ContractRepository $contractRepository): JsonResponse
    {

        return $this->json(
            $contractRepository->findAll(),
            200,
            [],
            ['groups' => 'contract:read']
        );
    }
}
