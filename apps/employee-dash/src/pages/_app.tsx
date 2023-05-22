import React from "react";
import "src/styles/globals.css";
import "common/src/styles/globals.css";
import "common/src/styles/fonts.css";
import "common/src/styles/toast.css";
import "common/src/styles/nprogress.css";

import "common/src/lib/init";
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
