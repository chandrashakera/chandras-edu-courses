// js/curriculum/dld-unit2.js — extracted from academic/dld/unit2/index.html
export const GROUPS = {
    'tg-kmap': [
      { id:'kmap-2-3-variable',       title:'K-Maps: 2 &amp; 3 Variables',            desc:'The K-map grid, Gray-code adjacency, and grouping rules for minimal SOP.', time:'20 min', href:'kmap-2-3-variable.html', status:'active' },
      { id:'kmap-4-variable',         title:'4-Variable K-Maps',                       desc:'Extending to 16 cells, with wraparound adjacency in both directions.',     time:'20 min', href:'kmap-4-variable.html', status:'active' },
      { id:'pos-simplification',      title:'Product-of-Sums (POS) Simplification',   desc:"Grouping the 0-cells instead of the 1s, using the maxterm convention.",     time:'18 min', href:'pos-simplification.html', status:'active' },
      { id:'dont-care-conditions',    title:"Don't-Care Conditions",                   desc:"Using inputs that never occur to simplify a K-map even further.",          time:'18 min', href:'dont-care-conditions.html', status:'active' },
      { id:'nand-nor-implementation', title:'NAND/NOR Implementation',                 desc:'Converting a minimal SOP or POS directly into an all-NAND or all-NOR circuit.', time:'18 min', href:'nand-nor-implementation.html', status:'active' },
    ],
  };

export const GROUP_LABELS = {
  'tg-kmap': '🗺️ K-Map Minimization',
};
