// COA Unit 5 curriculum — Batch 2: 6 live topics
// Batch 3 pending (5.7–5.9, tg-memory-organization)

export const GROUPS = {
  'tg-io-organization': [
    {
      id: 'input-output-interface',
      title: 'Input-Output Interface',
      desc: 'I/O bus structure (Fig 11-1), interface registers (Fig 11-2), four I/O command types, and isolated vs memory-mapped addressing in §11-2.',
      href: 'input-output-interface.html',
      time: '15 min',
      status: 'active'
    },
    {
      id: 'modes-of-transfer',
      title: 'Modes of Transfer',
      desc: 'Programmed I/O polling (Fig 11-11), interrupt-driven I/O with vectored interrupts, and Direct Memory Access — comparisons and examples from §11-4.',
      href: 'modes-of-transfer.html',
      time: '15 min',
      status: 'active'
    },
    {
      id: 'priority-interrupt',
      title: 'Priority Interrupt',
      desc: 'Software polling, daisy-chain hardware priority (Fig 11-12, 11-13), and parallel priority interrupt hardware with interrupt register, mask register, and priority encoder (Fig 11-14) from §11-5.',
      href: 'priority-interrupt.html',
      time: '18 min',
      status: 'active'
    },
    {
      id: 'direct-memory-access',
      title: 'Direct Memory Access',
      desc: 'DMA controller registers AR and WC (Fig 11-16), bus-request/grant cycle, cycle-stealing method, and DMA transfer sequence from §11-6.',
      href: 'direct-memory-access.html',
      time: '15 min',
      status: 'active'
    }
  ],
  'tg-memory-organization': [
    {
      id: 'memory-hierarchy',
      title: 'Memory Hierarchy',
      desc: 'Memory hierarchy levels from CPU registers to auxiliary storage (Fig 12-1), cost-speed-capacity trade-offs, access time ratios, cache role, and multiprogramming from §12-1.',
      href: 'memory-hierarchy.html',
      time: '15 min',
      status: 'active'
    },
    {
      id: 'main-memory',
      title: 'Main Memory',
      desc: 'Static and dynamic RAM, ROM chips (Fig 12-2, 12-3), memory address map (Table 12-1), and connecting RAM/ROM chips to the CPU (Fig 12-4) from §12-2.',
      href: 'main-memory.html',
      time: '15 min',
      status: 'active'
    }
  ]
};

export const GROUP_LABELS = {
  'tg-io-organization':    '🔌 I/O Organization',
  'tg-memory-organization': '💾 Memory Organization'
};
