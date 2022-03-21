import doctorRoutes from "constants/doctorRoutes";
import { map } from "lodash";
import NextLink from "next/link";
import React from "react";

import { Link, VStack } from "@chakra-ui/react";

const Sider = () => {
  return (
    <VStack alignItems={"start"} w="full" gap={2}>
      {map(doctorRoutes, ({ title, href }) => {
        return (
          <NextLink key={title} href={href} passHref>
            <Link textAlign="start" variant="ghost">
              {title}
            </Link>
          </NextLink>
        );
      })}
    </VStack>
  );
};

export default Sider;
