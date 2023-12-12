function HoHash(input: string | Uint8Array): number {
  const prime = 31;
  let hash = 0;

  if (typeof input === "string") {
    input = new TextEncoder().encode(input);
  }

  for (const byte of input) {
    hash = (hash * prime + byte) % 2 ** 32;
  }

  return hash;
}

function HoMAC(key: string | Uint8Array, message: string | Uint8Array): number {
  const encoder = new TextEncoder();

  if (typeof message === "string") {
    message = encoder.encode(message);
  }

  if (typeof key === "string") {
    key = encoder.encode(key);
  }

  const inner = new Uint32Array([HoHash(new Uint8Array([...key, ...message]))]);

  return HoHash(new Uint8Array([...key, ...new Uint8Array(inner.buffer)]));
}

class HoHoHo4 {
  static #HOHOHO4_CONSTANT = "Ho Ho Ho";

  state: Uint8Array = new Uint8Array(16);
  key: string;

  constructor(key: string) {
    if (key.length !== 8) {
      throw new Error("Key must be of length 8");
    }

    this.key = key;
  }

  reset() {
    const encoder = new TextEncoder();

    this.state = new Uint8Array([
      ...encoder.encode(HoHoHo4.#HOHOHO4_CONSTANT),
      ...encoder.encode(this.key),
    ]);
  }

  /** Stir 4 values with each other. */
  stir(a: number, b: number, c: number, d: number) {
    this.state[a] += this.state[d] ^ this.state[c];
    this.state[b] += this.state[a] ^ this.state[d];
    this.state[c] += this.state[b] ^ this.state[a];
    this.state[d] += this.state[c] ^ this.state[b];
  }

  /** Mix by stirring 4 columns. */
  mix() {
    // stir each column
    this.stir(0, 4, 8, 12);
    this.stir(1, 5, 9, 13);
    this.stir(2, 6, 10, 14);
    this.stir(3, 7, 11, 15);
  }

  cipher(input: Uint8Array): Uint8Array {
    this.reset();

    const out = new Uint8Array(input.length);

    for (let i = 0; i < input.length; i += this.state.length) {
      // this is HoHoHo4, so mix 4 times
      for (let i = 0; i < 4; ++i) {
        this.mix();
      }

      for (let j = 0; j < this.state.length && i + j < input.length; ++j) {
        out[i + j] = input[i + j] ^ this.state[j];
      }
    }

    return out;
  }
}

function encrypt() {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const wordlist = decoder
    .decode(Deno.readFileSync("./wordlist.txt"))
    .trimEnd()
    .split("\n");

  wordlist.push(...wordlist.map((w) => w.toLowerCase()));

  function gen_dictionary(
    wordlist: string[],
    word = "",
    dictionary = new Set<string>()
  ) {
    if (word.length === 8) {
      dictionary.add(word);
    } else if (word.length < 8) {
      for (const w of wordlist) {
        gen_dictionary(wordlist, word + w, dictionary);
      }
    }

    return dictionary;
  }

  const dictionary = [...gen_dictionary(wordlist)];
  const real_key = dictionary[Math.floor(Math.random() * dictionary.length)];
  let key = real_key;

  console.log(real_key);
  const hohoho4 = new HoHoHo4(key);

  for (let i = 1; i <= 7; ++i) {
    const num = i % 7;

    if (num === 0) {
      key = "XmasXmas";
      hohoho4.key = key;
    }

    const plaintext = decoder
      .decode(Deno.readFileSync(`./msg${num}.txt`))
      .trimEnd();
    const encrypted = hohoho4.cipher(encoder.encode(plaintext));
    const ho_mac = HoMAC(key, encrypted);

    const ciphertext = encoder.encode(
      `${ho_mac.toString()}\n${encrypted.join(",")}\n`
    );
    Deno.writeFileSync(`./secret${num}.txt`, ciphertext);
  }

  return real_key;
}

function decrypt(key: string) {
  const decoder = new TextDecoder();
  const hohoho4 = new HoHoHo4(key);

  for (let i = 1; i <= 7; ++i) {
    const num = i % 7;

    if (num === 0) {
      key = "XmasXmas";
      hohoho4.key = key;
    }

    const ciphertext = decoder
      .decode(Deno.readFileSync(`./secret${num}.txt`))
      .trimEnd()
      .split("\n");
    const ho_mac = Number(ciphertext[0]);
    const encrypted = new Uint8Array(ciphertext[1].split(",").map(Number));

    const verify_ho_mac = HoMAC(key, encrypted);

    if (verify_ho_mac !== ho_mac) {
      console.log(
        `HoMACs don't match on ./secret${num}.txt: ${verify_ho_mac} !== ${ho_mac}`
      );
      continue;
    }

    const plaintext = decoder.decode(hohoho4.cipher(encrypted));
    console.log(plaintext + "\n\n---\n");
  }
}

decrypt(encrypt());
