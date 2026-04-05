import { Link } from 'react-router-dom'
import { PATHS } from '../routes/paths'

/** Placeholder catalog — replace with API or CMS later */
const SAMPLE_TOPICS: { id: string; title: string; summary: string }[] = [
  { id: 'react-fundamentals', title: 'React fundamentals', summary: 'Components, state, effects.' },
  { id: 'typescript', title: 'TypeScript', summary: 'Types, generics, narrowing.' },
  { id: 'system-design', title: 'System design', summary: 'Trade-offs, scaling, APIs.' },
]

export function TopicsPage() {
  return (
    <div className="space-y-6">
      <p className="max-w-2xl text-slate-600">
        Browse interview topics. Open a topic to see notes, resources, and related quizzes.
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {SAMPLE_TOPICS.map((topic) => (
          <li key={topic.id}>
            <Link
              to={PATHS.topicDetail(topic.id)}
              className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:border-indigo-200 hover:shadow-md"
            >
              <span className="font-medium text-slate-900">{topic.title}</span>
              <p className="mt-1 text-sm text-slate-600">{topic.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
