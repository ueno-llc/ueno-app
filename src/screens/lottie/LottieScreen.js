import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Animated, TouchableOpacity, Dimensions } from 'react-native';
import Animation from 'lottie-react-native';
import { PRIMARY_COLOR } from 'theme';

const { width, height } = Dimensions.get('window');

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

  replay2 = () => {
    this.animation2.reset();
    this.animation2.play();
  }

  render() {
    const { progress } = this.state;

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>LOTTIE_SCREEN</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.replay}
          style={styles.button}
        >
          <Text style={styles.text}>Restart animation 1</Text>
        </TouchableOpacity>

        <View style={styles.animation}>
          <Animation
            ref={c => (this.animation = c)}
            style={styles.animation}
            source={require('./animation.json')}
            progress={progress}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.replay2}
          style={styles.button}
        >
          <Text style={styles.text}>Restart animation 2</Text>
        </TouchableOpacity>

        <View style={styles.animation2}>
          <Animation
            ref={c => (this.animation2 = c)}
            style={styles.animation2}
            source={require('./animation2.json')}
            progress={progress}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    alignItems: 'center',
  },

  title: {
    marginTop: 80,
  },

  button: {
    zIndex: 100,

    marginVertical: 20,
  },

  text: {
    color: PRIMARY_COLOR,

    backgroundColor: 'transparent',
  },

  animation: {
    width,
    height: width,
  },

  animation2: {
    width,
    height,
  },
});
