import { NextPageWithLayout } from "common";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";

const JudgeReview: NextPageWithLayout = () => {
  return <div className="max-w-7xl mx-auto min-h-full p-4 md:p-6"></div>;
};

JudgeReview.getLayout = (page) => (
  <AuthenticatedRoute>{page}</AuthenticatedRoute>
);

export default JudgeReview;
