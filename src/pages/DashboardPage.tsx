export function DashboardPage() {
  return (
    <div className="space-y-6">
      <p className="max-w-2xl text-slate-600">
        Overview of your interview prep: recent activity, streaks, and quick links to study areas.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-medium text-slate-500">Topics in progress</h2>
          <p className="mt-2 text-3xl font-semibold tabular-nums text-slate-900">—</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-medium text-slate-500">Quiz accuracy</h2>
          <p className="mt-2 text-3xl font-semibold tabular-nums text-slate-900">—</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-medium text-slate-500">Weak spots</h2>
          <p className="mt-2 text-3xl font-semibold tabular-nums text-slate-900">—</p>
        </article>
      </div>
    </div>
  )
}
