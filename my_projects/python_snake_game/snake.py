import os
import time
import threading
from pynput import keyboard

grid = []

for i in range(7):
    row = []
    for j in range(7):
        row.append("")
    grid.append(row)

grid[3][3] = 'o'
print(len(grid) -1)

o = []

for i in range(len(grid)):
    for j in range(len(grid[i])):
        o.append(j)

max_colunm = max(o)
# print(max_colunm)

# for i in range(len(grid)):
#     for j in range(len(grid)):
#         if grid[i][j] == 'o':
#             print(i, j)


running = True

def display():
    while running == True:
        os.system('cls' if os.name == 'nt' else 'clear')
        # print("\033[H\033[J", end="")  # limpa rápido
        for i in range(len(grid)):
            print(grid[i])
        time.sleep(0.1)
        
        #Saber posição
        # for i in range(len(grid)):
        #     for j in range(len(grid)):
        #         if grid[i][j] == 'o':
        #             print(i, j)


pressed_keys = set()

def key_press(k):

    if k in pressed_keys:
        return
    
    pressed_keys.add(k)

    try:
        if k.char == 'w':
            for i in range(len(grid)):
                for j in range(len(grid)):
                    if grid[i][j] == 'o':

                        grid[i][j] = ''
                        grid[i -1][j] = 'o'
                        return
                        
        elif k.char == 's':
            for i in range(len(grid)):
                for j in range(len(grid)):
                    if grid[i][j] == 'o':


                        if grid[i][j] == grid[len(grid) -1][j]:
                            grid[i][j] = ''
                            grid[0][j] = 'o'
                            return
                        else:
                            grid[i][j] = ''
                            grid[i +1][j] = 'o'
                            return
                     
        elif k.char == 'a':
            for i in range(len(grid)):
                for j in range(len(grid)):
                    if grid[i][j] == 'o':

                        grid[i][j] = ''
                        grid[i][j -1] = 'o'
                        return
        elif k.char == 'd':
            for i in range(len(grid)):
                for j in range(len(grid)):
                    if grid[i][j] == 'o':

                        if grid[i][j] == grid[i][max_colunm]:
                            grid[i][j] = ''
                            grid[i][0] = 'o'
                            return
                        else:
                            grid[i][j] = ''
                            grid[i][j +1] = 'o'
                            return

    except AttributeError:
        pass

def key_release(k):
    global running
    pressed_keys.discard(k)
    
    if k == keyboard.Key.esc:
        # print(len(grid))
        print("Limpando grid antes de sair...")
        grid.clear()
        running = False
        return False

display_thread = threading.Thread(target=display)
display_thread.start()

try:
    with keyboard.Listener(on_press=key_press, on_release=key_release) as listener:
        listener.join()

    display_thread.join()

finally:
    running = False