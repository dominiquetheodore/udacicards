import React from 'react';
import { Alert, AsyncStorage, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { red, green, pink, white, purple } from '../../utils/colors'
import { FLASHCARDS_STORAGE_KEY } from '../../utils/helpers'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { Ionicons } from '@expo/vector-icons'
import { clearLocalNotification } from '../../utils/helpers'

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: [],
      questions: [],
      questionNumber: 0,
      isLoading: true,
      showAnswer: false,
      score: 0
    };
    this._restart = this._restart.bind(this);
    this._correct = this._correct.bind(this);
    this._incorrect = this._incorrect.bind(this);
    this._nextQuestion = this._nextQuestion.bind(this);
    this._showAnswer = this._showAnswer.bind(this);
    this._showQuestion = this._showQuestion.bind(this);
  }

  _nextQuestion() {
    let currentQuestion = this.state.questionNumber
    this.setState({
      questionNumber: this.state.questionNumber + 1,
      showAnswer: false
    })
  }

  _restart() {
    clearLocalNotification()
    this.setState({
      questionNumber: 0,
      showAnswer: false,
      score: 0
    })
  }

  _correct() {
    let currentQuestion = this.state.questionNumber
    this.setState({
      questionNumber: this.state.questionNumber + 1,
      showAnswer: false,
      score: this.state.score + 1
    })
  }

  _incorrect() {
    let currentQuestion = this.state.questionNumber
    this.setState({
      questionNumber: this.state.questionNumber + 1,
      showAnswer: false,
    })
  }


  _showAnswer() {
    this.setState({
      showAnswer : true
    })
  }

  _showQuestion() {
    this.setState({
      showAnswer : false
    })
  }

  _back() {
    clearLocalNotification()
    this.props.navigation.navigate('DeckDetail', { deckTitle: this.props.navigation.state.params.deckTitle })
  }

  componentWillMount() {
    AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then((value) => {
        this.setState({ questions: JSON.parse(value)[this.props.navigation.state.params.deckTitle].questions });
        this.setState({ isLoading: false });
    }).done();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View><Text>Loading...</Text></View>
      )
    }
    else {
      const { questions, questionNumber, showAnswer, score } = this.state
      return (
        <View style={{
          padding: 20
        }}>
          <View>
            {questionNumber  < questions.length ?
              <View>
                <Text></Text>
                <View style={styles.AnswerBtn} >
                    <Text style={styles.answerBtnText}>{ questions.length - questionNumber } questions remaining</Text>
                </View>
                <View style={{ height: 200, margin: 0, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                  { showAnswer ? <Text style={{fontSize: 40, textAlign: 'center'}}>{questions[questionNumber].answer}</Text>:
                    <Text style={{fontSize: 40, textAlign: 'center'}}>{questions[questionNumber].question}</Text> }
                </View>
                <View>

                { !showAnswer ?
                  <TouchableOpacity style={styles.AnswerBtn} onPress={this._showAnswer} >
                      <Ionicons name={'md-repeat'} size={20} />
                      <Text style={styles.AnswerBtnText}>Show Answer</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={styles.AnswerBtn} onPress={this._showQuestion} >
                      <Ionicons name={'md-repeat'} size={20} />
                      <Text style={styles.AnswerBtnText}>Show Question</Text>
                  </TouchableOpacity>
                }
                </View>
                <View>
                { showAnswer?
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{width: '50%' }} >
                    <TouchableOpacity style={styles.IncorrectBtn} onPress={this._incorrect} >
                        <Text style={styles.submitBtnText}>INCORRECT</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: '50%' }} >
                    <TouchableOpacity style={styles.CorrectBtn} onPress={this._correct} >
                        <Text style={styles.submitBtnText}>CORRECT</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                :<Text></Text>}
                </View>
              </View>
              :
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 30 }}>Your Score</Text>
                <Text style={{ fontSize: 120, fontWeight: 'bold' }}>{score}</Text>
                <TouchableOpacity style={styles.RestartBtn} onPress={this._restart} >
                    <Text style={styles.submitBtnText}>RESTART QUIZ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.DeckBtn} onPress={this._back} >
                    <Text style={styles.submitBtnText}>BACK TO DECK</Text>
                </TouchableOpacity>

              </View>
            }

          </View>

        </View>
      );
    }

  }
}

const styles = StyleSheet.create({
    AnswerBtn: {
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
    CorrectBtn: {
    backgroundColor: green,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  IncorrectBtn: {
    backgroundColor: red,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  RestartBtn: {
    backgroundColor: red,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 15,
    height: 45,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  DeckBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 15,
    textAlign: 'center',
  },
  answerBtnText: {
    color: white,
    fontSize: 17,
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
  }
}

export default connect()(Quiz)
