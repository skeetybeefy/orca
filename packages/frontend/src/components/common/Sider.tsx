import { map } from 'lodash';
import NextLink from 'next/link';
import React from 'react';
import doctorRoutes from 'constants/doctorRoutes';

import { Link, VStack } from '@chakra-ui/react';

const Sider = () => {
  return (
    <VStack w="full" gap={2}>
      {map(doctorRoutes, ({ title, href }) => {
        return (
          <NextLink key={title} href={href}>
            <Link w="full" variant="ghost">
              {title}
            </Link>
          </NextLink>
        );
      })}
    </VStack>
  );
};

export default Sider;
