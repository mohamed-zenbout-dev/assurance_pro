<?php

namespace App\Controller;

use App\Repository\ContractRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Contract;
use App\Repository\ClientRepository;
use App\DTO\ContractRequestDTO;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Validator\ValidatorInterface;

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

    #[Route('/api/contracts', name: 'contract_create', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $em,
        ValidatorInterface $validator,
        ClientRepository $clientRepository,
        ContractRepository $contractRepository
    ): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user = $this->getUser();

        if (!$user) {
            return $this->json([
                'error' => 'Unauthorized'
            ], 401);
        }

        $dto = new ContractRequestDTO();

        $dto->contractNumber = $data['contractNumber'] ?? null;
        $dto->insuranceType = $data['insuranceType'] ?? null;
        $dto->startDate = $data['startDate'] ?? null;
        $dto->endDate = $data['endDate'] ?? null;
        $dto->status = $data['status'] ?? null;
        $dto->premiumAmount = $data['premiumAmount'] ?? null;
        $dto->clientId = $data['clientId'] ?? null;

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

        $client = $clientRepository->find($dto->clientId);

        if (!$client) {
            return $this->json([
                'error' => 'Client not found'
            ], 404);
        }

        $existingContract = $contractRepository->findOneBy([
            'contractNumber' => $dto->contractNumber
        ]);

        if ($existingContract) {
            return $this->json([
                'error' => 'Contract number already exists'
            ], 400);
        }

        $contract = new Contract();

        $contract->setContractNumber($dto->contractNumber);
        $contract->setInsuranceType($dto->insuranceType);
        $contract->setStatus($dto->status);
        $contract->setPremiumAmount((string) $dto->premiumAmount);

        $contract->setStartDate(
            new \DateTimeImmutable($dto->startDate)
        );

        $contract->setEndDate(
            new \DateTimeImmutable($dto->endDate)
        );

        $contract->setCreatedAt(
            new \DateTimeImmutable()
        );

        $contract->setUpdatedAt(
            new \DateTimeImmutable()
        );

        $contract->setClient($client);

        $em->persist($contract);
        $em->flush();

        return $this->json([
            'message' => 'Contract created',
            'id' => $contract->getId()
        ], 201);
    }
}
