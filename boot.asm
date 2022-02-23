ORG 0X7C00
BITS 16

Jmp start

msg: db "hello world", 0x0D, 0x0A, 0

start:
    xor ax, ax
    mov ds, ax
    mov es, ax

    ;stack
    mov ss, ax
    mov sp, 0x7c00

    mov si, msg
    call print_string

    mov ax, 101
    call print_number
end:
    jmp $ ; halt

print_string:
.loop:
    lodsb ; mov al, byte[si],  inc si
    or al, al
    ; cmp al, 0
    ; je .done
    jz .done
    mov ah, 0x0E
    int 0x10 ; int 10h
    jmp .loop

.done:
    ret

print_number:
    mov bx, 10
    mov cx, 0
.loop1:
    mov dx, 0
    div bx    ; resposta ax, resto no dx
    add dx, 48
    push dx
    inc cx
    cmp ax, 0
    jne .loop1
.loop2:
    pop ax
    mov ah, 0x0E
    int 0x10
    loop .loop2
.done:
    ret

times 510 -($-$$) db 0
;; magic number - boot sig
dw 0xAA55