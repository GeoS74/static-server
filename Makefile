run:
	docker run --rm -d --name app -p 3500:3500 static-server
stop:
	docker stop app