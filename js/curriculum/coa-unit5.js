// COA Unit 5 curriculum — Batch 1: 3 topics live (tg-io-organization)
// tg-memory-organization: pending Batches 2–3

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
    }
  ],
  'tg-memory-organization': []
};

export const GROUP_LABELS = {
  'tg-io-organization':    '🔌 I/O Organization',
  'tg-memory-organization': '💾 Memory Organization'
};
