from bindings import *

if __name__ == '__main__':

    print(f'btn {read_push_btn(10)}, switch {read_switch(5)}')
    c_print_buf([ord(x) for x in "Hello there"])
