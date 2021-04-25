import { INITIAL_STATE } from "../initialState";

type Card = {
  cardId: number,
}

export default function deleteCard(state = INITIAL_STATE, action: any) {
  if (action.type === 'DELETE_CARD') {
    return state.data.filter((card: Card) => card.cardId !== action.id)
  } else {
    return state
  }
}