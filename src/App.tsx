import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout/AppLayout';
import { DashboardPage } from './pages/DashboardPage/DashboardPage';
import { QuizGeneralPage } from './pages/QuizGeneralPage/QuizGeneralPage';
import { QuizPage } from './pages/QuizPage/QuizPage';
import { TopicDetailPage } from './pages/TopicDetailPage/TopicDetailPage';
import { TopicsPage } from './pages/TopicsPage/TopicsPage';
import { WeakSpotsPage } from './pages/WeakSpotsPage/WeakSpotsPage';

const App = () => {
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
          <Route path="quiz" element={<QuizGeneralPage />} handle={{ title: 'Quiz' }} />
          <Route path="quiz/session" element={<QuizPage />} handle={{ title: 'Quiz session' }} />
          <Route path="weak-spots" element={<WeakSpotsPage />} handle={{ title: 'Weak Spots' }} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
