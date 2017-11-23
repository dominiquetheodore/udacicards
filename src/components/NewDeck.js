import React, {Component} from 'react';
import { AsyncStorage, StyleSheet, Text, View, StatusBar, TextInput, Button, Alert, TouchableOpacity, ToastAndroid } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { connect } from 'react-redux'
import { FLASHCARDS_STORAGE_KEY } from '../../App'
import { receiveDecks, addDeck } from '../actions'
import { orange, white, black, purple } from '../../utils/colors'

class NewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Deck title', decks:[] };
    this._addDeck = this._addDeck.bind(this);
  }

  async componentDidMount() {
    let response = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    let decks = (await JSON.parse(response))||{}

    this.setState({
      decks: decks
    })
    this.props.receiveDecks(decks)

  }

  async _addDeck() {
    const deckTitle = this.state.text
    const { navigate } = this.props.navigation;

    let newDeck = {}

    newDeck[deckTitle] = {
      title: deckTitle,
      questions: []
    }

    AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(newDeck), ()=>
      {
          AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then((value) => {
          this.setState({"decks": value});
        }).done();
      }
    )

    this.setState({
      text: ''
    })

    this.props.addDeck({
      [deckTitle]: {
        title: deckTitle,
        questions: []
    }})

    ToastAndroid.show('New deck added', ToastAndroid.SHORT);
    navigate('Decks')
  }

  render() {
    const { decks } = this.state
    return (
      <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        margin: 20,
        marginTop: 50,
      }}>
        <Text style={{fontSize: 40, textAlign: 'center', fontWeight: 'bold'}}>What is the title of your new deck?</Text>
        <TextInput underlineColorAndroid='transparent' placeholderTextColor='pink'
          style={{ textAlign: 'center', fontSize: 25, padding: 10, height: 60, borderRadius: 10, borderColor: 'gray', borderWidth: 1, marginTop: 20, marginBottom: 20 }}
          onChangeText={(text) => this.setState({text})}
          placeholder={this.state.text}
        />
        <TouchableOpacity style={styles.AndroidSubmitBtn} onPress={this._addDeck} >
            <Text style={styles.submitBtnText}>ADD CARD</Text>
        </TouchableOpacity>

        <View>
        </View>
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
    addDeck: (deck) => dispatch(addDeck(deck))
  }
}

export default connect(false, mapDispatchToProps)(NewDeck)
