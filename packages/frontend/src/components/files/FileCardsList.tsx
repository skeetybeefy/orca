import { useRouter } from 'next/router';
import React, { Dispatch, FC, useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { getAllFileCards } from 'store/actions/filecards';
import { selectAllFileCards } from 'store/selectors/filecards';
import { profileSelector } from 'store/selectors/profile';
import Routes from 'types/enums/Routes';

import { Flex } from '@chakra-ui/react';

import FileCard from './FileCard';
import FileCardAdd from './FileCardAdd';

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

    const user = useSelector((state: RootState) => profileSelector(state))

    const memoizedOnClick = useCallback((fileCard) => {
        if (isSelecting) {
            if (fileCard.ownerId === user?.id) {
                if (!selectedCards.includes(fileCard.id)) {
                    setSelectedCards([...selectedCards, fileCard.id])
                } else {
                    setSelectedCards(selectedCards.filter(cardId => fileCard.id !== cardId))
                }
            }
        } else {
            router.push(`${Routes.FileCards}/view?id=${fileCard.id}`)
        }
  }, [isSelecting])
    
    return (
        <Flex w="full" justify={"start"} gap={4} wrap={"wrap"} alignItems="stretch">
            <FileCardAdd isSelecting={isSelecting}/>
            {fileCards.map((fileCard) => {
              return <FileCard 
              key={fileCard.id} 
              name={fileCard.name}
              description={fileCard.description}
              onClick={() => memoizedOnClick(fileCard)}
              isSelecting={isSelecting}
              selected={selectedCards.includes(fileCard.id)}
              selectable={fileCard?.ownerId === user?.id}/>
          })}
        </Flex>
    )
}

export default FileCardsList