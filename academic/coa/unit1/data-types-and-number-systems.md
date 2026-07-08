---
title: "Data Types and Number Systems"
subject_code: "133BA"
subject: "Computer Organization and Architecture"
unit: 1
weight: 1
co_tag: ["CO1"]
date: 2026-07-03
draft: false
---

## Concept

Registers in a digital computer hold either **control information** (bits that sequence command signals) or **data** — the numbers and coded information the machine operates on. Data falls into three categories:

- Numbers used in arithmetic computations
- Letters of the alphabet used in data processing
- Other discrete symbols used for specific purposes

Except for numbers expressed in pure binary form, all of these are represented internally in binary-coded form.

## Radix (Base) Number Systems

A number system of radix *r* uses *r* distinct digit symbols, 0 through *r* − 1.

| System | Radix (r) | Digit symbols |
|---|---|---|
| Decimal | 10 | 0–9 |
| Binary | 2 | 0, 1 |
| Octal | 8 | 0–7 |
| Hexadecimal | 16 | 0–9, A–F |

A digit string represents a quantity as: **value = Σ (digitᵢ × rⁱ)**, with *i* the position index (negative for fractional digits).

### Worked Example — Binary/Octal/Hex to Decimal

- (101101)₂ = 1×2⁵+0×2⁴+1×2³+1×2²+0×2¹+1×2⁰ = **(45)₁₀**
- (736.4)₈ = 7×8²+3×8¹+6×8⁰+4×8⁻¹ = **(478.5)₁₀**
- (F3)₁₆ = 15×16¹+3×16⁰ = **(243)₁₀**

## Converting Decimal to Radix r

- **Integer part:** divide repeatedly by *r*; read remainders bottom-to-top.
- **Fraction part:** multiply repeatedly by *r*; read carry digits top-to-bottom (may not terminate — stop at required precision).

### Worked Example — 41.6875 → Binary

| Integer = 41 | Rem. | Fraction = 0.6875 | Carry |
|---|---|---|---|
| 41÷2=20 | 1 | 0.6875×2=1.3750 | 1 |
| 20÷2=10 | 0 | 0.3750×2=0.7500 | 0 |
| 10÷2=5 | 0 | 0.7500×2=1.5000 | 1 |
| 5÷2=2 | 1 | 0.5000×2=1.0000 | 1 |
| 2÷2=1 | 0 | (terminates) | |
| 1÷2=0 | 1 | | |

**(41.6875)₁₀ = (101001.1011)₂**

## Fast Conversion via Bit Grouping

Since 8 = 2³ and 16 = 2⁴, each octal digit ↔ 3 bits and each hex digit ↔ 4 bits.

![Grouping binary digits into octal and hexadecimal](/images/coa/133ba_unit1_fig1_radix_grouping.png)

<!-- TODO: interactive candidate — number-base converter widget (enter value + source/target base, show step-by-step division/multiplication or bit-grouping) -->

## Common Pitfalls

1. Fractional conversions may not terminate — state the working precision rather than assuming an exact stop.
2. Pad with leading zeros to complete outer bit groups when converting to octal/hex — forgetting this shifts every digit.
3. The radix fixes both the symbol set and the positional weight base — never reuse decimal-only digits inside an octal number.

<!-- TODO: quiz candidate — 5-question MCQ on radix conversion (decimal↔binary↔octal↔hex) -->

## References

1. M. Morris Mano, *Digital Design*, 3rd ed., Pearson/PHI.
2. M. Morris Mano, *Computer System Architecture*, 3rd ed., Pearson/PHI.
