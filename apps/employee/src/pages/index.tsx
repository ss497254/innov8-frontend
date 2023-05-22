import { Button, NextPageWithLayout } from "common";
import { useToastStore } from "common/src/stores/useToastStore";
import { AuthenticatedRoute } from "src/components/AuthenticatedRoute";

const Home: NextPageWithLayout = () => {
  const { add } = useToastStore();
  return (
    <div className="bg-gray-100 h-full">
      <Button
        size="sm"
        btn="danger"
        onClick={() => {
          add({
            message:
              "this is a long message to text overflow, okay to how much do it not for this next page with layout button react success home add use toast store",
            desc: "some random text to see how far it goes, nothing much to write just garbage, i need more text to see overflow",
            type: "error",
          });
        }}
      >
        error
      </Button>
      <Button
        size="sm"
        btn="success"
        onClick={() => {
          add({
            message: "asdfasdf",
            desc: "this is a toast",
            type: "success",
          });
        }}
      >
        success
      </Button>
      <Button
        size="sm"
        btn="danger"
        onClick={() => {
          add({
            message: "asdfasdf",
            desc: "this is a toast",
            type: "warning",
          });
        }}
      >
        warning
      </Button>
      <Button
        size="sm"
        onClick={() => {
          add({
            message: "asdfasdf",
            desc: "this is a toast",
            type: "info",
          });
        }}
      >
        info
      </Button>
    </div>
  );
};

Home.getLayout = (page) => <AuthenticatedRoute>{page}</AuthenticatedRoute>;

export default Home;
