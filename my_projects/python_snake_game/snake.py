import os
import time
# import keyboard
from pynput import keyboard

grid = []

for i in range(7):
    row = []
    for j in range(7):
        row.append("")
    grid.append(row)

def display():
    # os.system('cls' if os.name == 'nt' else 'clear')
    print("\033[H\033[J", end="")  # limpa rápido
    # time.sleep(0.2)

    for i in range(len(grid)):
        print(grid[i])

key_releasead = False

pressed_keys = set()

def key_press(k):

    if k in pressed_keys:
        return
    
    pressed_keys.add(k)

    try:
        if k.char == 'w':
            print("up")
        elif k.char == 's':
            print("down")
        elif k.char == 'a':
            print("left")
        elif k.char == 'd':
            print("right")

    except AttributeError:
        pass

def key_release(k):
    display()
    pressed_keys.discard(k)
    
    if k == keyboard.Key.esc:
        # print(len(grid))
        print("Limpando grid antes de sair...")
        grid.clear()
        return False

try:
    with keyboard.Listener(on_press=key_press, on_release=key_release) as listener:
        listener.join()

finally:
    print("Limpando grid antes de sair...")
    grid.clear()

