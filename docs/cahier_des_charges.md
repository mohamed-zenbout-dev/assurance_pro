# 📄 Cahier des charges — Assurance_pro

## 1. Présentation du projet

Assurance_pro est une application web de gestion d’assurance développée avec Symfony 6.4 (API REST) et un frontend React.

Le système permet de gérer les utilisateurs, les clients, les contrats d’assurance, les devis et les sinistres.

L’objectif principal est de simuler le fonctionnement d’une compagnie d’assurance réelle avec une architecture moderne sécurisée via JWT.

---

## 2. Objectifs du projet

- Développer une API REST avec Symfony
- Sécuriser l’application avec JWT (LexikJWTAuthenticationBundle)
- Gérer les rôles utilisateurs (ROLE_USER / ROLE_ADMIN)
- Permettre la gestion des clients et contrats
- Suivre les devis et sinistres
- Assurer la cohérence des données avec Doctrine ORM
- Utiliser Docker pour l’environnement de développement

---

## 3. Architecture du projet

### Backend
- Symfony 6.4 LTS
- API REST
- Doctrine ORM
- Security + JWT
- Validator + Serializer

### Frontend
- React (consommation de l’API)

### Base de données
- MySQL 8.0 (Docker)

---

## 4. Gestion des utilisateurs

### Table `user`

- id (PK)
- email
- password
- roles (JSON)

### Rôles :

- ROLE_USER : utilisateur standard
- ROLE_ADMIN : administrateur

---

## 🔗 5. Modèle de données et relations

### USER → CLIENT

- Un utilisateur peut gérer plusieurs clients
- Un client appartient à un seul utilisateur


USER (0,N) —— GÉRER —— CLIENT (1,1)


---

### CLIENT → CONTRACT

- Un client peut posséder plusieurs contrats
- Un contrat appartient à un seul client


CLIENT (1,N) —— POSSEDER —— CONTRACT (1,1)


---

### CLIENT → DEVIS

- Un client peut demander plusieurs devis


CLIENT (1,N) —— DEMANDER —— DEVIS (1,1)


---

### CONTRACT → SINISTRE

- Un contrat peut générer plusieurs sinistres


CONTRACT (1,N) —— GENERER —— SINISTRE (1,1)


---

## 6. Gestion des clients

### Table `client`

- id (PK)
- name
- owner_id (FK → user.id)

Un client représente une personne ou entreprise assurée.

---

## 7. Gestion des contrats

### Table `contract`

- id (PK)
- contract_number
- insurance_type
- start_date
- end_date
- status
- premium_amount
- created_at
- updated_at
- client_id (FK)

### Rôle métier :

Le contrat représente l’engagement entre l’assureur et le client.

---

## 8. Gestion des devis

### Table `devis`

- id (PK)
- client_id (FK)
- insurance_type
- estimated_amount
- status
- created_at

### Rôle métier :

Le devis permet d’estimer le coût d’un contrat avant validation.

---

## 9. Gestion des sinistres

### Table `sinistre`

- id (PK)
- contract_id (FK)
- description
- incident_date
- status
- compensation_amount
- created_at

### Rôle métier :

Le sinistre correspond à un incident déclaré par un client nécessitant une analyse et éventuellement une indemnisation.

---

## 10. Sécurité

- Authentification via JWT
- Firewall Symfony
- Routes protégées selon les rôles
- Accès sécurisé aux données utilisateur

---

## 11. Technologies utilisées

- Symfony 6.4 LTS
- React
- MySQL 8.0
- Docker
- JWT (LexikJWTAuthenticationBundle)
- Doctrine ORM
- Nelmio CORS Bundle

---

## 12. Logique métier globale

Le système repose sur 3 étapes principales :

1. **Devis** : estimation du coût d’une assurance
2. **Contrat** : validation et engagement
3. **Sinistre** : gestion des incidents et remboursements

---

## 13. Conclusion

Ce projet permet de simuler une application professionnelle de gestion d’assurance en respectant une architecture moderne (API REST + frontend React + sécurité JWT + Docker).

Il met en pratique les concepts de développement backend, de modélisation de base de données et de sécurité applicative.