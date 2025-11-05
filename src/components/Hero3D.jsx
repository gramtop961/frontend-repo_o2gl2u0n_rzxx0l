import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero3D() {
  return (
    <section className="relative min-h-[60vh] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900 via-zinc-900 to-black">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft vignette / gradient accents on top of Spline (non-blocking) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.25),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(124,58,237,0.15),transparent_50%)]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 px-6 py-16 text-center text-zinc-100">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300 shadow-sm backdrop-blur">
          <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
          Live GitHub Web Previewer
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Preview any repo in seconds
        </h1>
        <p className="max-w-2xl text-base text-zinc-300 sm:text-lg">
          Fetch a GitHub repository, auto-detect web entries, and render a live site preview — all inside a sleek dark UI with a violet glow.
        </p>
      </div>
    </section>
  );
}
