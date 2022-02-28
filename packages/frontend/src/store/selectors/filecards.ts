import { RootState } from "store";
import { fileCardsAdapter } from "store/slices/filecards";

const fileCards = fileCardsAdapter.getSelectors((state: RootState) => state.filecards.fileCards)

export const selectAllFileCards = fileCards.selectAll

export const selectFileCardById = fileCards.selectById