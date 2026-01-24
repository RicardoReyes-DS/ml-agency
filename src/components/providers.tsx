"use client";

import { ReactNode } from "react";
import { ScrollProvider } from "@/contexts/scroll-context";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <ScrollProvider>{children}</ScrollProvider>;
}
