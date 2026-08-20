import React from "react";

interface CodeSandboxViewProps {
  code: string;
}

export function CodeSandboxView({ code }: CodeSandboxViewProps) {
  return (
    <div className="w-full rounded-lg overflow-hidden border border-blue-900 bg-slate-950 font-mono text-sm shadow-xl inset-shadow-blue-950/20">
      {/* Barra superior simulando a janela do VS Code */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-blue-900/60 select-none">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>

        <span className="text-xs text-blue-300/80 font-medium font-sans">
          live-coding-bug.tsx
        </span>
        <div className="w-12" />
      </div>
      <div className="p-3 sm:p-4 overflow-x-auto text-xs sm:text-sm text-blue-100 leading-relaxed whitespace-pre bg-slate-950">
        <code>{code}</code>
      </div>
    </div>
  );
}
