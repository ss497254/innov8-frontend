import React from "react";
import "src/styles/globals.css";
import "common/src/styles/globals.css";
import "common/src/styles/fonts.css";

import { AppPropsWithLayout } from "common";

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return <>{getLayout(<Component {...pageProps} />)}</>;
}

export default App;
