import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { DashboardPage } from './pages/DashboardPage/DashboardPage'
import { QuizPage } from './pages/QuizPage'
import { TopicDetailPage } from './pages/TopicDetailPage'
import { TopicsPage } from './pages/TopicsPage'
import { WeakSpotsPage } from './pages/WeakSpotsPage'

export default function App() {
  return (
    <BrowserRouter basename="/interview-prep-hub">
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} handle={{ title: 'Dashboard' }} />
          <Route path="topics" element={<TopicsPage />} handle={{ title: 'Topics' }} />
          <Route
            path="topics/:topicId"
            element={<TopicDetailPage />}
            handle={{ title: 'Topic details' }}
          />
          <Route path="quiz" element={<QuizPage />} handle={{ title: 'Quiz' }} />
          <Route path="weak-spots" element={<WeakSpotsPage />} handle={{ title: 'Weak Spots' }} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
