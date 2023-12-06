// drawing strats
// down right
// random
// shortest

type PointMap = (string | null)[][];

const files = false
  ? ["small.txt"]
  : ["one.txt", "two.txt", "three.txt", "four.txt", "five.txt"];

for (const [idx, file] of files.entries()) {
  const img = Deno.readTextFileSync(file);
  const point_map = stringTo2dArray(img);

  let commands;
  if (idx % 3 === 0) {
    commands = shortWalkRender(point_map);
  } else if (idx % 3 === 1) {
    commands = randomWalkRender(point_map);
  } else {
    commands = rightDownRender(point_map);
  }

  Deno.writeTextFileSync(`${idx+1}.txt`, commands.join('\n'))
}

function shortWalkRender(points: PointMap): string[] {
  const commands: string[] = [];

  const loc = [0, 0];

  for (const [y, line] of shuffle([...points.entries()])) {
    char_loop: for (const [x, char] of shuffle([...line.entries()])) {
      if (char === null) {
        continue char_loop;
      }

      if (loc[0] !== x) {
        if (x > loc[0]) {
          // need to move right
          const move_spaces = x - loc[0];
          commands.push(`R${move_spaces}`);
          loc[0] += move_spaces;
        } else {
          // need to move left
          const move_spaces = loc[0] - x;
          commands.push(`L${move_spaces}`);
          loc[0] -= move_spaces;
        }
      }
      if (loc[1] !== y) {
        if (y > loc[1]) {
          // need to move down
          const move_spaces = y - loc[1];
          commands.push(`D${move_spaces}`);
          loc[1] += move_spaces;
        } else {
          // need to move up
          const move_spaces = loc[1] - y;
          commands.push(`U${move_spaces}`);
          loc[1] -= move_spaces;
        }
      }
      commands.push(`P${char}`);
    }
  }

  return commands;
}

function randomWalkRender(points: PointMap): string[] {
  const commands: string[] = [];
  for (const [y, line] of points.entries()) {
    char_loop: for (const [x, char] of line.entries()) {
      if (char === null) {
        continue char_loop;
      }
      const loc = [0, 0];
      while (x !== loc[0] || y !== loc[1]) {
        if (Math.round(Math.random())) {
          if (x !== loc[0]) {
            loc[0]++;
            commands.push(`R1`);
          }
        } else {
          if (y !== loc[1]) {
            loc[1]++;
            commands.push(`D1`);
          }
        }
      }
      commands.push(`P${char}`);
      commands.push("LR");
    }
  }

  return commands;
}

function rightDownRender(points: PointMap): string[] {
  const commands: string[] = [];
  for (const [y, line] of points.entries()) {
    char_loop: for (const [x, char] of line.entries()) {
      if (char === null) {
        continue char_loop;
      }
      commands.push(`R${x}`);
      commands.push(`D${y}`);
      commands.push(`P${char}`);
      commands.push(`LR`);
    }
  }
  return commands;
}

function stringTo2dArray(img: string): PointMap {
  return img.split("\n")
    .map((line) =>
      line.split("")
        .map((char) => char === " " ? null : char)
    )
    .filter((line) => line.length > 0);
}

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
