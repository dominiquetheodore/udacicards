import React from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Platform, StatusBar } from 'react-native';
import { purple, white, pink } from './utils/colors'
import { Constants } from 'expo'
import { Provider } from 'react-redux'

import reducer from './src/reducers'
import configureStore from './store'
import CustomStatusBar from './src/components/CustomStatusBar'
import NewDeck from './src/components/NewDeck'
import Decks from './src/components/Decks'
import DeckDetail from './src/components/DeckDetail';
import AddCard from './src/components/AddCard';
import Quiz from './src/components/Quiz';
import { setLocalNotification } from './utils/helpers';

export const FLASHCARDS_STORAGE_KEY = 'FlashCards:decks'

const store = configureStore()

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'DECKS'
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK'
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? pink : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : pink,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});

const MainNav = StackNavigator({
      'HOME': {
        screen: Tabs,
        navigationOptions: {
          header : null
        }
      },
      'DeckDetail': {
        screen: DeckDetail,
        path: 'deck/:deckTitle',
        navigationOptions: {
          headerTintColor: white,
          headerStyle: {
            backgroundColor: pink
          }
        }
      },
      'AddCard': {
        screen: AddCard,
        path: 'deck/addcard/:deckTitle',
        navigationOptions: {
          headerTintColor: white,
          headerStyle: {
            backgroundColor: pink
          }
        }
      },
      'Quiz': {
        screen: Quiz,
        path: 'quiz/:deckTitle',
        navigationOptions: {
          headerTintColor: white,
          headerStyle: {
            backgroundColor: pink
          }
        }
      }
    }, {headerMode: 'screen'
  })

export default class App extends React.Component {
      componentDidMount() {
        setLocalNotification()

        const initialDeck = {
          React: {
            title: 'React',
            questions: [
              {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
              },
              {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
              }
            ]
          },
          JavaScript: {
            title: 'JavaScript',
            questions: [
              {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
              }
            ]
          }
        }

        AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(initialDeck), ()=>{
          console.log('initialised store')
        })
    }

    render() {
      return (
        <Provider store={store}>
          <View style={{flex: 1}}>
            <CustomStatusBar backgroundColor={purple} barStyle="light-content" />
            <MainNav />
          </View>
        </Provider>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
