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
#include "iolib.h"

//@TODO: Escrever uma funcao para controlar os displays de 7 segmentos

int main(int argc, char** argv) {

    init_io();

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

	for(int i = 0; i < 32; i++) {
		usleep(200 * 1000);
		int val = ~(1 << i);
		write_display(val, 0);
		write_display(val, 1);
	}

	for(int i = 0; i < 10; i++) {
		sleep(1);
		for(int j = 0; j < 4; j++) {
			int val = read_push_btn(j);
			printf("%d ", val);
		}
		putchar('\n');
	}

	for(;;) {
		sleep(1);
		for(int i = 0; i < 10; i++) {
			int x = read_switch(i);
			printf("%d ", x);
		}
		putchar('\n');
	}

    end_io();
	
	return 0;
}
