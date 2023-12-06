# Day 08

Santa has limited space in his sleigh, so he needs to know the different ways it can be packed. Santa is magic, so his sleigh is a tube that can store only one long line of presents (check out Jesse's lore for the reason why! It's very interesting). Presents can be of any size from 1 - 9, but max out at the size of the sleigh (for when the sleigh is smaller than 9). Because of magic reasons (again, check the lore!), presents of the same size can't be next to one another. Also, you're only searching for present arrangements that fill the sleigh. An empty sleigh is not allowed! Neither is one with any gaps!

Here's an example of all the possible combos for a sleigh of length 3:

- 3
- 2, 1
- 1, 2

Note, [1, 1, 1] is not allowed because it has 2 presents of the same size next to each other!

Some more examples for different sleigh sizes:

4:
- 1, 2, 1
- 1, 3
- 3, 1
- 4

5:
- 1, 3, 1
- 1, 4
- 2, 1, 2
- 2, 3
- 3, 2
- 4, 1
- 5

<details>
<summary>For 10 (which has 123 total valid combinations)</summary>
- 1, 2, 1, 2, 1, 2, 1
- 1, 2, 1, 2, 1, 3
- 1, 2, 1, 2, 3, 1
- 1, 2, 1, 2, 4
- 1, 2, 1, 3, 1, 2
- 1, 2, 1, 3, 2, 1
- 1, 2, 1, 4, 2
- 1, 2, 1, 5, 1
- 1, 2, 1, 6
- 1, 2, 3, 1, 2, 1
- 1, 2, 3, 1, 3
- 1, 2, 3, 4
- 1, 2, 4, 1, 2
- 1, 2, 4, 2, 1
- 1, 2, 4, 3
- 1, 2, 5, 2
- 1, 2, 6, 1
- 1, 2, 7
- 1, 3, 1, 2, 1, 2
- 1, 3, 1, 2, 3
- 1, 3, 1, 3, 2
- 1, 3, 1, 4, 1
- 1, 3, 1, 5
- 1, 3, 2, 1, 2, 1
- 1, 3, 2, 1, 3
- 1, 3, 2, 3, 1
- 1, 3, 2, 4
- 1, 3, 4, 2
- 1, 3, 5, 1
- 1, 3, 6
- 1, 4, 1, 3, 1
- 1, 4, 1, 4
- 1, 4, 2, 1, 2
- 1, 4, 2, 3
- 1, 4, 3, 2
- 1, 4, 5
- 1, 5, 1, 2, 1
- 1, 5, 1, 3
- 1, 5, 3, 1
- 1, 5, 4
- 1, 6, 1, 2
- 1, 6, 2, 1
- 1, 6, 3
- 1, 7, 2
- 1, 8, 1
- 1, 9
- 2, 1, 2, 1, 3, 1
- 2, 1, 2, 1, 4
- 2, 1, 2, 3, 2
- 2, 1, 2, 4, 1
- 2, 1, 2, 5
- 2, 1, 3, 1, 2, 1
- 2, 1, 3, 1, 3
- 2, 1, 3, 4
- 2, 1, 4, 1, 2
- 2, 1, 4, 2, 1
- 2, 1, 4, 3
- 2, 1, 5, 2
- 2, 1, 6, 1
- 2, 1, 7
- 2, 3, 1, 3, 1
- 2, 3, 1, 4
- 2, 3, 2, 1, 2
- 2, 3, 2, 3
- 2, 3, 4, 1
- 2, 3, 5
- 2, 4, 1, 2, 1
- 2, 4, 1, 3
- 2, 4, 3, 1
- 2, 5, 1, 2
- 2, 5, 2, 1
- 2, 5, 3
- 2, 6, 2
- 2, 7, 1
- 2, 8
- 3, 1, 2, 1, 2, 1
- 3, 1, 2, 1, 3
- 3, 1, 2, 3, 1
- 3, 1, 2, 4
- 3, 1, 3, 1, 2
- 3, 1, 3, 2, 1
- 3, 1, 4, 2
- 3, 1, 5, 1
- 3, 1, 6
- 3, 2, 1, 3, 1
- 3, 2, 1, 4
- 3, 2, 3, 2
- 3, 2, 4, 1
- 3, 2, 5
- 3, 4, 1, 2
- 3, 4, 2, 1
- 3, 4, 3
- 3, 5, 2
- 3, 6, 1
- 3, 7
- 4, 1, 2, 1, 2
- 4, 1, 2, 3
- 4, 1, 3, 2
- 4, 1, 4, 1
- 4, 1, 5
- 4, 2, 1, 2, 1
- 4, 2, 1, 3
- 4, 2, 3, 1
- 4, 2, 4
- 4, 3, 1, 2
- 4, 3, 2, 1
- 4, 5, 1
- 4, 6
- 5, 1, 3, 1
- 5, 1, 4
- 5, 2, 1, 2
- 5, 2, 3
- 5, 3, 2
- 5, 4, 1
- 6, 1, 2, 1
- 6, 1, 3
- 6, 3, 1
- 6, 4
- 7, 1, 2
- 7, 2, 1
- 7, 3
- 8, 2
- 9, 1
</details>

<hr>

**Find the number of possible arrangements of presents for a sleigh of length TODO**. For an extra challenge, see how large a sleigh you can compute the number of combinations for!

<hr>

<details>
<summary>Jesse's Lore</summary>
Jesse will fill this out
</details>
