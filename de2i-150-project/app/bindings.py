import ctypes
import pathlib

libname = str(pathlib.PosixPath('../lib/iolib.so').absolute())
print(f'loading dynamic library {libname}')
c_iolib = ctypes.CDLL(libname)

def init_io():
    c_iolib.init_io()

def end_io():
    c_iolib.end_io()

def read_push_btn(idx):
    return c_iolib.read_push_btn(ctypes.c_int32(idx))

def read_swich(idx):
    return c_iolib.read_switch(ctypes.c_int32(idx))

def write_display(data : int, left : bool):
    c_iolib.write_display(
            ctypes.c_int32(data), 
            ctypes.c_int32(0 if left else 1))

def set_green_leds(leds_array):
    n = len(leds_array)
    buf = (ctypes.c_int8*(n + 1))()
    buf[n] = 0
    for i, x in enumerate(leds_array):
        buf[i] = ctypes.c_int8(x)

    ptr = ctypes.cast(buf, ctypes.POINTER(ctypes.c_int8))
    c_iolib.set_green_led(ptr)

def set_red_leds(leds_array):
    n = len(leds_array)
    buf = (ctypes.c_int8*(n + 1))()
    buf[n] = 0
    for i, x in enumerate(leds_array):
        buf[i] = ctypes.c_int8(x)

    ptr = ctypes.cast(buf, ctypes.POINTER(ctypes.c_int8))
    c_iolib.set_red_led(ptr)

def c_print_buf(array):
    n = len(array)
    buf = (ctypes.c_int8*(n + 1))()
    buf[n] = 0
    for i, x in enumerate(array):
        buf[i] = ctypes.c_int8(x)

    ptr = ctypes.cast(buf, ctypes.POINTER(ctypes.c_int8))
    c_iolib.print_buf(ptr, ctypes.c_int32(n))
