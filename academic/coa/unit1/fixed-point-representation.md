---
title: "Fixed-Point Representation"
subject_code: "133BA"
subject: "Computer Organization and Architecture"
unit: 1
weight: 3
co_tag: ["CO1"]
date: 2026-07-03
draft: false
---

## Concept

Since hardware only stores 0s and 1s, the sign of a number is encoded as an extra bit in the leftmost (most significant) position: 0 for positive, 1 for negative. The binary/decimal point is never physically stored — its position is a convention fixed in advance, hence "fixed-point": either at the extreme left (fraction) or extreme right (integer) of the register.

## Signed Integer Representations

When the sign bit is 1 (negative), the remaining bits can be encoded three ways. Positive numbers are identical under all three schemes.

- **Signed-magnitude** — sign bit + ordinary binary magnitude
- **Signed-1's-complement** — sign bit + 1's complement of the magnitude
- **Signed-2's-complement** — sign bit + 2's complement of the magnitude

![Signed representations of -14 in an 8-bit register](/images/coa/133ba_unit1_fig3_signed_representations.png)

## Addition Rules

**Signed-magnitude:** mirrors manual arithmetic — same signs: add magnitudes, keep sign; different signs: subtract smaller from larger, take sign of larger. Requires a comparison step.

**Signed-2's-complement:** a single uniform rule — add both numbers including sign bits, discard any carry out of the sign-bit position. No comparison or subtractor needed; this is why modern CPUs use it.

| Case | Operands (8-bit, 2's complement) | Result |
|---|---|---|
| +, + | 00000110 (+6) + 00001101 (+13) | 00010011 (+19) |
| −, + | 11111010 (−6) + 00001101 (+13) | 00000111 (+7) |
| +, − | 00000110 (+6) + 11110011 (−13) | 11111001 (−7) |
| −, − | 11111010 (−6) + 11110011 (−13) | 11101101 (−19) |

## Overflow Detection

Overflow occurs when the true sum of two *n*-digit numbers needs *n*+1 digits.

- **Unsigned:** detected by an end carry out of the MSB.
- **Signed:** cannot occur when operands have opposite signs. Detected when the carry into the sign bit ≠ carry out of the sign bit. Example: (+70)+(+80) = 150 overflows an 8-bit signed field.

## Note: Signed Decimal (BCD) Arithmetic

Signed BCD numbers follow the same signed-complement logic per digit, with sign coded in 4 bits (0000 = +, 1001 = −). Example: (+375)+(−240) = +135 via 10's-complement addition. Full decimal arithmetic circuitry is covered under Computer Arithmetic (Unit 4).

<!-- TODO: interactive candidate — 2's-complement addition calculator with live overflow-flag indicator -->

## Common Pitfalls

1. In 2's-complement addition the sign bit is added like any other bit — do not add magnitudes and reattach sign separately (that's only valid for signed-magnitude).
2. The overflow test differs for signed vs unsigned numbers — applying the unsigned end-carry test to signed operands is wrong.
3. Signed-magnitude addition needs a magnitude comparison before subtracting; skipping this is a common source of sign errors.

<!-- TODO: quiz candidate — overflow detection scenarios (mixed signed/unsigned) -->

## References

1. M. Morris Mano, *Digital Design*, 3rd ed., Pearson/PHI.
2. M. Morris Mano, *Computer System Architecture*, 3rd ed., Pearson/PHI.
