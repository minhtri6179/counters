DB_URL=postgresql://root:secret@localhost:5432/counters?sslmode=disable

postgres:
	docker run --name postgres12 -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:12-alpine

createdb:
	docker exec -it postgres12 createdb --username=root --owner=root counters

dropdb:
	docker exec -it postgres12 dropdb counters

migrateup:
	psql -h localhost -U root -d counters < create_table.sql

test:
	npm run test

lint:
	npm run lint

.PHONY: postgres createdb dropdb migrateup test