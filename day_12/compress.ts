import { toText } from "https://deno.land/std@0.209.0/streams/mod.ts";

async function main() {
  const MAX_REPLACE_LEN = 10;
  let file = await toText(Deno.stdin.readable);

  while (true) {
    const replacer = Array(95)
      .fill(0)
      .map((_, i) => String.fromCharCode(i + 32))
      .filter((c) => !file.includes(c))
      .sort(() => Math.sign(Math.random() - 0.5))
      .at(0);

    if (!replacer) {
      break;
    }

    const replace_map: Record<string, number> = { "": file.length };

    for (let i = 0; i < file.length - 1; ++i) {
      for (let j = 2; j < MAX_REPLACE_LEN; ++j) {
        const slice = file.slice(i, i + j + 1);

        if (slice in replace_map) {
          continue;
        }

        const new_length = file.replaceAll(slice, replacer).length;
        replace_map[slice] = new_length;
      }
    }

    const min = Object.entries(replace_map)
      .sort(([, la], [, lb]) => la - lb)
      .at(0)!;
    // console.error(min);

    if (min[1] >= file.length) {
      break;
    }

    console.log(`${replacer} => ${JSON.stringify(min[0])}`);
    file = file.replaceAll(min[0], replacer);
  }

  console.log("\n" + file);
}

main();
