'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function ModalPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (typeof window === 'undefined' || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999]">{children}</div>,
    document.body
  );
}
