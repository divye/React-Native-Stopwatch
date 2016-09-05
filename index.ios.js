/**
 * Stopwatch App Powered by ReactNative
 * Author: Divye Gupta
 * Date: 28th August 2016
 */

import React, { Component } from 'react';
var formatTime = require('minutes-seconds-milliseconds')
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeElapsed: null,
      isRunning: false,
      startTime: null,
      laps: []
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <View style = {styles.timerWrapper}>
                <Text style = {styles.timer}>
                    {formatTime(this.state.timeElapsed)}
                </Text>
            </View>
            <View style = {styles.buttonWrapper}>
                {this.startStopButton()}
                {this.lapButton()}
            </View>
        </View>
        <View style={styles.footer}>
            {this.laps()}
        </View>
      </View>
    );
  }
  startStopButton() {
      return <TouchableHighlight onPress={ () => this.handleStartPress() } underlayColor="gray" style={styles.button}>
          <Text>
          {this.state.isRunning ? 'Stop' : 'Start'}
          </Text>
          </TouchableHighlight>
  }
  lapButton() {
      return <TouchableHighlight onPress={ () => this.handleLapPress() } underlayColor="gray" style={styles.button}>
          <Text>
          Lap
          </Text>
          </TouchableHighlight>
  }
  handleStartPress() {
      if(this.state.isRunning){
          clearInterval(this.interval);
          this.setState({
              isRunning: false
          })
          return
      }
      this.setState({startTime: new Date()})
      this.interval = setInterval(() => {
          this.setState ({
          timeElapsed: new Date() - this.state.startTime,
          isRunning: true
      })
  }, 30)
  }
  handleLapPress(){
      var lap = this.state.timeElapsed
      this.setState({
          startTime: new Date(),
          laps: this.state.laps.concat([lap])
      })
  }
  laps(){
      return this.state.laps.map(function(time, index){
          return <View style={styles.lap}>
              <Text style={styles.lapText}>
              Lap# {index + 1}
              </Text>
              <Text style={styles.lapText}>
              {formatTime(time)}
              </Text>
              </View>
      })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  timerWrapper: {
      flex: 5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'lightgreen',
  },
  buttonWrapper: {
      flex: 3,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#ff7f7f',

  },
  timer: {
    fontSize: 60
},
  button: {
    borderWidth: 2,
    borderRadius: 40,
    height: 80,
    width: 80,
    backgroundColor: '#E0FFFF',
    justifyContent: 'center',
    alignItems: 'center',
},
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 1,
    borderColor: 'green'
  },
  lapText: {
      fontSize: 25,
      color: '#ff7f7f',
                                
  },
});

AppRegistry.registerComponent('Stopwatch', () => Stopwatch);
