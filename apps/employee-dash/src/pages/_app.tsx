import "common/src/lib/init";
import "common/src/styles";
import "src/styles/globals.css";

import { AppPropsWithLayout } from "common/src/types";
import { ToastContainer } from "common/src/ui";

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <ToastContainer />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

export default App;
