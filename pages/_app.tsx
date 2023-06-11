import "src/styles/globals.scss";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Layout } from "@/components";
import { __DEV__ } from "@jtmdias/js-utilities";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        {__DEV__ && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </SessionProvider>
  );
}
