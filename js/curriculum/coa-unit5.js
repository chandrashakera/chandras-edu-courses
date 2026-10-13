// COA Unit 5 curriculum — Batch 3: 9 live topics; all Unit 5 topics live
// All topic groups complete.

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
    },
    {
      id: 'auxiliary-memory',
      title: 'Auxiliary Memory',
      desc: 'Magnetic disk tracks and sectors (Fig 12-5), seek and transfer time, hard vs floppy disk, magnetic tape records and inter-record gaps from §12-3.',
      href: 'auxiliary-memory.html',
      time: '15 min',
      status: 'active'
    },
    {
      id: 'associative-memory',
      title: 'Associative Memory',
      desc: 'Content-addressable memory block diagram (Fig 12-6), key register mask, match register M, cell array (Fig 12-7), match logic M_i = ∏(x_j + K_j\') from §12-4.',
      href: 'associative-memory.html',
      time: '18 min',
      status: 'active'
    },
    {
      id: 'cache-memory',
      title: 'Cache Memory',
      desc: 'Locality of reference, hit ratio, average access time, associative/direct/set-associative mapping (Fig 12-11 to 12-15), LRU/FIFO replacement, write-through vs write-back from §12-5.',
      href: 'cache-memory.html',
      time: '22 min',
      status: 'active'
    }
  ]
};

export const GROUP_LABELS = {
  'tg-io-organization':    '🔌 I/O Organization',
  'tg-memory-organization': '💾 Memory Organization'
};
