<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ClientApiTest extends WebTestCase{
    public function testApiRequireAuthentication(): void {
        $client = static::createClient();
        $client->request('GET', '/api/client');

        $this->assertResponseStatusCodeSame(401);
    }

    public function TestLoginSuccess(): void {
        $client = static::createClient();

        $client->request('POST','/api/login_check', [],[],['Content-Type' => 'application/json'], json_encode(['email' => 'test@test.com', 'password' => '123456']));
        $this->assertResponseIsSuccessful();

        $data = json_decode($client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('token', $data);
    }
}