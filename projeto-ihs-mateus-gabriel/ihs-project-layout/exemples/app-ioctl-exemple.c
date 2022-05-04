#include <stdio.h>	/* printf */
#include <stdlib.h>	/* malloc, atoi, rand... */
#include <string.h>	/* memcpy, strlen... */
#include <stdint.h>	/* uints types */
#include <sys/types.h>	/* size_t ,ssize_t, off_t... */
#include <unistd.h>	/* close() read() write() */
#include <fcntl.h>	/* open() */
#include <sys/ioctl.h>	/* ioctl() */
#include <errno.h>	/* error codes */
#include "../driver/ioctl_cmds.h"


static int fd, retval;

static void print_buf(unsigned char* buf, unsigned int sz) {
	for(int i = 0; i < sz; i++) {
		printf("%X ", buf[i]);
	}

	putchar('\n');
}

// There are 8 green leds
static int set_green_led(unsigned char* arr) {
	unsigned int mask = 0;
	for(int i = 0; i < 8; i++) {
		if(arr[i]) mask |= (1 << i);
	}

	ioctl(fd, WR_GREEN_LEDS);

	retval = write(fd, &mask, sizeof(mask));
	printf("wrote %d bytes\n", retval);
	return retval;
}


// There are 17 green leds
static int set_red_led(unsigned char* arr) {
	unsigned int mask = 0;
	for(int i = 0; i < 18; i++) {
		if(arr[i]) mask |= (1 << i);
	}

	ioctl(fd, WR_RED_LEDS);

	retval = write(fd, &mask, sizeof(mask));
	printf("wrote %d bytes\n", retval);
	return retval;
}


int main(int argc, char** argv)
{

	if (argc < 2) {
		printf("Syntax: %s <device file path>\n", argv[0]);
		return -EINVAL;
	}

	if ((fd = open(argv[1], O_RDWR)) < 0) {
		fprintf(stderr, "Error opening file %s\n", argv[1]);
		return -EBUSY;
	}


	unsigned char leds[20] = {0};
	{
		int a = 0;
		int b = 1;
		for(int i = 0; i < 20; i++) {
			if(a > 20) break;
			leds[a] = 1;

			int c = a;
			a = b;
			b = c + b;
		}
	}

	set_green_led(leds);
	set_red_led(leds);

	unsigned char buf[50] = {0};

	ioctl(fd, RD_PBUTTONS);
	retval = read(fd, &buf, sizeof(buf));

	print_buf(buf, 10);

	//printf("wrote %d bytes\n", retval);
	
	//ioctl(fd, RD_PBUTTONS);
	//read(fd, &data, 1);
	//printf("new data: 0x%X\n", data);
	
	close(fd);
	return 0;
}
