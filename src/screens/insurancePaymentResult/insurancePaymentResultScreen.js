import React from 'react';
import { Text, View, TouchableHighlight, Image, ImageBackground } from 'react-native';

import styles from './styles';

export default class insurancePaymentResultScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTransparent: 'true',
    headerStyle: {
      height: 60
    },
    headerLeft: <View />
  });

  constructor(props) {
    super(props);
  }

  onPressArrow = () => {
    this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <ImageBackground
        source={require('../../../assets/images/logBackground.png')}
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../../../assets/icons/logo.png')} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.mainTxt}>¡Finalizaste tu compra!</Text>
          <Text style={styles.secTxt}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </View>        
      </ImageBackground>
    );
  }
}
