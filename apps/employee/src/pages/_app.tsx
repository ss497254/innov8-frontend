import "src/styles/globals.css";

import "common/src/lib/init";
import "common/src/styles";

import { Cfetch } from "common";
import { AppPropsWithLayout } from "common/src/types";
import { ToastContainer } from "common/src/ui";
import { SWRConfig } from "swr";
import { showToast } from "common/src/lib/showToast";

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SWRConfig
      value={{
        fetcher: Cfetch,
        onError: (err, key) => {
          showToast("error", err.message, key);
        },
      }}
    >
      <ToastContainer />
      {getLayout(<Component {...pageProps} />)}
    </SWRConfig>
  );
}

export default App;
