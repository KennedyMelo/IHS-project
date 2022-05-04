#include <stdio.h>	/* printf */
#include <stdlib.h>	/* malloc, atoi, rand... */
#include <string.h>	/* memcpy, strlen... */
#include <stdint.h>	/* uints types */
#include <sys/types.h>	/* size_t ,ssize_t, off_t... */
#include <unistd.h>	/* close() read() write() */
#include <fcntl.h>	/* open() */
#include <sys/ioctl.h>	/* ioctl() */
#include <errno.h>	/* error codes */


int main(int argc, char** argv)
{
	int fd, retval;

	if (argc < 2) {
		printf("Syntax: %s <device file path>\n", argv[0]);
		return -EINVAL;
	}

	if ((fd = open(argv[1], O_RDWR)) < 0) {
		fprintf(stderr, "Error opening file %s\n", argv[1]);
		return -EBUSY;
	}

	unsigned int data = ~0;

	for(int i = 0; i <= 0xff; i++) {
		//ioctl(fd, WR_R_DISPLAY);
		retval = write(fd, &i, sizeof(data));
		printf("wrote %d bytes\n", retval);
		sleep(1);
	}

	data = 0;
	
	//ioctl(fd, WR_L_DISPLAY);
	retval = write(fd, &data, sizeof(data));
	printf("wrote %d bytes\n", retval);
	
	//ioctl(fd, RD_PBUTTONS);
	read(fd, &data, 1);
	printf("new data: 0x%X\n", data);
	
	close(fd);
	return 0;
}
