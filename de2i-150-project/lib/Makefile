all:
	gcc -shared -o iolib.so -fPIC iolib.c
	gcc -L. -l:iolib.so ioctl-example.c -o app

mock:
	gcc -shared -DMOCK -o iolib.so -fPIC iolib.c
	gcc -L. -l:iolib.so ioctl-example.c -o app

clean:
	rm iolib.so
	rm app

