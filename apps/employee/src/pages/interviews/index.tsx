import { Button, NextPageWithLayout, TabButtons } from "common";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { PageTopBar, InterviewsTable } from "common/src/components";
import Link from "next/link";
import { useState } from "react";

const tabs = ["Overview", "New", "Past"];

const Interview: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="max-w-7xl mx-auto min-h-full p-4 md:p-6">
      <PageTopBar
        heading="Interviews"
        rightChildren={
          <Link href="/interviews/new-interview">
            <Button btn="accent">New interview</Button>
          </Link>
        }
      >
        <TabButtons
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </PageTopBar>
      <InterviewsTable name="Interviews" url="/employee/interviews" />
    </div>
  );
};

Interview.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Interview;
