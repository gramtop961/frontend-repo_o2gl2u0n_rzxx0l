import React, { useCallback, useMemo, useState } from 'react';
import Hero3D from './components/Hero3D';
import RepoSearch from './components/RepoSearch';
import RepoDetails from './components/RepoDetails';
import PreviewFrame from './components/PreviewFrame';

function parseRepoInput(input) {
  try {
    if (input.includes('github.com')) {
      const url = new URL(input);
      const parts = url.pathname.split('/').filter(Boolean);
      if (parts.length >= 2) return { owner: parts[0], repo: parts[1] };
    }
  } catch (e) {
    // fall through
  }
  const plain = input.trim().replace(/^\s+|\s+$/g, '').replace(/^\/*|\/*$/g, '');
  const parts = plain.split('/');
  if (parts.length >= 2) return { owner: parts[0], repo: parts[1] };
  return null;
}

async function hasIndexHtml(owner, repo, branch, path = '') {
  const base = `https://api.github.com/repos/${owner}/${repo}/contents`;
  const url = path ? `${base}/${encodeURIComponent(path)}?ref=${branch}` : `${base}?ref=${branch}`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
  });
  if (!res.ok) return false;
  const data = await res.json();
  if (!Array.isArray(data)) return false;
  return data.some((item) => item.name?.toLowerCase() === 'index.html');
}

function buildPreviewUrl(owner, repo, branch, path = '') {
  const prefix = path ? `${path.replace(/^\/*|\/*$/g, '')}/` : '';
  return `https://cdn.jsdelivr.net/gh/${owner}/${repo}@${branch}/${prefix}index.html`;
}

export default function App() {
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [repo, setRepo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [message, setMessage] = useState('');

  const candidatePaths = useMemo(
    () => ['', 'public', 'docs', 'dist', 'build', 'website', 'site'],
    []
  );

  const handleCopyClone = useCallback(async (cloneUrl) => {
    try {
      await navigator.clipboard.writeText(`git clone ${cloneUrl}`);
      setMessage('Clone command copied to clipboard');
      setTimeout(() => setMessage(''), 2000);
    } catch (e) {
      setMessage('Unable to copy.');
      setTimeout(() => setMessage(''), 2000);
    }
  }, []);

  const handleSearch = useCallback(async (input) => {
    const parsed = parseRepoInput(input);
    setPreviewUrl('');
    setRepo(null);
    setMessage('');

    if (!parsed) {
      setMessage('Please provide "owner/repo" or a valid GitHub URL.');
      return;
    }

    const { owner, repo } = parsed;
    setLoading(true);
    try {
      const infoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: { Accept: 'application/vnd.github+json' },
      });
      if (!infoRes.ok) {
        throw new Error('Repo not found or rate limited.');
      }
      const info = await infoRes.json();
      setRepo(info);

      setChecking(true);
      let found = '';
      for (const p of candidatePaths) {
        // eslint-disable-next-line no-await-in-loop
        const ok = await hasIndexHtml(owner, repo, info.default_branch, p);
        if (ok) {
          found = p;
          break;
        }
      }
      if (found !== '') {
        setPreviewUrl(buildPreviewUrl(owner, repo, info.default_branch, found));
      } else {
        // try root as empty path (already done), if still none, show no preview
        if (await hasIndexHtml(owner, repo, info.default_branch, '')) {
          setPreviewUrl(buildPreviewUrl(owner, repo, info.default_branch, ''));
        } else {
          setPreviewUrl('');
        }
      }
    } catch (e) {
      setMessage(e.message || 'Something went wrong fetching the repo.');
    } finally {
      setLoading(false);
      setChecking(false);
    }
  }, [candidatePaths]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Hero3D />
        <RepoSearch onSearch={handleSearch} loading={loading} />

        {message && (
          <div className="mx-auto mt-6 max-w-3xl rounded-lg border border-white/10 bg-white/5 p-3 text-center text-sm text-zinc-300">
            {message}
          </div>
        )}

        <RepoDetails repo={repo} onCopyClone={handleCopyClone} />
        <PreviewFrame previewUrl={previewUrl} checking={checking} />

        <footer className="mx-auto mt-12 max-w-3xl text-center text-xs text-zinc-500">
          Built with a dark violet aesthetic and glassy cards. Public repos only; previews use a CDN mirror for safety.
        </footer>
      </div>
    </div>
  );
}
