import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, ThemeConfig, extendTheme } from "@chakra-ui/react";

import { client } from "./utils/client";
import { MainPage } from "./components/MainPage";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <MainPage />
      </ChakraProvider>
    </ApolloProvider>
  );
};
