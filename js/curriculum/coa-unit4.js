// js/curriculum/coa-unit4.js — COA Unit 4 topic list (Batch 5: 13 live topics; all Unit 4 topics live)
export const GROUPS = {
    'tg-microprogrammed-control': [
      { id:'control-memory',      title:'Control Memory',      desc:'ROM stores microinstructions as binary control words; CAR sequences through them.',      time:'16 min', href:'control-memory.html',      status:'active' },
      { id:'address-sequencing',  title:'Address Sequencing',  desc:'The four sequencer capabilities: increment, branch, map, and subroutine call.',          time:'16 min', href:'address-sequencing.html',  status:'active' },
    ],
    'tg-cpu': [
      { id:'general-register-organization', title:'General Register Organization', desc:'Register file, two MUXes, ALU, and decoder form a 14-bit control word datapath.', time:'18 min', href:'general-register-organization.html', status:'active' },
      { id:'stack-organization', title:'Stack Organization', desc:'Register stack with SP, FULL and EMTY flags, push/pop RTL, memory stack, and RPN.', time:'18 min', href:'stack-organization.html', status:'active' },
      { id:'instruction-formats', title:'Instruction Formats', desc:'Three-, two-, one- and zero-address instruction formats and their trade-offs.', time:'16 min', href:'instruction-formats.html', status:'active' },
      { id:'addressing-modes', title:'Addressing Modes', desc:'All addressing modes in Mano §8-5, with the nine effective-address cases of Table 8-4.', time:'18 min', href:'addressing-modes.html', status:'active' },
      { id:'data-transfer-manipulation', title:'Data Transfer and Manipulation', desc:'Four instruction groups in Mano §8-6: data transfer, arithmetic, logic/bit manipulation, and shift, with Tables 8-5 through 8-9.', time:'15 min', href:'data-transfer-manipulation.html', status:'active' },
      { id:'program-control', title:'Program Control', desc:'Branch, call, return, and interrupt instructions in Mano §8-7; the four status bits C, S, Z, V; and the subroutine call RTL.', time:'16 min', href:'program-control.html', status:'active' },
      { id:'risc', title:'RISC', desc:'RISC versus CISC in Mano §8-8; the seven RISC characteristics; overlapped register windows (Fig. 8-9); Berkeley RISC I formats (Fig. 8-10).', time:'15 min', href:'risc.html', status:'active' },
    ],
    'tg-computer-arithmetic': [
      { id:'addition-subtraction', title:'Addition and Subtraction', desc:'Signed-magnitude and signed-2\'s complement addition and subtraction in §10-2, with hardware block diagram (Fig. 10-1), flowchart (Fig. 10-2), and overflow detection.', time:'15 min', href:'addition-subtraction.html', status:'active' },
      { id:'multiplication-algorithms', title:'Multiplication Algorithms', desc:'Signed-magnitude multiply hardware and flowchart (Fig. 10-5, 10-6), Booth\'s algorithm for signed-2\'s complement numbers (Fig. 10-8), and array multiplier in §10-3.', time:'18 min', href:'multiplication-algorithms.html', status:'active' },
      { id:'division-algorithms', title:'Division Algorithms', desc:'Hardware divide algorithm for signed-magnitude data in §10-4: divide overflow detection (DVF), restoring algorithm flowchart (Fig. 10-13), and numerical example.', time:'15 min', href:'division-algorithms.html', status:'active' },
      { id:'floating-point-arithmetic', title:'Floating-Point Arithmetic Operations', desc:'Representation, normalisation and biased exponents in §10-5; hardware algorithms for FP addition and subtraction (Fig. 10-15), multiplication (Fig. 10-16), and division (Fig. 10-17).', time:'18 min', href:'floating-point-arithmetic.html', status:'active' },
    ],
};

export const GROUP_LABELS = {
  'tg-microprogrammed-control': '🔧 Microprogrammed Control',
  'tg-cpu': '🖥️ Central Processing Unit',
  'tg-computer-arithmetic': '🔢 Computer Arithmetic',
};
