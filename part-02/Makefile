all:
	nasm kernel-00.asm -f bin -o kernel-00.bin
	qemu-system-x86_64 -drive format=raw,file=kernel-00.bin
