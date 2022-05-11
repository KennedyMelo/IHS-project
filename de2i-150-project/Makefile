all: build run

build:
	cd ./driver && $(MAKE) all
	cd ./lib && $(MAKE) all

mock:
	cd ./driver && $(MAKE) all
	cd ./lib && $(MAKE) mock

run:
	cd ./app && bash -c "python server.py"

clean:
	cd ./driver && $(MAKE) clean
	cd ./lib && $(MAKE) clean
