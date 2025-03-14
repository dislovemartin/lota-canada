"use client";

import { Button } from "@/components/ui/button";
import { Suspense } from "react";

export default function MinimalPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MinimalContent />
    </Suspense>
  );
}

function MinimalContent() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold">LOTA Canada</h1>
        <div className="text-sm">
          Leaders of Tomorrow Association -{" "}
          <code className="rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]">
            Fostering Tomorrow's Leaders
          </code>
        </div>
        <Button size="sm" className="mt-4">
          Explore
        </Button>
      </div>
    </div>
  )
}

