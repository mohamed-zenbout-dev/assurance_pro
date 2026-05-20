<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ClientApiTest extends WebTestCase{
    public function testApiRequireAuthentication(): void {
        $client = static::createClient();
        $client->request('GET', '/api/client');

        $this->assertResponseStatusCodeSame(401);
    }
}