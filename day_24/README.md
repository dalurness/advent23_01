# Day 24: Elf Numbers

Santa and the elves are doing the last of the preparations getting ready to set off into the sky tonigh. As they get ready the ordering of the elves going through the halls is important to keep order and so nothing gets mixed up.

Elves use a system of numbering creatively called Elf Numbers. There is a formula mapping regular natural numbers to elf numbers. For each digit of a natural number put it through the following formula and add up all the results for each digit. Then repeat that process over and over again. If the sum is ever equal to 0 then the number is an Elf number. If the sum never reaches 0 then it is not an elf number.

The formula is:

```math
e(n) = \sum_{d \in \textup{digits of} n}^{}\frac{1}{6}d^{3}-\frac{1}{2}d^{2}+\frac{1}{3}d
```

Here's the first 10 numbers put through the formula once.

| $n$ | $e(n)$ |
|:---:|:------:|
|  0  |    0   |
|  1  |    0   |
|  2  |    0   |
|  3  |    1   |
|  4  |    4   |
|  5  |   10   |
|  6  |   20   |
|  7  |   35   |
|  8  |   56   |
|  9  |   84   |

Taking 7 as an example of the full process:

```math
\begin{aligned}
e(7) &= 35 \\
e(3) + e(5) &= 1 + 10 = 11 \\
e(1) + e(1) &= 0 + 0 = 0
\end{aligned}
```

It's imperative that Santa knows _the sum of the first 50,000 Elf Numbers_. Report back to Santa as soon as you get the results.

<details>
<summary>Hint</summary>

If there is a cycle in the chain when processing the numbers before reaching 0 then we know it won't be an Elf Number.

</details>