function main() {
  const MAX_REPLACE_LEN = 6;
  let file = new TextDecoder()
    .decode(Deno.readFileSync("./output1.txt"))
    .trimEnd();

  let replacers: string[];

  do {
    replacers = Array(95)
      .fill(0)
      .map((_, i) => String.fromCharCode(i + 32))
      .filter((c) => !file.includes(c))
      .sort(() => Math.sign(Math.random() - 0.5));

    const replacer = replacers.pop()!;
    const map: Record<string, number> = { "": file.length };

    for (let i = 0; i < file.length; ++i) {
      for (let j = 3; j <= MAX_REPLACE_LEN; ++j) {
        const slice = file.slice(i, i + j);

        if (slice in map) {
          continue;
        }

        const new_length = file.replaceAll(slice, replacer).length;
        map[slice] = new_length;
      }
    }

    const min = Object.entries(map).sort(([, la], [, lb]) => la - lb)[0];
    // console.log(min);

    if (min[1] >= file.length) {
      break;
    }

    console.log(`${replacer} => ${JSON.stringify(min[0])}`);
    file = file.replaceAll(min[0], replacer);
  } while (replacers.length);

  console.log("\n" + file);
}

main();
