// js/curriculum/coa-unit2.js — extracted from academic/coa/unit2/index.html
export const GROUPS = {
    'tg-combinational': [
      { id:'combinational-circuits',  title:'Combinational Circuits',    desc:'What makes a circuit combinational: no memory of past inputs, the n-input/m-output block model.', time:'12 min', href:'combinational-circuits.html', status:'active' },
      { id:'analysis-procedure',      title:'Analysis Procedure',        desc:'How to work backward from a logic diagram to the Boolean function it computes.', time:'15 min', href:'analysis-procedure.html', status:'active' },
      { id:'design-procedure',        title:'Design Procedure',          desc:'The four-step procedure for designing a new circuit from a specification, with a K-map worked example.', time:'18 min', href:'design-procedure.html', status:'active' },
      { id:'adders-subtractors',      title:'Binary Adder',              desc:'Half adder and full adder built from gates, chained into a ripple-carry binary adder.', time:'18 min', href:'binary-adder.html', status:'active' },
      { id:'binary-subtractor',       title:'Binary Subtractor',         desc:"The full subtractor, and the combined adder-subtractor circuit using 2's complement.", time:'16 min', href:'binary-subtractor.html', status:'active' },
      { id:'decimal-adder',           title:'Decimal (BCD) Adder',       desc:'Correcting a binary sum into valid BCD with the add-6 rule and a correction-circuit block diagram.', time:'16 min', href:'decimal-adder.html', status:'active' },
      { id:'binary-multiplier',       title:'Binary Multiplier',         desc:'Building a multiplier from an AND-gate partial-product array plus a network of adders.', time:'14 min', href:'binary-multiplier.html', status:'active' },
      { id:'magnitude-comparator',    title:'Magnitude Comparator',      desc:'Comparing two numbers bit by bit from the MSB, and cascading comparator stages to any width.', time:'16 min', href:'magnitude-comparator.html', status:'active' },
      { id:'decoders',                title:'Decoders',                  desc:'Expanding a binary code to one active line, with enable inputs and function implementation.', time:'17 min', href:'decoders.html', status:'active' },
      { id:'encoders',                title:'Encoders',                  desc:'Compressing one active line back into a binary code, and the priority problem in doing so.', time:'16 min', href:'encoders.html', status:'active' },
      { id:'multiplexers',            title:'Multiplexers',              desc:'Selecting one of many inputs with a binary address — and implementing any function with one.', time:'16 min', href:'multiplexers.html', status:'active' },
    ],
    'tg-sequential': [
      { id:'sequential-circuits',              title:'Sequential Circuits',                     desc:'What makes a circuit sequential: memory elements, feedback, and the next-state idea.', time:'12 min', href:'sequential-circuits.html', status:'active' },
      { id:'latches',                          title:'Latches',                                 desc:'SR and gated D latches — the simplest level-sensitive memory elements.', time:'16 min', href:'latches.html', status:'active' },
      { id:'flip-flops',                       title:'Flip-Flops',                               desc:'Edge-triggered storage, master-slave JK, block symbols for all four types, and a gate-level clocked SR flip-flop.', time:'20 min', href:'flip-flops.html', status:'active' },
      { id:'analysis-of-sequential-circuits',  title:'Analysis of Clocked Sequential Circuits',  desc:'Next-state and output equations, state tables, and state diagrams, worked through an example.', time:'18 min', href:'analysis-of-sequential-circuits.html', status:'active' },
      { id:'registers',                        title:'Registers',                                desc:'n-bit storage registers and parallel load via a 2:1 multiplexer per bit.', time:'16 min', href:'registers.html', status:'active' },
      { id:'shift-registers',                  title:'Shift Registers',                          desc:'SISO, SIPO, PISO, and PIPO configurations, each with its own diagram, plus the shift/load control table.', time:'22 min', href:'shift-registers.html', status:'active' },
      { id:'ripple-counters',                  title:'Ripple Counters',                          desc:'Cascaded toggle flip-flops, a down-counter, and a full modulo-10 (BCD) counter with NAND reset wired in.', time:'18 min', href:'ripple-counters.html', status:'active' },
      { id:'synchronous-counters',             title:'Synchronous Counters',                     desc:'The 4-step synchronous design procedure worked through a 3-bit JK up-counter and down-counter with K-maps.', time:'24 min', href:'synchronous-counters.html', status:'active' },
      { id:'other-counters',                   title:'Other Counters',                           desc:'Ring and Johnson (twisted-ring) counters built from a shift register, plus the decade counter as a building block.', time:'18 min', href:'other-counters.html', status:'active' },
    ],
  };
