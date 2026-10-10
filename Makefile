.PHONY: dev build test up down

dev:
	npm run dev

build:
	npm run build

test:
	npm run test

up:
	docker compose up -d

down:
	docker compose down
