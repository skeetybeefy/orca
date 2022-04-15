import { Box, Image, useColorModeValue } from "@chakra-ui/react"

export interface IUsefulMaterialProps {
  imageSrc: string,
  title: string,
  link: string
}

const UsefulMaterial: React.FC<IUsefulMaterialProps> = ({ imageSrc, title, link }) => {
  const linkColor = useColorModeValue("black", "gray.300")

  return (
    <a href={link}>
      <Box
        w={300}
        borderColor="gray.600"
        borderWidth="1px"
        _hover={{
          cursor: "pointer",
          borderColor: "gray.500",
          boxShadow: "xl"
        }}
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
          >
            {title}
          </Box>
          <Box
            color={linkColor}
            fontWeight={"light"}
            isTruncated
          >
            {link}
          </Box>
        </Box>
      </Box>
    </a>
  )
}

export default UsefulMaterial