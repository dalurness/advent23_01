# Figured I would include this in the repo. feel free to make a larger challenge file to test yourself

from random import randrange

f = open("letters_challenge.txt", "a")
for i in range(0, 10000000):
    f.write(str(randrange(1, 197)) + ' ')

# with open("letters_challenge.txt") as f:
#     data = f.read()
#     i = 0
#     for _ in data:
#         i = i + 1
#     # print(data)
#     print(len(data))
#     print(i)