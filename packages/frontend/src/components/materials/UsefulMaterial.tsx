import { Box, Image, useColorModeValue } from "@chakra-ui/react"

export interface IUsefulMaterialProps {
  imageSrc: string,
  title: string,
  link: string
}

const UsefulMaterial: React.FC<IUsefulMaterialProps> = ({ imageSrc, title, link }) => {
  const linkColor = useColorModeValue("black","gray.300")
  
  return (
    <Box
      w={300}
      borderColor="gray.600"
      borderWidth="1px"
    >
      <Box>
        <Image
          w={300}
          h={200}
          src={imageSrc}
          objectFit="contain"
        ></Image>
      </Box>
      <Box paddingX={"4"} paddingBottom={"2"}>
        <Box
          fontWeight={"semibold"}
          fontSize="larger"
        >{title}</Box>
        <Box
          color={linkColor}
          fontWeight={"light"}
          isTruncated
          _hover={{
            textDecoration: "underline"
          }}
        >
          <a href={link}>{link}</a>
        </Box>
      </Box>
    </Box>
  )
}

export default UsefulMaterial