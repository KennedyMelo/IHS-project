obj-m += de2i-150-ioctl.o

all: build insmod chmod

insmod:
	sudo insmod de2i-150-ioctl.ko

chmod:
	sudo chmod 666 /dev/mydev

build:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) modules

clean:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) clean
	sudo rmmod de2i-150-ioctl
