import React from 'react';
import {
  Dimensions,
  Keyboard,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

const { width } = Dimensions.get('window')

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ListNote: [],
      NoteText: '',
    }
  }

  UNSAFE_componentWillMount(){
    AsyncStorage.getItem('noteArray', (e, res) =>{
      this.setState({ ListNote: JSON.parse(res) })
    })
  }

  add(){
    var d = new Date()
    if(this.state.NoteText){
      this.state.ListNote.push({
        date : d.getFullYear() +
        "-" + (d.getMonth() + 1) +
        "-" + d.getDate(),
        note : this.state.NoteText
      })
      this.setState({ ListNote:this.state.ListNote, NoteText: '' })
      Keyboard.dismiss()
      AsyncStorage.setItem('noteArray', JSON.stringify(this.state.ListNote))
    }
  }

  delete(key){
    AsyncStorage.removeItem('noteArray')
    this.state.ListNote.splice(key, 1)
    this.setState({ ListNote: this.state.ListNote })
    AsyncStorage.setItem('noteArray', JSON.stringify(this.state.ListNote))
  }

  render() {
    var notes = this.state.ListNote.map(( val , key)=> {
      return <Note key={key} valuable={key} value={val} deleteKah={() => this.delete(key)} />;
    })

    return (
      <View style={styles.container}>
        <View style={styles.H}>
          <Text style={styles.textH}> Note : 4mirfor3v3r :v </Text>
        </View>

        <ScrollView style={styles.S}>
          {notes}
        </ScrollView>

        <View style={styles.textIBG}>
          <TextInput
            onChangeText={value => this.setState({NoteText: value})}
            value={this.state.NoteText}
            style={styles.textI}
            placeholder="Write Text Here"
            placeholderTextColor="#fff" />

          <TouchableOpacity style={styles.btnT} onPress={this.add.bind(this)}>
            <Text style={styles.textT}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
}

// CLASS UNTUK RENDERING ITEM

class Note extends React.Component {
  render() {
    return (
      <View key={this.props.valuable} style={styles.noteC}>
        <Text style={styles.noteT}>{this.props.value.date}</Text>
        <Text style={styles.noteT}>{this.props.value.note}</Text>
        <TouchableOpacity onPress={this.props.deleteKah} style={styles.noteD}>
          <Text style={styles.noteDT}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  H: {
    width: width,
    backgroundColor: '#e91e63',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  textH: {
    color: 'white',
    fontSize: 16,
    paddingTop: 12,
    paddingBottom: 10,
  },
  S: {
    flex: 1,
    marginBottom: 100,
  },
  textIBG: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  textI: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 20,
    backgroundColor: '#252525',
    borderTopWidth: 2,
    borderTopColor: '#ededed',
  },
  btnT: {
    position: 'absolute',
    right: 10,
    bottom: 90,
    backgroundColor: '#e91e63',
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textT: {
    color: 'white',
    fontSize: 24,
  },
  noteC: {
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#ededed',
  },
  noteT: {
    paddingLeft: 20,
    borderLeftWidth: 10,
    borderLeftColor: '#e91e63',
  },
  noteD: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2980b9',
    borderRadius: 30,
    padding: 10,
    height: 64,
    width: 64,
    right: 10,
  },
  noteDT: {
    color: 'white',
  },
});
