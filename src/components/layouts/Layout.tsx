
import { Flex, Box, Container } from "@chakra-ui/react";
import { ReactNode } from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" maxWidth={1024} transition="0.5s ease-out" style={{ height: '100vh' }}>
      <Head>
        <title>Sensorfiy</title>
      </Head>
      <Flex p="8" pb="2" direction="column" h="full" justify="space-between">
        <Header />
        <Box as="main" marginY={22} h="full">
          {children}
        </Box>
        <Footer />
      </Flex>
    </Box>
  );
};

export default Layout;