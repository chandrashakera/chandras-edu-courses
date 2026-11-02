// js/curriculum/coa-unit1.js — extracted from academic/coa/unit1/index.html
export const GROUPS = {
    'tg-data-rep': [
      { id:'data-types-number-systems',     title:'Data Types & Number Systems',    desc:'Radix systems, positional notation, decimal↔binary↔octal↔hex conversion, bit grouping, other bases.',    time:'40 min', href:'data-types-number-systems.html',     status:'active' },
      { id:'complements',                   title:'Complements',                    desc:"(r−1)'s and r's complement; subtraction via complement addition; end-carry rule.",             time:'45 min', href:'complements.html',                   status:'active' },
      { id:'fixed-point-representation',    title:'Fixed-Point Representation',     desc:"Sign-magnitude, 1's complement, 2's complement; addition rules; overflow detection.",         time:'20 min', href:'fixed-point-representation.html',     status:'active' },
      { id:'floating-point-representation', title:'Floating-Point Representation',  desc:'Mantissa and exponent, normalisation and zero, worked examples, and IEEE 754 single and double precision.',        time:'25 min', href:'floating-point-representation.html',   status:'active' },
    ],
    'tg-boolean': [
      { id:'binary-codes',           title:'Binary Codes',                desc:'BCD, self-complementing Excess-3 code, Gray code, ASCII, and parity.',          time:'18 min', href:'binary-codes.html', status:'active' },
      { id:'binary-storage-registers', title:'Binary Storage & Registers',  desc:'Flip-flop storage cells, registers, and 2ⁿ possible values.',             time:'10 min', href:'binary-storage-registers.html', status:'active' },
      { id:'binary-logic',           title:'Binary Logic',                desc:'Binary variables and the AND, OR, NOT operations with truth tables.',                  time:'12 min', href:'binary-logic.html', status:'active' },
      { id:'digital-logic-gates',    title:'Digital Logic Gates',         desc:"Seven gate symbols, DeMorgan's theorem, NAND/NOR universality.",                   time:'20 min', href:'digital-logic-gates.html', status:'active' },
      { id:'k-map-representation',   title:'K-Map Representation',        desc:'Karnaugh map grouping rules, 3 & 4-variable worked examples, minterms, maxterms and POS.',                        time:'25 min', href:'k-map-representation.html', status:'active' },
    ],
    'tg-digital': [
      { id:'introduction-digital-computers',       title:'Introduction to Digital Computers',      desc:"What 'digital' really means, why computers use binary, and hardware vs. software.", time:'12 min', href:'introduction-digital-computers.html', status:'active' },
      { id:'block-diagram-digital-computer',       title:'Block Diagram of a Digital Computer',    desc:'CPU, memory, I/O — how the major components connect.',                   time:'15 min', href:'block-diagram-digital-computer.html', status:'active' },
      { id:'computer-organization-vs-architecture', title:'Computer Organization vs Architecture', desc:'The distinction between how a computer is built vs. what it can do.',     time:'14 min', href:'computer-organization-vs-architecture.html', status:'active' },
      { id:'computer-design',                      title:'Computer Design',                        desc:'Design levels — gates, registers, processors, and systems.',              time:'13 min', href:'computer-design.html', status:'active' },
    ],
    // Supplementary topics: extra pages beyond the syllabus (no quiz, not required for the certificate) — see js/curriculum/supplementary.js
    'tg-supplementary': [
      { id:'number-conversions-solved-problems', title:'Number Conversions — Solved Problems', desc:"Solved base conversions with fractions, and r's and (r−1)'s complement subtraction.", time:'20 min', href:'number-conversions-solved-problems.html', status:'active', supplementary:true, related:'data-types-number-systems' },
      { id:'boolean-kmap-solved-problems', title:'Boolean Simplification and K-Maps — Solved Problems', desc:"Solved algebraic simplification, canonical SOP/POS, and 4-variable K-maps with don't-cares.", time:'25 min', href:'boolean-kmap-solved-problems.html', status:'active', supplementary:true, related:'k-map-representation' },
    ],
  };

export const GROUP_LABELS = {
  'tg-data-rep': '📊 Data Representation',
  'tg-boolean': '⚡ Boolean Algebra & Logic Gates',
  'tg-digital': '🖥️ Digital Computers',
  'tg-supplementary': 'Supplementary Topics — Beyond the Syllabus',
};
