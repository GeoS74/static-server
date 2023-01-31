run:
	docker run --rm -d --name app -p 3100:3100 -e SERVER_PORT=3100 static-server
stop:
	docker stop app