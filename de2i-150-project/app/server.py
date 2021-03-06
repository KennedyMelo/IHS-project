from ast import literal_eval
import asyncio
#from msilib.schema import Component
from random import randint
import websockets
import json
from bindings import *

board_state = None

def bitmask_to_int(bitmask):
    is_first = True
    acumulador = 0
    for item in bitmask:

        if(not is_first):
            acumulador = acumulador << 1

        if(item==1):
            acumulador += 1

        is_first = False

    return acumulador & 0xff

def concatena_bytes(l):
    
    #l.reverse()

    #s = ""
    soma = 0

    for index, item in enumerate(l):
        soma += (item & 0xff) << (index*8)
        
        #s += str(item)

    return soma & 0xffffffff

def generate_final_value(initial_string_with_value):

    bitmask = {
        '0': [1,0,0,0,0,0,0],
        '1': [1,1,1,1,0,0,1],
        '2': [0,1,0,0,1,0,0],
        '3': [0,1,1,0,0,0,0],
        '4': [0,0,1,1,0,0,1],
        '5': [0,0,1,0,0,1,0],
        '6': [0,0,0,0,0,1,0],
        '7': [1,1,1,1,0,0,0],
        '8': [0,0,0,0,0,0,0],
        '9': [0,0,1,1,0,0,0],
    }



    vector_with_chars = [ char for char in initial_string_with_value]
    vector_with_chars.reverse()
    lista_de_bytes = map(bitmask_to_int,[bitmask[item] for item in vector_with_chars]) 
    value = concatena_bytes(lista_de_bytes) 
    return value & 0xffffffff



def write_display_CORRECTED(string_with_4_digits):

    initial_string_with_value = string_with_4_digits
    #initial_string_with_value ="9269"
    #initial_string_with_value = "9999"

    # pega só os 4 primeiros dígitos
    initial_string_with_value = initial_string_with_value[:4 if (len(initial_string_with_value)>4) else len(initial_string_with_value) ]
    print(f"writing {initial_string_with_value} on left 7 segment display")

    # adiciona zeros à esquerda
    if(len(initial_string_with_value) < 4):
        initial_string_with_value = "0"*(4-len(initial_string_with_value)) + initial_string_with_value
        print(f"(actually printing {initial_string_with_value})")
    

    #slice_0 = initial_string_with_value[int(len(initial_string_with_value)/2):]
    #slice_1 = initial_string_with_value[:int(len(initial_string_with_value)/2)]

    value_final = generate_final_value(initial_string_with_value)

    # faz as mágicas pra deixar no formato certo 
    #value_0 = generate_final_value(slice_0)
    #value_1 = generate_final_value(slice_1)

    #write_display(value_final, False)

    # passa para a função de write no display
    write_display(value_final, False)
    #write_display(value_0, False)
    #write_display(value_1, True)

def build_state():
    s = {}

    s['green_leds'] = [0 for _ in range(0, 8)]
    s['red_leds'] = [0 for _ in range(0, 18)]
    s['push_button'] = [0 for _ in range(0, 4)]
    s['switches'] = [0 for _ in range(0, 18)]
    s['display_left'] = 0xff
    s['display_right'] = 0xff

    return s

async def mock_change_state():
    iter = 0
    while True:
        await asyncio.sleep(0.1)
        #board_state['green_leds'][iter % len(board_state['green_leds'])] = 0
        #iter += 1
        #board_state['green_leds'][iter % len(board_state['green_leds'])] = 1
        for sw in range(0, len(board_state['switches'])):
            board_state['switches'][sw] = read_switch(sw)
        
        for ps in range(0, len(board_state['push_button'])):
            board_state['push_button'][ps] = read_push_btn(ps)
        
        set_red_leds(board_state['red_leds'])
        set_green_leds(board_state['green_leds'])
        #write_display(board_state['display_left'], False)
        #print(board_state['display_left'])
        write_display_CORRECTED(str(board_state['display_left']))


        #board_state['red_leds'][iter % len(board_state['red_leds'])] = 0 
        #board_state['switches'][iter % len(board_state['switches'])] = 0
        #board_state['push_button'][iter % len(board_state['push_button'])] = 0
        #iter += 1
        #board_state['switches'][iter % len(board_state['switches'])] = 1
        #board_state['red_leds'][iter % len(board_state['red_leds'])] = 1
        #board_state['push_button'][iter % len(board_state['push_button'])] = 1



async def send_state(websocket):
    while True:
        await asyncio.sleep(0.5)
        data = json.dumps(board_state, indent=2)
        #print('sending shit')
        await websocket.send(data)

def executeCommand(command):
    if(command["component"] == 'display_left'):
        board_state['display_left'] = command['state']
    else:
        board_state[command['component']][command['index']] = command['state']    
        
    

async def read_commands(websocket):
    async for msg in websocket:
        print(f'received: {msg}')
        if(msg != "connected"):
            command = eval(msg)
            executeCommand(command)

async def serve(websocket, path):
    print(f'path: {path}')

    send = asyncio.create_task(send_state(websocket))
    read = asyncio.create_task(read_commands(websocket))

    await send
    await read 

async def main():
#    print(f'btn {read_push_btn(10)}, switch {read_switch(5)}')
 #   c_print_buf([ord(x) for x in "Hello there"])

    init_io()
    mock_change = asyncio.create_task(mock_change_state())

    async with websockets.serve(serve, "localhost", 3001):
        await asyncio.Future()  # run forever
        await mock_change
    end_io()

if __name__ == '__main__':
    board_state = build_state()
    asyncio.run(main())
