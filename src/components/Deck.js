import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Deck extends React.Component {
  render() {
    return (
      <View style={{ borderRadius: 10, height: 150, margin: 20, marginBottom: 2, backgroundColor: '#F3E5F5', justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 35, fontWeight: 'bold'}}>{this.props.title}</Text>
      <Text style={{fontSize: 20, color: 'lightslategrey'}}>{ this.props.questions ? this.props.questions.length + " cards": "No cards yet"}</Text>
      </View>
    );
  }
}
