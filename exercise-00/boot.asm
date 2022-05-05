ORG 0X7C00
BITS 16

Jmp start

msg: db "Teste da FrAsE Com Vogais", 0x0D, 0x0A, 0
vogais: db "aeiouAEIOU", 0


start:
    xor ax, ax
    mov ds, ax
    mov es, ax

    ;stack
    mov ss, ax
    mov sp, 0x7c00

    mov si, msg
    call print_string
    mov si, msg
    call count_vogal

    mov ax, cx
    call print_number
end:
    jmp $ ; halt

count_vogal:
    xor cx, cx 
.loop:
    lodsb ; mov al, byte[si],  inc si
    or al, al
    jz .done
    lea bx, [vogais] ; dx aponta para início de n_vogais
.loop2:
    mov dl, [bx]
    inc bx

    or dl, dl
    jz .end_loop2

    xor dl, al
    jnz .loop2
    
    inc cx
    jmp .loop2

.end_loop2:

    jmp .loop
.done:
    ret

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