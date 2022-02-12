import LoginButton from 'components/auth/login/LoginButton';
import RegisterButton from 'components/auth/register/RegisterButton';
import Logo from 'components/common/Logo';
import MobileMenu from 'components/common/MobileMenu';
import ProfileMenu from 'components/common/ProfileMenu';
import ThemeSwitcher from 'components/common/ThemeSwitcher';
import menuRoutes from 'constants/menuRoutes';
import { map } from 'lodash';
import NextLink from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { userIsAuthorizedSelector } from 'store/selectors/auth';

import {
    Box, ButtonGroup, Divider, Flex, Grid, Heading, HStack, Link, useBreakpointValue
} from '@chakra-ui/react';

const Header = () => {
  const isAuthorized = useSelector(userIsAuthorizedSelector);

  const bp = useBreakpointValue({
    base: true,
    md: false,
  });

  return (
    <Box as="header">
      <Grid templateColumns={["50px 1fr 50px", null, "auto 1fr"]} py={2} px={4}>
        {bp && <MobileMenu />}

        <Flex justifyContent="center">
          <Logo />
        </Flex>

        {!bp && (
          <HStack justifySelf="flex-end" gap={1}>
            {map(menuRoutes, ({ title, href }) => {
              return (
                <NextLink key={title} href={href} passHref>
                  <Link>{title}</Link>
                </NextLink>
              );
            })}
            <ThemeSwitcher />
            {isAuthorized ? (
              <ProfileMenu />
            ) : (
              <ButtonGroup>
                <LoginButton />
                <RegisterButton />
              </ButtonGroup>
            )}
          </HStack>
        )}

        {bp && <ThemeSwitcher />}
      </Grid>
      <Divider orientation="horizontal" />
    </Box>
  );
};

export default Header;
