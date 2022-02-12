import { map } from 'lodash';
import NextLink from 'next/link';
import React from 'react';
import menuRoutes from 'constants/doctorRoutes';

import { HamburgerIcon } from '@chakra-ui/icons';
import {
    Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Link,
    useDisclosure, VStack
} from '@chakra-ui/react';

const MobileMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Moses</DrawerHeader>

          <DrawerBody onClick={onClose}>
            <VStack gap={2}>
              {map(menuRoutes, ({ title, href }) => {
                return (
                  <NextLink key={title} href={href} passHref>
                    <Link w="full" textAlign="start">
                      {title}
                    </Link>
                  </NextLink>
                );
              })}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileMenu;
