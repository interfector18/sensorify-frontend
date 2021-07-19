import { Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex as="footer" width="full" align="center" justify="center">
      <Text>
        {new Date().getFullYear()} -{" "}
        <Link href="https://sensorify.tk" isExternal>
          Sensorify ©
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;