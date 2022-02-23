ORG 0X7C00
BITS 16

Jmp start

msg: db "Vogaissss", 0x0D, 0x0A, 0
vogais: db "aeiouAEIOU"
n_vogais: dw $-vogais

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

    
    mov bl, 'a'
    xor bl, al
    jz .inc

    mov bl, 'e'
    xor bl, al
    jz .inc

    mov bl, 'i'
    xor bl, al
    jz .inc

    mov bl, 'o'
    xor bl, al
    jz .inc

    mov bl, 'u'
    xor bl, al
    jz .inc

    jmp .continue

.inc:
    inc cl
    jmp .loop

.continue:

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