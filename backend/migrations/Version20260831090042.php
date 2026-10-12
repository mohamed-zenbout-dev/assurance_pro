<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 * Ajoute les champs telephone et adresse à la table client.
 * Cette migration permet de stocker les coordonnées du client
 * dans la base de données.
 */
final class Version20260831090042 extends AbstractMigration
{
    /**
     * Retourne une description de la migration.
     */
    public function getDescription(): string
    {
        return 'Ajout des champs telephone et adresse à la table client';
    }
     /**
     * Applique la migration : ajoute deux champs facultatifs
     * à la table client.
     */
    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE client ADD telephone VARCHAR(20) DEFAULT NULL, ADD adresse VARCHAR(255) DEFAULT NULL');
    }
     /**
     * Annule la migration en supprimant les deux champs ajoutés.
     */
    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE client DROP telephone, DROP adresse');
    }
}
