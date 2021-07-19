
import { Box, Container } from "@chakra-ui/react";
import { ReactNode } from "react";
import Head  from "next/head";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" maxWidth={1024} transition="0.5s ease-out">
      <Head>
        <title>Sensorfiy</title>
      </Head>
      <Box margin="8">
        <Header />
        <Box as="main" marginY={22}>
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;