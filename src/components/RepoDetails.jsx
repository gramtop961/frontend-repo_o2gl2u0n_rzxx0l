import React from 'react';
import { Star, ExternalLink, Download, Copy } from 'lucide-react';

export default function RepoDetails({ repo, onCopyClone }) {
  if (!repo) return null;

  const zipUrl = `https://codeload.github.com/${repo.owner.login}/${repo.name}/zip/refs/heads/${repo.default_branch}`;

  return (
    <div className="mt-10 rounded-2xl border border-white/10 bg-zinc-900/60 p-6 shadow-xl shadow-black/40">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">{repo.full_name}</h2>
          <p className="mt-1 max-w-2xl text-sm text-zinc-400">{repo.description || 'No description provided.'}</p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
            <Star className="h-4 w-4 text-yellow-400" />
            <span>{repo.stargazers_count.toLocaleString()} stars</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200 transition hover:border-violet-400/40 hover:bg-violet-500/10"
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink className="h-4 w-4 text-violet-300" /> View Code
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200 transition hover:border-violet-400/40 hover:bg-violet-500/10"
            href={zipUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Download className="h-4 w-4 text-violet-300" /> Download ZIP
          </a>
          <button
            onClick={() => onCopyClone(repo.clone_url)}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200 transition hover:border-violet-400/40 hover:bg-violet-500/10"
          >
            <Copy className="h-4 w-4 text-violet-300" /> Copy clone URL
          </button>
        </div>
      </div>
    </div>
  );
}
