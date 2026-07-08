---
title: "Floating-Point Representation"
subject_code: "133BA"
subject: "Computer Organization and Architecture"
unit: 1
weight: 4
co_tag: ["CO1"]
date: 2026-07-03
draft: false
---

## Concept

Fixed-point representation forces a trade-off between range and precision because the point position never moves. Floating-point stores two fields instead:

- **Mantissa** — a signed, fixed-point number (fraction or integer) holding the significant digits
- **Exponent** — indicates the true position of the radix point

A floating-point number is always interpreted as:

> **value = m × rᵉ**

### Worked Example — Decimal

+6132.789 → mantissa +0.6132789, exponent +04 (≡ +0.6132789 × 10⁴).

### Worked Example — Binary

+1001.11₂, with an 8-bit fraction and 6-bit exponent → fraction 01001110, exponent 000100, representing +(.1001110)₂ × 2⁺⁴.

![Classic floating-point layout compared to IEEE 754 single precision](/images/coa/133ba_unit1_fig4_floating_point_layout.png)

## Normalization

A floating-point number is normalized when the most significant digit of the mantissa is nonzero — this uses every mantissa bit for precision.

### Worked Example — Normalizing a Mantissa

Mantissa 00011010 is not normalized (3 leading zeros). Shift left 3 → 11010000. Since a left shift multiplies the mantissa by r³, the exponent must be **reduced by 3** to keep the value unchanged.

## Representing Zero

Zero has no nonzero digit, so it cannot be normalized. By convention it is represented with an all-zero mantissa and all-zero exponent.

## Beyond the Syllabus: IEEE 754

The classic mantissa/exponent scheme is the conceptual ancestor of IEEE 754, used in virtually all modern hardware. Single precision fixes the layout at 1 sign bit + 8 exponent bits (bias 127) + 23 mantissa bits, plus rules for implicit leading 1s, special values, and rounding — beyond this course's scope but useful context.

<!-- TODO: interactive candidate — normalization step simulator (input mantissa/exponent, animate the shift-and-compensate process) -->

## Common Pitfalls

1. A left shift of the mantissa must decrease the exponent by the same amount — reversing this sign is the most frequent mistake.
2. The radix and mantissa point position are never physically stored — only the signed mantissa and signed exponent bits exist in the register.
3. Normalization maximizes precision, not range; range is governed separately by the exponent field width.

<!-- TODO: quiz candidate — normalize-this-mantissa practice set -->

## References

1. M. Morris Mano, *Digital Design*, 3rd ed., Pearson/PHI.
2. M. Morris Mano, *Computer System Architecture*, 3rd ed., Pearson/PHI.
3. IEEE Std 754 (IEEE Standard for Floating-Point Arithmetic) — supplementary context only.
