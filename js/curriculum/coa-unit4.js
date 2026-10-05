// js/curriculum/coa-unit4.js — COA Unit 4 topic list (Batch 1: 3 live topics; computer arithmetic group empty until later batches)
export const GROUPS = {
    'tg-microprogrammed-control': [
      { id:'control-memory',      title:'Control Memory',      desc:'ROM stores microinstructions as binary control words; CAR sequences through them.',      time:'16 min', href:'control-memory.html',      status:'active' },
      { id:'address-sequencing',  title:'Address Sequencing',  desc:'The four sequencer capabilities: increment, branch, map, and subroutine call.',          time:'16 min', href:'address-sequencing.html',  status:'active' },
    ],
    'tg-cpu': [
      { id:'general-register-organization', title:'General Register Organization', desc:'Register file, two MUXes, ALU, and decoder form a 14-bit control word datapath.', time:'18 min', href:'general-register-organization.html', status:'active' },
    ],
    'tg-computer-arithmetic': [],
};

export const GROUP_LABELS = {
  'tg-microprogrammed-control': '🔧 Microprogrammed Control',
  'tg-cpu': '🖥️ Central Processing Unit',
  'tg-computer-arithmetic': '🔢 Computer Arithmetic',
};
