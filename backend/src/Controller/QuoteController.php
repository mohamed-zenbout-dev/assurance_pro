<?php

namespace App\Controller;

use App\Entity\Quote;
use App\DTO\QuoteRequestDTO;
use App\Repository\ClientRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Repository\QuoteRepository;
use App\Security\Voter\QuoteVoter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class QuoteController extends AbstractController
{
    #[Route('/api/quotes', name: 'quote_list', methods: ['GET'])]
    public function index(Request $request, QuoteRepository $quoteRepository): JsonResponse
    {
        // return $this->json(
        //     $quoteRepository->findAll(),
        //     200,
        //     [],
        //     ['groups' => 'quote:read']
        // );
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

            $quotes = $quoteRepository->findBy(
                [],
                ['id' => 'DESC'],
                $limit,
                $offset
            );

            $total = $quoteRepository->count([]);

        } else {

            $quotes = $quoteRepository
                ->createQueryBuilder('q')
                ->join('q.client', 'client')
                ->where('client.owner = :owner')
                ->setParameter('owner', $user)
                ->orderBy('q.id', 'DESC')
                ->setFirstResult($offset)
                ->setMaxResults($limit)
                ->getQuery()
                ->getResult();

            $total = $quoteRepository
                ->createQueryBuilder('q')
                ->select('COUNT(q.id)')
                ->join('q.client', 'client')
                ->where('client.owner = :owner')
                ->setParameter('owner', $user)
                ->getQuery()
                ->getSingleScalarResult();
        }

        return $this->json([
            'page' => $page,
            'limit' => $limit,
            'total' => (int) $total,
            'data' => $quotes
        ], 200, [], [
            'groups' => 'quote:read'
        ]);
    }
    


    #[Route('/api/quotes/{id}', name: 'quote_show', methods: ['GET'])]
    public function show(Quote $quote): JsonResponse{

        $this->denyAccessUnlessGranted(QuoteVoter::VIEW, $quote);
        return $this->json(
            $quote,
            200,
            [],
            ['groups' => 'quote:read']
        );
    }

    #[Route('/api/quotes', name: 'quote_create', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $em,
        ValidatorInterface $validator,
        ClientRepository $clientRepository,
        QuoteRepository $quoteRepository
    ): JsonResponse{

    $data = json_decode($request->getContent(), true);

    $user = $this->getUser();

    if (!$user){
        return $this->json(['error' => 'Unauthorized'], 401);
    }

    $dto = new QuoteRequestDTO();

    $dto->quoteNumber = $data['quoteNumber'] ?? null;
    $dto->insuranceType = $data['insuranceType'] ?? null;
    $dto->estimatedAmount = $data['estimatedAmount'] ?? null;
    $dto->status = $data['status'] ?? null;
    $dto->clientId = $data['clientId'] ?? null;

    $errors = $validator->validate($dto);

    if( count($errors) > 0) {
        $errorMessages = [];
        foreach ($errors as $error){
            $errorMessages[] = $error->getMessage();
        }
        return $this->json([
            'errors' => $errorMessages
        ],400);
    }

    $client = $clientRepository->find($dto->clientId);

    if( !$client ){
        return $this->json([
            'error' => 'Client not found'
        ], 404);
    }

    if (!in_array('ROLE_ADMIN', $user->getRoles()) && $client->getOwner()->getId() !== $user->getId()){
        return $this->json([
            'error' => 'Access denied'
        ], 403);
    }


    $existingQuote = $quoteRepository->findOneBy(['quoteNumber' => $dto->quoteNumber]);

    if ($existingQuote) {
        return $this->json([
            'error' => 'Quote number already exists'
        ], 400);
    }

    $quote = new Quote();


    $quote->setQuoteNumber($dto->quoteNumber);
    $quote->setInsuranceType($dto->insuranceType);
    $quote->setEstimatedAmount((string) $dto->estimatedAmount);
    $quote->setStatus($dto->status);

    $quote->setCreatedAt(new \DateTimeImmutable());
    $quote->setUpdatedAt(new \DateTimeImmutable());
    $quote->setClient($client);


    $em->persist($quote);
    $em->flush();

    return $this->json([
        'message'=>'Quote created successfully',
        'id' => $quote->getId()
    ], 201);
           
    }

    #[Route('/api/quotes/{id}', name: 'quote_update', methods: ['PUT'])]
    public function update(
        Quote $quote,
        Request $request,
        EntityManagerInterface $em,
        ValidatorInterface $validator,
        ClientRepository $clientRepository,
        QuoteRepository $quoteRepository
    ): JsonResponse {

        $this->denyAccessUnlessGranted(QuoteVoter::EDIT, $quote);

        $data = json_decode($request->getContent(), true);

        $dto = new QuoteRequestDTO();

        $dto->quoteNumber = $data['quoteNumber'] ?? $quote->getQuoteNumber();
        $dto->insuranceType = $data['insuranceType'] ?? $quote->getInsuranceType();
        $dto->estimatedAmount = $data['estimatedAmount'] ?? (float) $quote->getEstimatedAmount();
        $dto->status = $data['status'] ?? $quote->getStatus();
        $dto->clientId = $data['clientId'] ?? $quote->getClient()?->getId();

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

        $existingQuote = $quoteRepository->findOneBy([
            'quoteNumber' => $dto->quoteNumber
        ]);

        if ($existingQuote && $existingQuote->getId() !== $quote->getId()) {
            return $this->json([
                'error' => 'Quote number already exists'
            ], 400);
        }

        $quote->setQuoteNumber($dto->quoteNumber);
        $quote->setInsuranceType($dto->insuranceType);
        $quote->setEstimatedAmount((string) $dto->estimatedAmount);
        $quote->setStatus($dto->status);

        $quote->setUpdatedAt(
            new \DateTimeImmutable()
        );

        $quote->setClient($client);

        $em->flush();

        return $this->json([
            'message' => 'Quote updated successfully'
        ]);
    }


    #[Route('/api/quotes/{id}', name: 'quote_delete', methods: ['DELETE'])]
    public function delete(
        Quote $quote,
        EntityManagerInterface $em
    ): JsonResponse {

        $this->denyAccessUnlessGranted(
            QuoteVoter::DELETE,
            $quote
        );

        $em->remove($quote);
        $em->flush();

        return $this->json([
            'message' => 'Quote deleted successfully'
        ], 200);
    }
    
}