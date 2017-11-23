import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Alert, AsyncStorage, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { orange, white, black, purple, green } from '../../utils/colors'
import Deck from './Deck'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { FLASHCARDS_STORAGE_KEY } from '../../App'

const styles = StyleSheet.create({
    startBtn: {
      backgroundColor: 'green',
      padding: 10,
      marginTop: 10,
      marginBottom: 10,
      paddingLeft: 30,
      paddingRight: 30,
      height: 45,
      borderRadius: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addBtn: {
      backgroundColor: purple,
      padding: 10,
      marginTop: 10,
      marginBottom: 10,
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

class DeckDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decks:[],
      questions: 0,
      isLoading: true
    };
  }

  componentDidMount(){
    AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then((value)=>
      {
        this.props.receiveDecks(JSON.parse(value))
      }).then(()=>{
        const deckTitle = this.props.navigation.state.params.deckTitle
        const questions = this.props.decks[deckTitle].questions

        this.setState({
          isLoading: false,
          questions: questions
        })
      })

  }

  render() {
    const Home = ()=> (
      <View style={{
        padding: 20
      }}>
        <Deck title={this.props.navigation.state.params.deckTitle} questions={this.state.questions} />
        <View style={{ marginBottom: 10 }}>
        <TouchableOpacity style={styles.startBtn}
          onPress={()=>this.props.navigation.navigate('Quiz', { deckTitle: this.props.navigation.state.params.deckTitle })} >
            <Text style={styles.submitBtnText}>START QUIZ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addBtn} onPress={()=>this.props.navigation.navigate('AddCard', {deckTitle: this.props.navigation.state.params.deckTitle })}
          >
            <Text style={styles.submitBtnText}>ADD CARD</Text>
        </TouchableOpacity>

        </View>
      </View>
    );

    return (
      <Home />
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail)
