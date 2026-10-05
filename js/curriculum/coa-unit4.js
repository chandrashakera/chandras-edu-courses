// js/curriculum/coa-unit4.js — COA Unit 4 topic list (Batch 2: 6 live topics; computer arithmetic group empty until later batches)
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
    ],
    'tg-computer-arithmetic': [],
};

export const GROUP_LABELS = {
  'tg-microprogrammed-control': '🔧 Microprogrammed Control',
  'tg-cpu': '🖥️ Central Processing Unit',
  'tg-computer-arithmetic': '🔢 Computer Arithmetic',
};
