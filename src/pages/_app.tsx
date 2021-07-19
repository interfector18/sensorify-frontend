import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";

import 'styles/globals.css'
import 'react-datepicker/dist/react-datepicker.css';
import 'styles/DatePicker.css';

import type { AppProps } from 'next/app'
import theme from 'styles/theme';

import Layout from 'components/layouts/Layout'

import store from 'store/store'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider options={{ ...theme.config }} />
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ChakraProvider>
  )
}
export default MyApp
