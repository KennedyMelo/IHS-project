#ifndef __IOLIB_H__
#define __IOLIB_H__

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

#define FILE_PATH "/dev/mydev"


void print_buf(unsigned char* buf, unsigned int sz);

// There are 8 green leds
int set_green_led(unsigned char* arr);

// There are 17 green leds
int set_red_led(unsigned char* arr);

// pass the index and the function will return the value of that button
// 0 <= idx <= 3
unsigned char read_push_btn(int idx);

// pass the index and the function will return the value of that switch 
// 0 <= idx <= 17
unsigned char read_switch(int idx);
void write_display(unsigned int data, int display);
int init_io();
void end_io();

#endif 
