import Page from 'components/common/Page';
import ScientificLiteratureList from 'components/materials/ScientificLiteratureList';
import VideoMaterialsList from 'components/materials/VideoMaterialsList';
import HomeLayout from 'layouts/HomeLayout';

import { Container, Heading, VStack } from '@chakra-ui/react';

const UsefulMaterials = () => {
  return (
    <Page title="Useful Materials">
      <Container maxWidth={"1920"}>
        <VStack gap={4}>
          <Heading size="lg" w="full" textAlign="start">
            Полезные материалы
          </Heading>
          <Heading size="md" w="full" textAlign="start">
            Ресурсы научной литературы
          </Heading>
          <ScientificLiteratureList />
          <Heading size="md" w="full" textAlign="start">
            Видеоресурсы
          </Heading>
          <VideoMaterialsList />
        </VStack>
      </Container>
    </Page>
  )
}

UsefulMaterials.getLayout = HomeLayout

export default UsefulMaterials