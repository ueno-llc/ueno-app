import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity, Dimensions } from 'react-native';
import Animation from 'lottie-react-native';
import { PRIMARY_COLOR } from 'theme';

const { width } = Dimensions.get('window');

export default class LottieScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
    }).start();
  }

  replay = () => {
    this.animation.reset();
    this.animation.play();
  }

  render() {
    const { progress } = this.state;

    return (
      <View style={styles.container}>
        <Text>LOTTIE_SCREEN</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.replay}
          style={styles.button}
        >
          <Text style={styles.text}>Restart</Text>
        </TouchableOpacity>

        <Animation
          ref={c => (this.animation = c)}
          style={styles.animation}
          source={require('./animation.json')}
          progress={progress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    zIndex: 100,

    marginTop: 20,
  },

  text: {
    color: PRIMARY_COLOR,
  },

  animation: {
    marginTop: -80,

    width,
    height: width,
  },
});
