import { videos } from 'constants/materials';

import { Flex } from '@chakra-ui/react';

import UsefulMaterial from './UsefulMaterial';

const VideoMaterials = () => {
  return (
    <Flex w="full" justify="start" gap="4" wrap="wrap" alignItems={"stretch"}>
      {videos.map(({ imageSrc, title, link }, idx) => {
        return <UsefulMaterial imageSrc={imageSrc} title={title} link={link} key={idx} />
      })}
    </Flex>
  )
}

export default VideoMaterials