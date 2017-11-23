import React, {Component} from 'react';
import { TouchableOpacity, AsyncStorage, Alert, StyleSheet, Text, View, StatusBar, TextInput, Button, ToastAndroid } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { red, green, pink, purple, white } from '../../utils/colors'
import { addCards } from '../../utils/helpers'
import { receiveDecks, addDeck, addCard } from '../actions'
import { connect } from 'react-redux'
import { FLASHCARDS_STORAGE_KEY } from '../../App'

class AddCard extends Component {
  constructor(props) {
    super(props);
    this._addCard = this._addCard.bind(this);
    this.state = {
      question: 'What is your question?',
      answer: 'The answer.',
      decks: []
    };
  }

  componentDidMount() {
        AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then((value) => {
            this.props.receiveDecks(JSON.parse(value))
        }).done();
  }

  _addCard() {
    const question = this.state.question
    const answer = this.state.answer
    const { navigate } = this.props.navigation;

    let newCard = {
        question: question,
        answer: answer
    }
    const deckTitle = this.props.navigation.state.params.deckTitle

    addCards(deckTitle, { question, answer })

    this.props.addCard(
      deckTitle, {
        question: question,
        answer: answer
    })

    this.setState({
      question:'',
      answer: ''
    })

    ToastAndroid.show('New card added', ToastAndroid.SHORT);
    navigate('DeckDetail', { deckTitle: deckTitle })
  }

  render() {
    const { decks } = this.state
    return (
      <View style={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        margin: 20,
        marginTop: 50,
      }}>
        <Text style={{fontSize: 40, textAlign: 'center', fontWeight: 'bold'}}>Add a Card</Text>
        <TextInput
        underlineColorAndroid='transparent' placeholderTextColor='pink'
          style={{ textAlign: 'center', fontSize: 20, padding: 10, height: 60, borderRadius: 10, borderColor: 'gray', borderWidth: 1, marginTop: 20, marginBottom: 20 }}
          onChangeText={(question) => this.setState({question})}
          placeholder={this.state.question}
        />
        <TextInput
          underlineColorAndroid='transparent' placeholderTextColor='pink'
          style={{ textAlign: 'center', fontSize: 20, padding: 10, height: 60, borderRadius: 10, borderColor: 'gray', borderWidth: 1, marginTop: 20, marginBottom: 20 }}
          onChangeText={(answer) => this.setState({answer})}
          placeholder={this.state.answer}
        />
        <TouchableOpacity style={styles.AndroidSubmitBtn} onPress={this._addCard} >
            <Text style={styles.submitBtnText}>ADD CARD</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  }
})

function mapStateToProps(state, ownProps){
  return {
    decks: state
  }
}

function mapDispatchToProps(dispatch){
  return {
    receiveDecks: (decks) => dispatch(receiveDecks(decks)),
    addDeck: (deck) => dispatch(addDeck(deck)),
    addCard: (title, newCard) => dispatch(addCard(title, newCard)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
