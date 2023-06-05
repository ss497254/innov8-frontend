import { Button, NextPageWithLayout } from "common";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { PageTopBar } from "common/src/components";
import Link from "next/link";

const Interview: NextPageWithLayout = () => {
  return (
    <div className="max-w-7xl mx-auto min-h-full p-4 md:p-6">
      <PageTopBar
        heading="Interview"
        rightChildren={
          <Link href="/interview/new-interview">
            <Button btn="accent">New interview</Button>
          </Link>
        }
      />
      asdf
    </div>
  );
};

Interview.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Interview;
