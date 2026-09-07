// js/curriculum/coa-unit3.js — extracted from academic/coa/unit3/index.html
export const GROUPS = {
    'tg-rtl-microops': [
      { id:'register-transfer-language',   title:'Register Transfer Language',      desc:'Notation for describing register contents and the operations performed on them.',            time:'16 min', href:'register-transfer-language.html', status:'active' },
      { id:'register-transfer',            title:'Register Transfer',               desc:'Controlled transfer statements, and the hardware — control gates and a clock — that implements them.', time:'16 min', href:'register-transfer.html', status:'active' },
      { id:'bus-memory-transfers',         title:'Bus &amp; Memory Transfers',       desc:'Sharing one common bus among many registers via multiplexers, and reading/writing memory.',   time:'20 min', href:'bus-memory-transfers.html', status:'active' },
      { id:'arithmetic-microoperations',   title:'Arithmetic Micro-operations',     desc:'Add, subtract, increment, decrement — and the one adder-subtractor circuit that does all four.', time:'18 min', href:'arithmetic-microoperations.html', status:'active' },
      { id:'logic-microoperations',        title:'Logic Micro-operations',          desc:'Bitwise AND/OR/XOR/complement, and how they selectively set, clear, and mask bits.',         time:'16 min', href:'logic-microoperations.html', status:'active' },
      { id:'shift-microoperations',        title:'Shift Micro-operations',          desc:'Logical, circular, and arithmetic shifts, and a combinational shifter built from multiplexers.', time:'16 min', href:'shift-microoperations.html', status:'active' },
      { id:'arithmetic-logic-shift-unit',  title:'Arithmetic Logic Shift Unit',     desc:'Combining the arithmetic circuit, logic circuit, and shifter into one selectable ALU.',        time:'20 min', href:'arithmetic-logic-shift-unit.html', status:'active' },
    ],
    'tg-basic-computer-org': [
      { id:'instruction-codes',           title:'Instruction Codes',              desc:'Encoding an operation and its address into a single binary instruction word.', time:'18 min', href:'instruction-codes.html', status:'active' },
      { id:'computer-registers',          title:'Computer Registers',             desc:'The register set of a simple computer — AR, PC, DR, AC, IR, TR, and the I/O registers.', time:'18 min', href:'computer-registers.html', status:'active' },
      { id:'computer-instructions',       title:'Computer Instructions',          desc:'The complete instruction set, and how the instruction format distinguishes memory-reference from register-reference and I/O instructions.', time:'20 min', href:'computer-instructions.html', status:'active' },
      { id:'timing-and-control',          title:'Timing and Control',             desc:'The sequence counter and decoder that generate the timing signals driving every micro-operation.', time:'18 min', href:'timing-and-control.html', status:'active' },
      { id:'instruction-cycle',           title:'Instruction Cycle',              desc:'Fetch, decode, and execute — the repeating cycle every stored-program computer runs.', time:'20 min', href:'instruction-cycle.html', status:'active' },
      { id:'memory-reference-instructions', title:'Memory Reference Instructions', desc:'The seven basic memory-reference instructions and their register transfer statements.', time:'22 min', href:'memory-reference-instructions.html', status:'active' },
      { id:'io-and-interrupt',            title:'Input-Output and Interrupt',     desc:'Program-controlled I/O and the interrupt cycle that lets hardware request the CPU\'s attention.', time:'22 min', href:'io-and-interrupt.html', status:'active' },
    ],
  };
