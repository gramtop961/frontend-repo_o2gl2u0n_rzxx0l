import React, { useState } from 'react';
import { Rocket } from 'lucide-react';

export default function RepoSearch({ onSearch, loading }) {
  const [input, setInput] = useState('vercel/next.js');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSearch(input.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto -mt-10 w-full max-w-3xl">
      <div className="group flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/70 p-2 shadow-xl shadow-violet-900/10 backdrop-blur transition-colors focus-within:border-violet-400/40">
        <div className="flex items-center rounded-lg bg-zinc-800/60 px-3 py-2 text-zinc-300">
          <Rocket className="h-5 w-5 text-violet-400" />
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter repo (owner/repo or GitHub URL)"
          className="flex-1 bg-transparent p-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none"
          aria-label="GitHub repository"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Loading…' : 'Preview'}
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-zinc-400">
        Tip: Try public repos with an index.html at root, docs, public, dist, or build.
      </p>
    </form>
  );
}
