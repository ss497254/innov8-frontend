import { NextPageWithLayout } from "common";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";

const Home: NextPageWithLayout = () => {
  return <div className="bg-gray-100 h-full"></div>;
};

Home.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Home;
