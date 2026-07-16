<?php

namespace App\Controller;

use App\Entity\Claim;
use App\DTO\ClaimRequestDTO;
use App\Repository\ClientRepository;
use App\Repository\ClaimRepository;
use App\Security\Voter\ClaimVoter;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class ClaimController extends AbstractController
{
    #[Route('/api/claims', name: 'claim_list', methods: ['GET'])]
    public function index(
        Request $request,
        ClaimRepository $claimRepository
    ): JsonResponse
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

            $claims = $claimRepository->findBy(
                [],
                ['id' => 'DESC'],
                $limit,
                $offset
            );

            $total = $claimRepository->count([]);

        } else {

            $claims = $claimRepository
                ->createQueryBuilder('c')
                ->join('c.client', 'client')
                ->where('client.owner = :owner')
                ->setParameter('owner', $user)
                ->orderBy('c.id', 'DESC')
                ->setFirstResult($offset)
                ->setMaxResults($limit)
                ->getQuery()
                ->getResult();

            $total = $claimRepository
                ->createQueryBuilder('c')
                ->select('COUNT(c.id)')
                ->join('c.client', 'client')
                ->where('client.owner = :owner')
                ->setParameter('owner', $user)
                ->getQuery()
                ->getSingleScalarResult();
        }

        return $this->json([
            'page'  => $page,
            'limit' => $limit,
            'total' => (int) $total,
            'ids' => array_map(
            fn($claim) => $claim->getId(),
            $claims
            )
        ]);
        //     'data'  => $claims
        // ], 200, [], [
        //     'groups' => 'claim:read'
        // ]);
    }

    #[Route('/api/claims/{id}', name: 'claim_show', methods: ['GET'])]
    public function show(Claim $claim): JsonResponse {

        $this->denyAccessUnlessGranted(ClaimVoter::VIEW, $claim);

        return $this->json(
            $claim,
            200,
            [],
            ['groups' => 'claim:read']
        );

    }

    #[Route('/api/claims', name: 'claim_create', methods:['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $em,
        ValidatorInterface $validator,
        ClientRepository $clientRepository,
        ClaimRepository $claimRepository
        ): JsonResponse 
        {

        $data = json_decode($request->getContent(), true);

        $user = $this->getUser();

        // return $this->json([
        //     'email' => $user->getUserIdentifier(),
        //     'roles' => $user->getRoles()
        // ]);

        if (!$user) {
            return $this->json([
                'error' => 'Unauthorized'
            ], 401);
        }

        $dto = new ClaimRequestDTO();

        $dto->claimNumber = $data['claimNumber'] ?? null;
        $dto->incidentType = $data['incidentType'] ?? null;
        $dto->description= $data['description'] ?? null;
        $dto->incidentDate = $data['incidentDate'] ?? null;
        $dto->status = $data['status'] ?? null;
        $dto->estimatedDamage = $data['estimatedDamage'] ?? null;
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

        if (!$client){
            return $this->json([
                'error' => 'Client not found'
            ],404);
        }

        if(
            !in_array('ROLE_ADMIN', $user->getRoles()) && $client->getOwner()->getId() !== $user->getId()) {
                return $this->json([
                    'error' => 'Access denied'
                ], 403);
            }

        $existingClaim = $claimRepository->findOneBy(['claimNumber' => $dto->claimNumber]);

        if($existingClaim){
            return $this->json([
                'error' => 'Claim number already exists'
            ],400);
        }

        $claim = new Claim();

        $claim->setClaimNumber($dto->claimNumber);
        $claim->setIncidentType($dto->incidentType);
        $claim->setDescription($dto->description);

        $claim->setIncidentDate(
            new \DateTimeImmutable($dto->incidentDate)
        );

        $claim->setStatus($dto->status);

        $claim->setEstimatedDamage(
            (string) $dto->estimatedDamage
        );

        $claim->setCreatedAt(new \DateTimeImmutable());
        $claim->setUpdatedAt(new \DateTimeImmutable());

        $claim->setClient($client);

        $em->persist($claim);
        $em->flush();

        return $this->json([
            'message' => 'Claim created successfully',
            'id' => $claim->getId()
        ], 201);

    }


    #[Route('/api/claims/{id}', name: 'claim_update', methods:['PUT'])]
    public function update(
        Claim $claim,
        Request $request,
        EntityManagerInterface $em,
        ValidatorInterface $validator,
        ClientRepository $clientRepository,
        ClaimRepository $claimRepository
    ): JsonResponse {

        // 
        $this->denyAccessUnlessGranted(ClaimVoter::EDIT, $claim);

        $data = json_decode($request->getContent(), true);


        // 
        $dto = new ClaimRequestDTO();


        $dto->claimNumber = $data['claimNumber'] ?? $claim->getClaimNumber();
        $dto->incidentType = $data['incidentType'] ?? $claim->getIncidentType();
        $dto->description= $data['description'] ?? $claim->getDescription();
        $dto->incidentDate = $data['incidentDate'] ?? $claim->getIncidentDate()->format('Y-m-d');
        $dto->status = $data['status'] ?? $claim->getStatus();
        $dto->estimatedDamage = $data['estimatedDamage'] ?? $claim->getEstimatedDamage();
        $dto->clientId = $data['clientId'] ?? $claim->getClient()->getId();
        
        // 
        $errors = $validator->validate($dto);

        if (count($errors) > 0){
            $errorMessages = [];

            foreach ($errors as $error){
                $errorMessages[] = $error->getMessage();
            }

            return $this->json([
                'errors' => $errorMessages
            ], 400);
        }

        $client = $clientRepository->find($dto->clientId);

        if (!$client){
            return $this->json([
                'error' => 'Client not found'
            ], 404);
        }


        $existingClaim = $claimRepository->findOneBy(['claimNumber' => $dto->claimNumber]);

        if($existingClaim && $existingClaim->getId() !== $claim->getId()){
            return $this->json([
                'error' => 'Claim number already exists'
            ], 400);
        }

        $claim->setClaimNumber($dto->claimNumber);
        $claim->setIncidentType($dto->incidentType);
        $claim->setDescription($dto->description);

        $claim->setIncidentDate(
            new \DateTimeImmutable($dto->incidentDate)
        );

        $claim->setStatus($dto->status);

        $claim->setEstimatedDamage(
            (string) $dto->estimatedDamage
        );


        // $claim->setCreatedAt(
        //     new \DateTimeImmutable($dto->createdAt)
        // );

        $claim->setUpdatedAt(
            new \DateTimeImmutable()
        );

        $claim->setClient($client);


        $em->flush();

        return $this->json([
            'message' => 'Claim updated successfully',
        ], 200);

    }


    #[Route('/api/claims/{id}', name: 'claim_delete', methods:['DELETE'])]
    public function delete(Claim $claim,EntityManagerInterface $em): JsonResponse {

    $this->denyAccessUnlessGranted(ClaimVoter::DELETE, $claim);

    $em->remove($claim);
    $em->flush();

    return $this->json([
        'message' => 'Claim deleted successfully'
    ], 200);
    }
    

}