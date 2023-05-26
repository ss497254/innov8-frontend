import { NextPageWithLayout } from "common";
import { StarRating } from "common/src/ui";
import { useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";

const ReviewProject: NextPageWithLayout = () => {
  const [value, setValue] = useState(0);
  return (
    <div className="max-w-7xl mx-auto min-h-full p-4 md:p-6 lg:p-8">
      <StarRating value={value} setValue={setValue} />
    </div>
  );
};

ReviewProject.getLayout = (page) => (
  <AuthenticatedRoute>{page}</AuthenticatedRoute>
);

export default ReviewProject;
