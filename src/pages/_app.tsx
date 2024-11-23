import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = (page: React.ReactElement) => (
    <ChakraProvider value={defaultSystem}>{page}</ChakraProvider>
  );

  return getLayout(<Component {...pageProps} />);
}
