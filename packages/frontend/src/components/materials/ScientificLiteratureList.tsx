import { scientificLiterature } from 'constants/materials';

import { Flex } from '@chakra-ui/react';

import UsefulMaterial from './UsefulMaterial';

const ScientificLiteratureList = () => {
  return (
    <Flex w="full" justify="start" gap="4" wrap="wrap" alignItems={"stretch"}>
      {scientificLiterature.map(({ imageSrc, title, link }, idx) => {
        return <UsefulMaterial imageSrc={imageSrc} title={title} link={link} key={idx} />
      })}
    </Flex>
  )
}

export default ScientificLiteratureList