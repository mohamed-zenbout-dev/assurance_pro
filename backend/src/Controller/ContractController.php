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
use App\Security\Voter\ContractVoter;

final class ContractController extends AbstractController
{
    #[Route('/api/contracts', name:'contract_list', methods:['GET'])]
    public function index(Request $request, ContractRepository $contractRepository): JsonResponse
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

        if (in_array('ROLE_ADMIN', $user->getRoles())) {

            $contracts = $contractRepository->findBy(
                [],
                ['id' => 'DESC'],
                $limit,
                $offset
            );

            $total = $contractRepository->count([]);

        } else {

            $contracts = $contractRepository->createQueryBuilder('c')
                ->join('c.client', 'client')
                ->where('client.owner = :owner')
                ->setParameter('owner', $user)
                ->orderBy('c.id', 'DESC')
                ->setFirstResult($offset)
                ->setMaxResults($limit)
                ->getQuery()
                ->getResult();

            $total = $contractRepository->createQueryBuilder('c')
                ->select('COUNT(c.id)')
                ->join('c.client', 'client')
                ->where('client.owner = :owner')
                ->setParameter('owner', $user)
                ->getQuery()
                ->getSingleScalarResult();
        }

        return $this->json([
            'page' => $page,
            'limit' => $limit,
            'total' => (int) $total,
            'data' => $contracts
        ], 200, [], [
            'groups' => 'contract:read'
        ]);
    }


    #[Route('/api/contracts/{id}', name: 'contract_show', methods: ['GET'])]
    public function show(Contract $contract): JsonResponse
    {
        $this->denyAccessUnlessGranted(ContractVoter::VIEW, $contract);
        return $this->json(
            $contract,
            200,
            [],
            ['groups' => 'contract:read']
        );
    }

    #[Route('/api/contracts/{id}', name: 'contract_update', methods: ['PUT'])]
    public function update(
        Contract $contract,
        Request $request,
        EntityManagerInterface $em,
        ValidatorInterface $validator,
        ClientRepository $clientRepository
    ): JsonResponse
    {
        $this->denyAccessUnlessGranted(ContractVoter::EDIT, $contract);
        $data = json_decode($request->getContent(), true);

        $dto = new ContractRequestDTO();

        $dto->contractNumber = $data['contractNumber'] ?? $contract->getContractNumber();
        $dto->insuranceType = $data['insuranceType'] ?? $contract->getInsuranceType();
        $dto->startDate = $data['startDate'] ?? $contract->getStartDate()?->format('Y-m-d');
        $dto->endDate = $data['endDate'] ?? $contract->getEndDate()?->format('Y-m-d');
        $dto->status = $data['status'] ?? $contract->getStatus();
        $dto->premiumAmount = $data['premiumAmount'] ?? (float) $contract->getPremiumAmount();
        $dto->clientId = $data['clientId'] ?? $contract->getClient()?->getId();

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

        $contract->setUpdatedAt(
            new \DateTimeImmutable()
        );

        $contract->setClient($client);

        $em->flush();

        return $this->json([
            'message' => 'Contract updated successfully'
        ]);
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
        if (!in_array('ROLE_ADMIN', $user->getRoles()) && $client->getOwner()->getId() !== $user->getId()) {
            return $this->json([
                'error' => 'Access denied'
            ], 403);
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

    #[Route('/api/contracts/{id}', name: 'contract_delete', methods: ['DELETE'])]
    public function delete(
        Contract $contract,
        EntityManagerInterface $em
    ): JsonResponse
    {
        $this->denyAccessUnlessGranted(ContractVoter::DELETE,$contract);
        $em->remove($contract);
        $em->flush();

        return $this->json([
            'message' => 'Contract deleted successfully'
        ]);
    }
}
