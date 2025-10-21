"use client";
import { useEffect, useRef } from "react";

type Props = { slot?: string; style?: React.CSSProperties; className?: string; height?: number };

export default function AdSlot({ slot = "1234567890", style, className, height }: Props) {
  const ref = useRef<any>(null);

  useEffect(() => {
    try {
      // @ts-ignore
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      // @ts-ignore
      (window as any).adsbygoogle.push({});
    } catch {}
  }, []);

  // Allow overriding the ad client via NEXT_PUBLIC_ADSENSE_CLIENT for flexibility in environments
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-1190913191003622';

  return (
    <ins
      ref={ref}
      className={`adsbygoogle ${className ?? ""}`}
      style={style ?? { display: "block", minHeight: height ?? 250 }}
      data-ad-client={adClient}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
