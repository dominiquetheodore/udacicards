import React from 'react'
import { AsyncStorage, Alert } from 'react-native'
import { Notifications, Permissions } from 'expo'

export const FLASHCARDS_STORAGE_KEY = 'FlashCards:decks'
const NOTIFICATION_KEY = 'UdaciCards:notifications'

export async function getDecks() {
  const decks = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
  return decks;
}

export function addCards(deckTitle, {question, answer}) {
  console.log('adding a card')
  console.log(deckTitle)
  getDecks().then(JSON.parse).then((decks) => {
    if (decks[deckTitle] && decks[deckTitle]['questions']) {
      decks[deckTitle]['questions'].push({question, answer})
    }
    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))
  })
}

export function createNotification() {
  return {
    title: 'Practice makes perfect!',
    body: "Don't forget to take a quiz today!"
  }
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(
      JSON.parse
    )
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate()+1)
              tomorrow.setHours(11)
              tomorrow.setMinutes(00)
              console.log(tomorrow.toLocaleString())
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
      else{
        AsyncStorage.getItem(NOTIFICATION_KEY).then(
            JSON.parse
        ).then((data)=>{
        })
      }
    })
}
