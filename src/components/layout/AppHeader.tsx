import { useMatches } from 'react-router-dom'

const FALLBACK_TITLE = 'Interview Prep Hub'

export function AppHeader() {
  const matches = useMatches()
  const last = matches.at(-1)
  const title = (last?.handle as { title?: string } | undefined)?.title ?? FALLBACK_TITLE

  return (
    <header className="border-b border-slate-200 bg-white px-6 py-4 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h1>
        <p className="hidden text-sm text-slate-500 sm:block">Stay consistent — small sessions daily.</p>
      </div>
    </header>
  )
}
