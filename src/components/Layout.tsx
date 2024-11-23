import { VStack } from "@chakra-ui/react";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <VStack w={"100%"} h={"100%"}>
      {children}
    </VStack>
  );
};

export default Layout;
