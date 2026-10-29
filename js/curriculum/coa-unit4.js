// js/curriculum/coa-unit4.js — COA Unit 4 topic list (Batch 5: 12 live topics; all Unit 4 topics live)
export const GROUPS = {
    'tg-microprogrammed-control': [
      { id:'control-memory',      title:'Control Memory',      desc:'How control words stored in memory replace hard-wired control.',      time:'20 min', href:'control-memory.html',      status:'active' },
      { id:'address-sequencing',  title:'Address Sequencing',  desc:'How the next microinstruction address is chosen: increment, branch, mapping, subroutine.',          time:'20 min', href:'address-sequencing.html',  status:'active' },
    ],
    'tg-cpu': [
      { id:'general-register-organization', title:'General Register Organization', desc:'A CPU built around a register set, a shared ALU and control words.', time:'18 min', href:'general-register-organization.html', status:'active' },
      { id:'stack-organization', title:'Stack Organization', desc:'Register and memory stacks, push and pop, and reverse Polish notation.', time:'18 min', href:'stack-organization.html', status:'active' },
      { id:'instruction-formats', title:'Instruction Formats', desc:'Three-, two-, one- and zero-address instructions compared.', time:'16 min', href:'instruction-formats.html', status:'active' },
      { id:'addressing-modes', title:'Addressing Modes', desc:'How an instruction finds its operand, with worked effective-address examples.', time:'18 min', href:'addressing-modes.html', status:'active' },
      { id:'data-transfer-manipulation', title:'Data Transfer and Manipulation', desc:'Data transfer, arithmetic, logical and shift instructions.', time:'15 min', href:'data-transfer-manipulation.html', status:'active' },
      { id:'program-control', title:'Program Control', desc:'Branch, call, return and interrupt instructions, and the status bits.', time:'16 min', href:'program-control.html', status:'active' },
    ],
    'tg-computer-arithmetic': [
      { id:'addition-subtraction', title:'Addition and Subtraction', desc:'Signed-magnitude addition and subtraction, with the hardware and algorithm.', time:'15 min', href:'addition-subtraction.html', status:'active' },
      { id:'multiplication-algorithms', title:'Multiplication Algorithms', desc:'Shift-and-add multiplication and Booth\'s algorithm.', time:'18 min', href:'multiplication-algorithms.html', status:'active' },
      { id:'division-algorithms', title:'Division Algorithms', desc:'Restoring division and divide-overflow detection.', time:'15 min', href:'division-algorithms.html', status:'active' },
      { id:'floating-point-arithmetic', title:'Floating-Point Arithmetic Operations', desc:'Adding, subtracting, multiplying and dividing floating-point numbers.', time:'18 min', href:'floating-point-arithmetic.html', status:'active' },
    ],
    // Supplementary topics: extra pages beyond the syllabus (no quiz, not required for the certificate) — see js/curriculum/supplementary.js
    'tg-supplementary': [
      { id:'pipelining', title:'Pipelining', desc:'Pipeline segments, space-time diagram, speedup and throughput with solved problems, instruction pipelines and hazards.', time:'25 min', href:'pipelining.html', status:'active', supplementary:true, related:'general-register-organization' },
    ],
};

export const GROUP_LABELS = {
  'tg-microprogrammed-control': '🔧 Microprogrammed Control',
  'tg-cpu': '🖥️ Central Processing Unit',
  'tg-computer-arithmetic': '🔢 Computer Arithmetic',
  'tg-supplementary': 'Supplementary Topics — Beyond the Syllabus',
};
