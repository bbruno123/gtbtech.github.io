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

up = False
right = False

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


def moviment():
    while running == True:

        if up:
            for i in range(len(grid)):
                for j in range(len(grid)):
                    if grid[i][j] == 'o':

                        grid[i][j] = ''
                        grid[i -1][j] = 'o'

        if up == False:
            for i in range(len(grid)):
                for j in range(len(grid)):
                    if grid[i][j] == 'o':


                        if grid[i][j] == grid[len(grid) -1][j]:
                            grid[i][j] = ''
                            grid[0][j] = 'o'

                        else:
                            grid[i][j] = ''
                            grid[i +1][j] = 'o'
        
        if right == False:
            for i in range(len(grid)):
                for j in range(len(grid)):
                    if grid[i][j] == 'o':

                        grid[i][j] = ''
                        grid[i][j -1] = 'o'

        if right == True:
            for i in range(len(grid)):
                for j in range(len(grid)):
                    if grid[i][j] == 'o':

                        if grid[i][j] == grid[i][max_colunm]:
                            grid[i][j] = ''
                            grid[i][0] = 'o'
                        else:
                            grid[i][j] = ''
                            grid[i][j +1] = 'o'

        time.sleep(0.5)


pressed_keys = set()

def key_press(k):
    global up, right

    if k in pressed_keys:
        return
    
    pressed_keys.add(k)

    try:
        if k.char == 'w':

            up = True

            # if up == False:
            #     pass
            # else:
            #     up = True

            for i in range(len(grid)):
                for j in range(len(grid)):
                    if grid[i][j] == 'o':

                        grid[i][j] = ''
                        grid[i -1][j] = 'o'
                        return
                        
        elif k.char == 's':
            up = False

            # if up == True:
            #     pass
            # else:
            #     up = False

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
            
            right = False

            # if right == False:
            #     pass
            # else:
            #     right = True

            for i in range(len(grid)):
                for j in range(len(grid)):
                    if grid[i][j] == 'o':

                        grid[i][j] = ''
                        grid[i][j -1] = 'o'
                        return
        elif k.char == 'd':

            # right = True

            # if right == True:
            #     pass
            # else:
            #     right = False

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

# display_thread1 = threading.Thread(target=moviment)
# display_thread1.start()

try:
    with keyboard.Listener(on_press=key_press, on_release=key_release) as listener:
        listener.join()

    display_thread.join()
    # display_thread1.join()

finally:
    running = False