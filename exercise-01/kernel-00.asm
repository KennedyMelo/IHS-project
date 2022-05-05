; comentarios

ORG 0x7C00
BITS 16
    jmp start

string_start times 32 db 0

start:
    xor ax, ax
    mov ds, ax
    mov es, ax
    mov ss, ax

    call store_ISR
    call read_string

    mov ax, string_start
    push ax

    xor ax, ax

    int 0x40

end:
    jmp $ ; halt

read_string:
    pusha
    mov di, string_start
.loop:
    mov ah, 0
    int 0x16

    cmp al, 0xd ; if it's return, we get out
    je .done

    mov byte[di], al
    inc di
    
    mov ah, 0x0E
    int 0x10

    jmp .loop
.done:
    mov al, 0x0a
    mov ah, 0x0E
    int 0x10

    mov al, 0x0d
    mov ah, 0x0E
    int 0x10

    popa
    ret

print_string:
.loop:
    lodsb
    or al, al
    jz .done
    mov ah, 0x0E
    int 0x10
    jmp .loop
.done:

    mov al, 0x0a
    mov ah, 0x0e
    int 0x10

    mov al, 0x0d
    mov ah, 0x0e
    int 0x10

    ret

int_40h_handler:
    push bp
    mov bp, sp

    ; this might be wrong but it works

    ; 8 - ax (we pushed this)
    ; 6 - flags
    ; 4 - cs
    ; 2 - ip
    ; 0 - bp 

    mov si, [bp+8]
    call print_string

    pop bp
    iret

store_ISR:
    xor ax, ax
    mov ds, ax
    push ds

    mov di, 0x100
    mov word[di], int_40h_handler
    mov word[di+2], 0

    pop ds

    ret

; assinatura de boot

    times 510-($-$$) db 0
    dw 0xAA55
