import { Button, NextPageWithLayout, TabButtons, useUserStore } from "common";
import { InterviewsTable, PageTopBar } from "common/src/components";
import Link from "next/link";
import { useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";

const tabs = ["Overview", "New", "Past"];

const Interview: NextPageWithLayout = () => {
  const { user } = useUserStore();
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
      <InterviewsTable
        name="New"
        url="/employee/interviews"
        filter={(x) => {
          if (typeof x.isCompleted !== "undefined") return !x.isCompleted;
          return !(x.isCompleted = x.completed?.includes(user?.id || ""));
        }}
      />
      <InterviewsTable
        name="Completed"
        url="/employee/interviews"
        filter={(x) => {
          if (typeof x.isCompleted !== "undefined") return x.isCompleted;
          return (x.isCompleted = x.completed?.includes(user?.id || ""));
        }}
      />
    </div>
  );
};

Interview.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Interview;
