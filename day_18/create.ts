function P(probability: number) {
  return Math.random() < probability;
}

function C<T>(...choices: T[]): T {
  return choices[(choices.length * Math.random()) | 0];
}

type Move = ">" | "<" | "^" | "v";

function main() {
  const height = 64;
  const width = height * 2;
  const map = Array(height)
    .fill("")
    .map(() => Array(width).fill("."));

  for (const row of map) {
    for (const i of row.keys()) {
      if (P(0.2)) {
        row[i] = ((Math.random() * 9) | 0) + 1;
      }
    }
  }

  let prev_move: Move | null = null;
  let x = (width * Math.random()) | 0;

  for (let y = 0; y < height - 1; ++y) {
    const row = map[y];
    let move: Move;
    if (prev_move === "v") {
      const moves = new Set<Move>(["<", ">"]);
      if (x === 0) {
        moves.delete("<");
      } else if (x >= width) {
        moves.delete(">");
      }
      move = C(...moves.values());
    } else {
      move = "v";
    }

    row[x] = move;
    prev_move = move;

    switch (move) {
      case ">": {
        x += ((width - x) * Math.random()) | 0;
        --y;
        break;
      }
      case "<": {
        x -= (x * Math.random()) | 0;
        --y;
        break;
      }
    }
  }

  console.log(map.map((row) => row.join("")).join("\n"));
}

main();
