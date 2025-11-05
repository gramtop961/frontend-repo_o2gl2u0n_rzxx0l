import React from 'react';

export default function PreviewFrame({ previewUrl, checking }) {
  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-zinc-950/60 p-3 shadow-xl shadow-black/40">
      <div className="mb-3 flex items-center justify-between px-2">
        <div className="text-sm font-medium text-zinc-300">Live Preview</div>
        {previewUrl && (
          <a
            href={previewUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-violet-300 hover:text-violet-200"
          >
            Open in new tab
          </a>
        )}
      </div>

      <div className="relative h-[70vh] w-full overflow-hidden rounded-xl bg-black">
        {checking ? (
          <div className="absolute inset-0 grid place-items-center text-zinc-300">
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-violet-400" />
              <span className="text-xs text-zinc-400">Building preview…</span>
            </div>
          </div>
        ) : previewUrl ? (
          <iframe
            title="Live Preview"
            src={previewUrl}
            className="h-full w-full rounded-lg border-0"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <div className="max-w-md rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 text-center">
              <div className="mb-2 text-lg font-semibold text-amber-300">⚠️ No web preview available.</div>
              <p className="text-sm text-amber-200/80">Try another repo with an index.html at the root or in docs, public, build, or dist.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
