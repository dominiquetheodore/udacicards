import React, {Component} from 'react';
import { TouchableOpacity, ScrollView, AsyncStorage, StyleSheet, Text, View, StatusBar, TextInput, Button, Alert } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { connect } from 'react-redux'
import Deck from './Deck'
import { FLASHCARDS_STORAGE_KEY } from '../../App'
import { receiveDecks, addDeck } from '../actions'
import { AppLoading } from 'expo';

class Decks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks:[],
      isLoading: true
    };
  }

  async componentDidMount() {
    AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then((value)=>
      {
        this.props.receiveDecks(JSON.parse(value))
      }).then(()=>{
        this.setState({
          isLoading: false
        })
      })
  }

  render() {
    const { decks } = this.props
    console.log(this.props.navigation)
    if (this.state.isLoading){
      return (
        <View>
          <Text>App is loading...</Text>
        </View>
      )
    }

    return (
        <View style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
        }}>
        <View><Text>UdaciCards</Text></View>
        <ScrollView>
        <View>
        {Object.keys(decks).map((deck)=>
          <TouchableOpacity key={decks[deck].title} onPress={() => this.props.navigation.navigate('DeckDetail', { deckTitle: decks[deck].title })}>
            <Deck title={decks[deck].title} questions={decks[deck].questions} />
          </TouchableOpacity>
          )}
        </View>
        </ScrollView>
        </View>
      );
  }
}

function mapStateToProps(state, ownProps){
  return {
    decks: state
  }
}

function mapDispatchToProps(dispatch){
  return {
    receiveDecks: (decks) => dispatch(receiveDecks(decks)),
    addDeck: (deck) => dispatch(addDeck(deck))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks)
