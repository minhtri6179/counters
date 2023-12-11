-include .env

postgres:
	docker run --name postgres12 -p 5432:5432 -e POSTGRES_USER="${DB_USER}" -e POSTGRES_PASSWORD="${DB_PASSWORD_LOCAL}" -d postgres:12-alpine

createdb:
	docker exec -it postgres12 createdb --username=root --owner=root counters

dropdb:
	docker exec -it postgres12 dropdb counters

migrateup:
	psql -h localhost -U root -d counters < create_table.sql

migratescriptup:
	migrate -path db/migration -database "${DB_URL}" -verbose up

migratescriptdown:
	migrate -path db/migration -database "${DB_URL}" -verbose down

migrateupremote:
	migrate -path db/migration -database "${REMOTE_DB_URL}" -verbose up

migratedownremote:
	migrate -path db/migration -database "${REMOTE_DB_URL}" -verbose down

migrateupprod:
	migrate -path db/migration -database "${REMOTE_DB_URL_P}" -verbose up

migratedownprod:
	migrate -path db/migration -database "${REMOTE_DB_URL_P}" -verbose down

test:
	npm run test

lint:
	npm run lint

coverage:
	npm run coverage

.PHONY: postgres createdb dropdb migrateup migratescriptup migratescriptdown test lint coverage migrateupprod migratedownprod migrateupremote migratedownprod
