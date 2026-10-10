# CRM Platform API

Base path: `/api`

## Endpoints

### `GET /api/contacts`
List all contacts, newest first.

### `POST /api/contacts`
Create a contact. Body:
```json
{ "name": "Jane Doe", "email": "jane@example.com", "company": "Acme", "tags": ["vip"], "stage": "lead" }
```
`name` and `email` are required.

### `GET /api/contacts/:id/activities`
List activities for a contact, newest first.

## Response shape

Contacts are returned with camelCase fields:
```json
{ "id": "...", "name": "...", "email": "...", "company": "...", "tags": [], "stage": "lead", "createdAt": "..." }
```

## Errors

Errors use a consistent shape: `{ "error": "message" }` with an appropriate
HTTP status (400 for validation, 500 for server errors).
