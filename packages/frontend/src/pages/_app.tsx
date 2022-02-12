import theme from 'configs/theme/theme';
import useMountingApp from 'hooks/useMountingApp';
import { NextPage } from 'next';
import { FC, ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from 'store';

import { ChakraProvider } from '@chakra-ui/react';

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

import type { AppProps } from "next/app";

const App: FC = ({ children }) => {
  useMountingApp();

  return <>{children}</>;
};

const MyApp = ({ Component, pageProps }: Props) => {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App>{getLayout(<Component {...pageProps} />)}</App>
      </ChakraProvider>
    </Provider>
  );
};

export default MyApp;
