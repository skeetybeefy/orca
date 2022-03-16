import useFileCardsQuery from "hooks/queries/fileCards/useFileCardsQuery";
import useProfileQuery from "hooks/queries/useProfileQuery";
import { useRouter } from "next/router";
import React, { Dispatch, FC, useCallback } from "react";
import Routes from "types/enums/Routes";

import { Flex } from "@chakra-ui/react";

import FileCard from "./FileCard";
import FileCardAdd from "./FileCardAdd";

interface IFileCardsList {
  isSelecting: boolean;
  selectedCards: number[];
  setSelectedCards: Dispatch<React.SetStateAction<number[]>>;
}

const FileCardsList: FC<IFileCardsList> = ({
  isSelecting,
  selectedCards,
  setSelectedCards,
}) => {
  const router = useRouter();

  const { data: fileCards } = useFileCardsQuery();
  const { data: user } = useProfileQuery();

  const memoizedOnClick = useCallback(
    (fileCard) => {
      if (isSelecting) {
        if (fileCard.ownerId === user?.id) {
          if (!selectedCards.includes(fileCard.id)) {
            setSelectedCards([...selectedCards, fileCard.id]);
          } else {
            setSelectedCards(
              selectedCards.filter((cardId) => fileCard.id !== cardId)
            );
          }
        }
      } else {
        router.push(`${Routes.FileCards}/view?id=${fileCard.id}`);
      }
    },
    [isSelecting, router, selectedCards, setSelectedCards, user]
  );

  return (
    <Flex w="full" justify={"start"} gap={4} wrap={"wrap"} alignItems="stretch">
      <FileCardAdd isSelecting={isSelecting} />
      {fileCards?.map((fileCard) => {
        return (
          <FileCard
            key={fileCard.id}
            name={fileCard.name}
            description={fileCard.description}
            onClick={() => memoizedOnClick(fileCard)}
            isSelecting={isSelecting}
            selected={selectedCards.includes(fileCard.id)}
            selectable={fileCard?.ownerId === user?.id}
          />
        );
      })}
    </Flex>
  );
};

export default FileCardsList;
