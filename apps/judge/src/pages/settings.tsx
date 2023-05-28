import { NextPageWithLayout } from "common";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { SettingsTopBar } from "common/src/components/Pages";

const Settings: NextPageWithLayout = () => {
  return (
    <div className="max-w-7xl mx-auto min-h-full p-4 md:p-6 lg:p-8">
      <SettingsTopBar />
    </div>
  );
};

Settings.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Settings;
