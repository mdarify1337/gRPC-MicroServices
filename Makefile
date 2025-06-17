all: build up

up: build
	docker compose -f docker-compose.yml up -d

build:
	docker compose -f docker-compose.yml build

down:
	docker compose -f docker-compose.yml down -v

clean: down remove
	docker compose -f docker-compose.yml down --rmi all

re: down up

logs:
	docker compose -f docker-compose.yml logs -f


docker-clean:
	docker stop $$(docker ps -q)
	docker rm $$(docker ps -aq)
	docker rmi $$(docker images -aq)
	docker system prune -af