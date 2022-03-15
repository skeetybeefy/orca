import theme from "configs/theme/theme";
import { NextPage } from "next";
import { FC, ReactElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { ChakraProvider } from "@chakra-ui/react";

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

import type { AppProps } from "next/app";
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const App: FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const MyApp = ({ Component, pageProps }: Props) => {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  return (
    <ChakraProvider theme={theme}>
      <App>{getLayout(<Component {...pageProps} />)}</App>
    </ChakraProvider>
  );
};

export default MyApp;
