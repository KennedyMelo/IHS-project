#include "iolib.h"

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

void print_buf(unsigned char* buf, unsigned int sz) {
#ifndef MOCK
	for(int i = 0; i < sz; i++) {
		printf("%X ", buf[i]);
	}

	putchar('\n');
#endif
}

// There are 8 green leds
int set_green_led(unsigned char* arr) {

#ifndef MOCK
	unsigned int mask = 0;
	for(int i = 0; i < 8; i++) {
		if(arr[i]) mask |= (1 << i);
	}

	ioctl(fd, WR_GREEN_LEDS);

	retval = write(fd, &mask, sizeof(mask));
	printf("wrote %d bytes\n", retval);
	return retval;
#endif
}


// There are 17 green leds
int set_red_led(unsigned char* arr) {
#ifndef MOCK
	unsigned int mask = 0;
	for(int i = 0; i < 18; i++) {
		if(arr[i]) mask |= (1 << i);
	}

	ioctl(fd, WR_RED_LEDS);

	retval = write(fd, &mask, sizeof(mask));
	printf("wrote %d bytes\n", retval);
	return retval;
#endif
}

// pass the index and the function will return the value of that button
// 0 <= idx <= 3
unsigned char read_push_btn(int idx) {
#ifndef MOCK
	unsigned char c;

	ioctl(fd, RD_PBUTTONS);
	retval = read(fd, &c, sizeof(c));

	return (c & (1 << idx)) ? 0 : 1;
#endif
}

// pass the index and the function will return the value of that switch 
// 0 <= idx <= 17
unsigned char read_switch(int idx) {
#ifndef MOCK
	ioctl(fd, RD_SWITCHES);
	unsigned int x = 0;
	retval = read(fd, &x, sizeof(x));

	return (x & (1 << idx)) ? 1 : 0;
#endif
}

void write_display(unsigned int data, int display) {
#ifdef MOCK
	ioctl(fd, display ? WR_DISPLAY_R : WR_DISPLAY_7_SEG);
	retval = write(fd, &data, sizeof(data));
#endif
}

int init_io() {
#ifndef MOCK
	if ((fd = open(FILE_PATH, O_RDWR)) < 0) {
		fprintf(stderr, "Error opening file %s\n", FILE_PATH);
		return -EBUSY;
	}

    return 0;
#endif
}

void end_io() {
#ifndef MOCK
	close(fd);
#endif
}

