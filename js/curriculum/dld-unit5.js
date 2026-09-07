// js/curriculum/dld-unit5.js — extracted from academic/dld/unit5/index.html
export const GROUPS = {
    'tg-statemachines': [
      { id:'moore-mealy-fsm',              title:'Moore vs. Mealy Finite State Machines', desc:'Sequential circuits as state machines, and the two standard models for how output relates to state and input.', time:'18 min', href:'moore-mealy-fsm.html', status:'active' },
      { id:'state-diagrams-tables',        title:'State Diagrams &amp; State Tables',      desc:'Reading and drawing state diagrams, and converting freely between diagram and tabular form.',                 time:'16 min', href:'state-diagrams-tables.html', status:'active' },
      { id:'state-reduction-assignment',   title:'State Reduction &amp; State Assignment', desc:'Merging equivalent states to minimize a design, then choosing binary codes for the states that remain.',      time:'18 min', href:'state-reduction-assignment.html', status:'active' },
      { id:'fsm-design-sequence-detector', title:'FSM Design Procedure — Sequence Detector', desc:'A complete worked design: state diagram → table → excitation → K-maps → circuit, for a serial pattern detector.', time:'24 min', href:'fsm-design-sequence-detector.html', status:'active' },
      { id:'programmable-logic-devices',   title:'Programmable Logic Devices',             desc:'ROM, PLA, and PAL — three ways to implement combinational logic as a programmable AND/OR array.',              time:'18 min', href:'programmable-logic-devices.html', status:'active' },
    ],
  };

export const GROUP_LABELS = {
  'tg-statemachines': '🧭 State Machines & PLDs',
};
