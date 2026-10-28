// COA Unit 5 curriculum — Batch 3: 9 live topics; all Unit 5 topics live
// All topic groups complete.

export const GROUPS = {
  'tg-io-organization': [
    {
      id: 'input-output-interface',
      title: 'Input-Output Interface',
      desc: 'How the CPU talks to devices: I/O bus, interface registers and I/O commands.',
      href: 'input-output-interface.html',
      time: '15 min',
      status: 'active'
    },
    {
      id: 'modes-of-transfer',
      title: 'Modes of Transfer',
      desc: 'Programmed I/O, interrupt-initiated I/O and direct memory access compared.',
      href: 'modes-of-transfer.html',
      time: '18 min',
      status: 'active'
    },
    {
      id: 'priority-interrupt',
      title: 'Priority Interrupt',
      desc: 'Deciding which device is served first: polling, daisy chain and parallel priority.',
      href: 'priority-interrupt.html',
      time: '18 min',
      status: 'active'
    },
    {
      id: 'direct-memory-access',
      title: 'Direct Memory Access',
      desc: 'How a DMA controller moves data blocks while the CPU waits for the bus.',
      href: 'direct-memory-access.html',
      time: '18 min',
      status: 'active'
    }
  ],
  'tg-memory-organization': [
    {
      id: 'memory-hierarchy',
      title: 'Memory Hierarchy',
      desc: 'Why computers combine fast small memories with slow large ones.',
      href: 'memory-hierarchy.html',
      time: '15 min',
      status: 'active'
    },
    {
      id: 'main-memory',
      title: 'Main Memory',
      desc: 'RAM and ROM chips and how they are mapped into the address space.',
      href: 'main-memory.html',
      time: '18 min',
      status: 'active'
    },
    {
      id: 'auxiliary-memory',
      title: 'Auxiliary Memory',
      desc: 'Magnetic disks and tapes as slow, large, permanent storage.',
      href: 'auxiliary-memory.html',
      time: '15 min',
      status: 'active'
    },
    {
      id: 'associative-memory',
      title: 'Associative Memory',
      desc: 'Memory searched by content instead of by address.',
      href: 'associative-memory.html',
      time: '18 min',
      status: 'active'
    },
    {
      id: 'cache-memory',
      title: 'Cache Memory',
      desc: 'Hit ratio, the three mapping methods with worked address splits, and FIFO, LRU and optimal replacement with solved problems.',
      href: 'cache-memory.html',
      time: '22 min',
      status: 'active'
    }
  ],
  // Supplementary topics: extra pages beyond the syllabus (no quiz, not required for the certificate) — see js/curriculum/supplementary.js
  'tg-supplementary': [
    {
      id: 'virtual-memory',
      title: 'Virtual Memory',
      desc: 'Paging, page tables, address translation, the TLB, page faults and page replacement — with worked examples.',
      href: 'virtual-memory.html',
      time: '22 min',
      status: 'active',
      supplementary: true,
      related: 'memory-hierarchy'
    }
  ]
};

export const GROUP_LABELS = {
  'tg-io-organization':    '🔌 I/O Organization',
  'tg-memory-organization': '💾 Memory Organization',
  'tg-supplementary':       'Supplementary Topics — Beyond the Syllabus'
};
