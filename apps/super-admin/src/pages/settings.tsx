import { NextPageWithLayout } from "common";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { PageTopBar } from "common/src/components";

const Settings: NextPageWithLayout = () => {
  return (
    <div className="max-w-7xl mx-auto min-h-full p-4 md:p-6">
      <PageTopBar heading="Settings" />
    </div>
  );
};

Settings.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Settings;
