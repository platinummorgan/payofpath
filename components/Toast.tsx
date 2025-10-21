import { useEffect, useState } from 'react';

export function useToast() {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(null), 5000);
    return () => clearTimeout(t);
  }, [msg]);
  return { msg, show: (m: string) => setMsg(m) } as const;
}

export default function Toast({ msg }: { msg?: string | null }) {
  if (!msg) return null;
  return (
    <div className="fixed right-4 bottom-4 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded">{msg}</div>
  );
}
