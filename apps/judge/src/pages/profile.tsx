import { NextPageWithLayout, PasswordEditSection, TabButtons } from "common";
import { PageTopBar, ProfileEditSection } from "common/src/components";
import { useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";

const tabs = ["General", "Security"] as const;

const Profile: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>(tabs[0]);
  return (
    <div className="max-w-7xl mx-auto min-h-full p-4 md:p-6 lg:p-8">
      <PageTopBar heading="Profile">
        <TabButtons
          tabs={tabs}
          activeTab={activeTab}
          //@ts-ignore
          setActiveTab={setActiveTab}
        />
      </PageTopBar>

      {activeTab === "General" ? (
        <ProfileEditSection />
      ) : (
        <PasswordEditSection />
      )}
    </div>
  );
};

Profile.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Profile;
