import { toText } from "https://deno.land/std@0.209.0/streams/mod.ts";

class xHoHoHo {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  cipher(input: Uint8Array): Uint8Array {
    return input.map(
      (byte, i) => byte ^ this.key.charCodeAt(i % this.key.length)
    );
  }
}

async function main() {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const xhohoho = new xHoHoHo(await Deno.readTextFile("./keyfile.txt"));

  const message = await toText(Deno.stdin.readable);

  const ciphertext = xhohoho.cipher(encoder.encode(message));
  const output = Array.from(ciphertext)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .map((byte, i) => ((i + 1) % 32 === 0 ? `${byte}\n` : `${byte} `))
    .join("")
    .trimEnd();

  console.log(output);

  const plaintext = decoder.decode(xhohoho.cipher(ciphertext));
  console.error(plaintext === message ? "Success" : "Fail");
}

main();
