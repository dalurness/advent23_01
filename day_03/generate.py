import random
import sys

random.seed("day03") # make random reproducible

lines = []

valid_codes = 0
added_parts = 0
removed_parts = 0

for _ in range(100):
    code = ""
    parts = 0
    for _ in range(random.randint(1, 10)):
        if parts == 0 or random.choice([True, False]):
            code += random.choice("AAAC") # 25% mess up
            parts += 1
            added_parts += 1
        else:
            code += random.choice("RRRP") # 25% mess up
            parts -= 1
            removed_parts += 1

    code += random.choice("CCA") # 33% mess up
    code += random.choice("PPR") # 33% mess up

    if code.endswith("CP"):
        parts = 0
        for c in code[:-2]:
            if c == "A":
                parts += 1
            elif c == "R":
                parts -= 1
                if parts < 0:
                    break
            elif c == "C" or c == "P":
                parts = -1
                break

        if parts >= 0:
            valid_codes += 1

    lines.append(code)


print(f"valid codes: {valid_codes}", file=sys.stderr)
print(f"added parts: {added_parts}", file=sys.stderr)
print(f"removed parts: {removed_parts}", file=sys.stderr)

print("\n".join(lines))
