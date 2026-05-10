import { Link } from "react-router-dom";
import { PATHS } from "@/routes/paths";

export const QuizStartPanel = () => {
  return (
    <section className="space-y-4">
      <p className="text-sm text-slate-600">
        Choose a topic or start a quick practice session.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Link
          to={PATHS.quizSession}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
        >
          Start quiz →
        </Link>
        <Link
          to={PATHS.topics}
          className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-slate-600 ring-1 ring-slate-200 transition-colors hover:bg-slate-50 hover:ring-slate-300"
        >
          Browse topics
        </Link>
        <Link
          to={PATHS.weakSpots}
          className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-slate-600 ring-1 ring-slate-200 transition-colors hover:bg-slate-50 hover:ring-slate-300"
        >
          Practice weak spots
        </Link>
      </div>
    </section>
  );
};
