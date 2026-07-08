---
title: "Complements"
subject_code: "133BA"
subject: "Computer Organization and Architecture"
unit: 1
weight: 2
co_tag: ["CO1"]
date: 2026-07-03
draft: false
---

## Concept

Complements let digital hardware perform subtraction using only an adder plus a complementing step, avoiding a dedicated subtractor circuit. Every base *r* system defines two complements: the **(r − 1)'s complement** and the **r's complement**.

## (r − 1)'s Complement

For an *n*-digit number *N* in base *r*:

> **(r − 1)'s complement of N = (rⁿ − 1) − N**

- Decimal (9's complement): (10ⁿ − 1) − N. Example: 9's complement of 546700 = 999999 − 546700 = **453299**.
- Binary (1's complement): (2ⁿ − 1) − N — reduces to toggling every bit. Example: 1's complement of 1011001 = **0100110**.

## r's Complement

> **r's complement of N = rⁿ − N = (r − 1)'s complement + 1**

- Decimal (10's complement) of 2389 = 7610 + 1 = **7611**.
- Binary (2's complement) of 101100 = 010011 + 1 = **010100**.

## Subtraction Using the r's Complement

To compute M − N for unsigned *n*-digit numbers, add M to the r's complement of N.

![Subtraction procedure using the r's complement](/images/coa/133ba_unit1_fig2_complement_subtraction_flow.png)

### Worked Example 1 — Decimal, end carry produced (M ≥ N)

72532 − 13250: 10's complement of 13250 = 86750. Sum = 72532+86750 = 159282. Discard end carry → **59282** (positive).

### Worked Example 2 — Decimal, no end carry (M < N)

13250 − 72532: 10's complement of 72532 = 27468. Sum = 13250+27468 = 40718. No end carry → **−(10's complement of 40718) = −59282**.

### Worked Example 3 — Binary

X = 1010100 (84), Y = 1000011 (67).
- X − Y: 2's complement of Y = 0111101; sum = 10010001; discard end carry → **0010001 (+17)**
- Y − X: 2's complement of X = 0101100; sum = 1101111; no end carry → **−(2's complement of 1101111) = −0010001 (−17)**

<!-- TODO: interactive candidate — step-through subtraction walkthrough (user enters M, N, base; widget shows complement + add + carry-check steps) -->

## Practice Problems

1. Find the 9's and 10's complement of 246700.
2. Find the 1's and 2's complement of 1101100.

## Common Pitfalls

1. The (r−1)'s complement is a pure digit-wise/bitwise operation; the r's complement additionally needs "+1" — conflating the two is the most common error.
2. End-carry interpretation is counter-intuitive: a carry present means the result is already positive (discard it); no carry means negative, requiring a further complement step.
3. A complement is always relative to a fixed digit width *n* — decide the register/field size before complementing.

<!-- TODO: quiz candidate — "carry present vs absent" decision quiz -->

## References

1. M. Morris Mano, *Digital Design*, 3rd ed., Pearson/PHI.
2. M. Morris Mano, *Computer System Architecture*, 3rd ed., Pearson/PHI.
