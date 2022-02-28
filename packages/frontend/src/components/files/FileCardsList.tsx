import { Flex } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React, { Dispatch, FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllFileCards } from "store/actions/filecards"
import { selectAllFileCards } from "store/selectors/filecards"
import Routes from "types/enums/Routes"
import FileCard from "./FileCard"
import FileCardAdd from "./FileCardAdd"

interface IFileCardsList {
    isSelecting: boolean;
    selectedCards: number[];
    setSelectedCards: Dispatch<React.SetStateAction<number[]>>
}

const FileCardsList: FC<IFileCardsList> = ({isSelecting, selectedCards, setSelectedCards} ) => {
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllFileCards())
    }, [dispatch, router])

    const fileCards = useSelector(selectAllFileCards)
    
    return (
        <Flex w="full" justify={"start"} gap={4} wrap={"wrap"}>
            <FileCardAdd isSelecting={isSelecting} />
            {fileCards.map((fileCard) => {
              return <FileCard 
              key={fileCard.id} 
              name={fileCard.name}
              description={fileCard.description} 
              onClick={() => {
                    if (isSelecting) {
                        if (!selectedCards.includes(fileCard.id)) {
                            setSelectedCards([...selectedCards, fileCard.id])
                        } else {
                            setSelectedCards(selectedCards.filter(cardId => fileCard.id !== cardId))
                        }
                    } else {
                        router.push(`${Routes.FileCards}/view?id=${fileCard.id}`)
                    }
              }}
              isSelecting={isSelecting}
              selected={selectedCards.includes(fileCard.id)}/>
          })}
        </Flex>
    )
}

export default FileCardsList