const onlyLower = /[a-z]/;
const charMatcher = /[a-zA-z]/;

const plaintext = Deno.readTextFileSync("polar_express.txt");

let output = "";
for (const ch of plaintext.split("")) {
  if (charMatcher.test(ch)) {
    output += `\\${charToNum(ch).toString().padStart(2, '0')}`
  } else if (ch === '\\') {
    output += '\\\\'
  } else {
    output += ch;
  }
}


function charToNum(char) {
  const isLower = onlyLower.test(char);
  return char.codePointAt() -
    (isLower ? "a".codePointAt() : "A".codePointAt()) + (isLower ? 0 : 26);
}

Deno.writeTextFileSync("large_message_encoded.txt", output)
