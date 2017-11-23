import { getDecks } from '../../utils/helpers'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'

export function receiveDecks(decks){
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function addDeck(deck){
  return {
    type: ADD_DECK,
    deck
  }
}

export function addCard(title, newCard){
  console.log(newCard)
  return {
    type: ADD_CARD,
    title,
    newCard
  }
}
