import { NextPageWithLayout, TabButtons } from "common";
import { PageTopBar, ProfileEditSection } from "common/src/components";
import { useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";

const tabs = ["General", "Security"];

const Profile: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <div className="max-w-7xl mx-auto min-h-full p-4 md:p-6 lg:p-8">
      <PageTopBar heading="Profile">
        <TabButtons
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </PageTopBar>
      <ProfileEditSection />
    </div>
  );
};

Profile.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Profile;
