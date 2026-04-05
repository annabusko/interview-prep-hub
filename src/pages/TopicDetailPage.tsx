import { Link, useParams } from 'react-router-dom'
import { PATHS } from '../routes/paths'

export function TopicDetailPage() {
  const { topicId } = useParams<{ topicId: string }>()

  if (!topicId) {
    return (
      <p className="text-slate-600">
        Missing topic. <Link className="text-indigo-600 underline" to={PATHS.topics}>Back to topics</Link>
      </p>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-500">Topic ID</p>
        <p className="font-mono text-sm text-slate-800">{topicId}</p>
      </div>
      <p className="max-w-2xl text-slate-600">
        Add notes, flashcards, and links here. This page is driven by the dynamic segment{' '}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">:topicId</code>.
      </p>
      <Link
        to={PATHS.topics}
        className="inline-flex text-sm font-medium text-indigo-600 hover:text-indigo-800"
      >
        ← All topics
      </Link>
    </div>
  )
}
