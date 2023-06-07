import { NextPageWithLayout, TabButtons } from "common";
import { InterviewsTable, PageTopBar } from "common/src/components";
import { useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";

const tabs = ["Overview", "New", "Past"];

const Interviews: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="max-w-7xl mx-auto min-h-full p-4 md:p-6">
      <PageTopBar heading="Interviews">
        <TabButtons
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </PageTopBar>
      <InterviewsTable
        name="New"
        url="/coach/interviews"
        filter={(x) => !x.completed}
      />
      <InterviewsTable
        name="Completed"
        url="/coach/interviews"
        filter={(x) => x.completed}
      />
    </div>
  );
};

Interviews.getLayout = (page) => (
  <AuthenticatedRoute>{page}</AuthenticatedRoute>
);

export default Interviews;
