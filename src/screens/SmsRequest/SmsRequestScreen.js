import React, {useState} from 'react';
import { Text, View, TextInput, TouchableWithoutFeedback, Keyboard, SafeAreaView, Image, Animated  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import LogoHeader from '../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import styles from './styles';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import otpStyles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from './otpStyles';

const {Value, Text: AnimatedText} = Animated;
const CELL_COUNT = 4;

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({hasValue, index, isFocused}) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? hasValue : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const SmsRequestScreen = (ownProps) => {
  const [code, setCode] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const ref = useBlurOnFulfill({code, cellCount: CELL_COUNT});
  const [ props, getCellOnLayoutHandler ] = useClearByFocusCell({
    code,
    setCode,
  });

  const renderCell = ({index, symbol, isFocused}) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({hasValue, index, isFocused});
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[otpStyles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };
  
  const onPressButton = () => {
    if(!code) {
      setErrorMessage("El código enviado al SMS es necesario para continuar!");
    } else {
      ownProps.navigation.navigate('EmailRequest');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>       
      <ScrollView style={styles.container}>
        <View style={styles.spinnerContainer}>
          <Spinner
            visible={showSpinner}
            textContent={''}
            textStyle={styles.spinnerTextStyle}
          />
        </View>
        <LogoHeader
          onPress={() => {
            this.props.navigation.goBack();
          }}
        />        
        <Text style={styles.title}>Te enviamos un código de verificación</Text>
        <SafeAreaView style={otpStyles.root}>          
          <CodeField
              ref={ref}
              {...props}
              value={code}
              onChangeText={setCode}
              cellCount={CELL_COUNT}
              keyboardType="number-pad"
              rootStyle={otpStyles.codeFiledRoot}            
              renderCell={renderCell}
            />
        </SafeAreaView>
        <Text style={styles.description}>¿ No lo has recibido ? <Text style={styles.blue}>Reenviar en 00:05</Text></Text>
        {
          errorMessage &&
          <Text style={styles.error}>{errorMessage}</Text>
        }
        <ContinueButton onPress={() => onPressButton()} text="Continuar"/>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addUserPlate: vehicleInfo => dispatch({ type: 'ADD_USERPLATE', vehicleInfo })
  };
}

export default connect(
  null,
  mapDispatchToProps
)(SmsRequestScreen);
