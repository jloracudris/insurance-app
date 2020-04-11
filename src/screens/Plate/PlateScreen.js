import React, {useState} from 'react';
import { Text, View, TextInput, TouchableWithoutFeedback, Keyboard, SafeAreaView, Image, Animated  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import LogoHeader from '../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import styles from './styles';
import { getPlateInfo } from '../../data/endpoints';
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
const CELL_COUNT = 6;

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

const PlateScreen = (ownProps) => {
  const [plate, setPlate] = useState('');
  const [vehicleInfo, setVehicleInfo] = useState({});
  const [showSpinner, setShowSpinner] = useState(false);

  const ref = useBlurOnFulfill({plate, cellCount: CELL_COUNT});
  const [ props, getCellOnLayoutHandler ] = useClearByFocusCell({
    plate,
    setPlate,
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
    setShowSpinner(true);
    getPlateInfo(plate).
      then(res => {
        const optionsImg = {
            method: 'POST',
            body: JSON.stringify({ "placa": plate }),
            headers:{
                'Content-Type': 'application/json',
                'referer': 'https://eva.segurosbeta.com/pay'
            }
        }
        fetch("https://eva.segurosbeta.com/placa", optionsImg)
        .then(imgRes => { return imgRes.json() })
        .then(imgResponse => {
          let vehicleInfo = {
            ...res,
            ...imgResponse
          };
          
          setVehicleInfo(vehicleInfo)
          ownProps.addUserPlate(vehicleInfo);
          setShowSpinner(false);
          ownProps.navigation.navigate('PlateFound');
        })
      })
    
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
        <Text style={styles.title}>Iniciemos con tu número de placa</Text>
        <SafeAreaView style={otpStyles.root}>          
          <CodeField
              ref={ref}
              {...props}
              value={plate}
              onChangeText={setPlate}
              cellCount={CELL_COUNT}
              rootStyle={otpStyles.codeFiledRoot}            
              renderCell={renderCell}
            />
        </SafeAreaView>
        <ContinueButton onPress={() => onPressButton()} text="Cotizar"/>
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
)(PlateScreen);
