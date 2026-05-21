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

        $client->request('POST','/api/login_check', [],[],['CONTENT_TYPE' => 'application/json'], json_encode(['email' => 'test@test.com', 'password' => '123456']));
        $this->assertResponseIsSuccessful();

        $data = json_decode($client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('token', $data);
    }

    public function getJwtToken($client): string {

        $client->request('POST','/api/login_check', [],[],['CONTENT_TYPE' => 'application/json'], json_encode(['email' => 'test@test.com', 'password' => '123456']));
        $this->assertResponseIsSuccessful();

        $data = json_decode($client->getResponse()->getContent(), true);
        return $data['token'];
    }

    public function testGetClients(): void {
        $client = static::createClient();
        $token = $this->getJwtToken($client);

        $client->request('GET', '/api/client', [], [], ['HTTP_Authorization' => 'Bearer ' . $token]);

        $this->assertResponseIsSuccessful();
    }

    public function testCreateClient(): void{
        
    $client = static::createClient();
    $token = $this->getJwtToken($client);

    $client->request('POST','/api/client',[],[],['CONTENT_TYPE' => 'application/json','HTTP_Authorization' => 'Bearer ' . $token],json_encode(['name' => 'Client PHPUnit']));

    $this->assertResponseStatusCodeSame(200);

    $data = json_decode($client->getResponse()->getContent(),true);

    $this->assertEquals('Client created',$data['message']);
    }
}