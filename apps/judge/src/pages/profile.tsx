import { NextPageWithLayout } from "common";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";
import { PageTopBar } from "common/src/components";

const Profile: NextPageWithLayout = () => {
  return (
    <div className="max-w-7xl mx-auto min-h-full p-4 md:p-6 lg:p-8">
      <PageTopBar heading="Profile" />
    </div>
  );
};

Profile.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Profile;
