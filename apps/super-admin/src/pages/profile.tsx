import { NextPageWithLayout, PasswordEditSection, TabButtons } from "common";
import {
  PageTopBar,
  ProfileEditSection,
  ProfilePicUpload,
  DeleteAccountSection,
} from "common/src/components";
import { useState } from "react";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";

const tabs = ["General", "Security"] as const;

const Profile: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>(tabs[0]);
  return (
    <div className="max-w-7xl mx-auto min-h-full p-4 md:p-6">
      <PageTopBar heading="Profile">
        <TabButtons
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab as any}
        />
      </PageTopBar>

      {activeTab === "General" ? (
        <>
          <ProfilePicUpload />
          <ProfileEditSection />
        </>
      ) : (
        <>
          <PasswordEditSection />
          <DeleteAccountSection />
        </>
      )}
    </div>
  );
};

Profile.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Profile;
