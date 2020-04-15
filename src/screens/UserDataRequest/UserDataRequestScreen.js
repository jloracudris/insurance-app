import React, {useState} from 'react';
import { Text, View, TouchableWithoutFeedback, Keyboard, Picker, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import LogoHeader from '../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import styles from './styles';
import Spinner from 'react-native-loading-spinner-overlay';


const UserDataRequestScreen = (props) => {
  const [idType, setIdType] = useState('CC');  
  const [idNumber, setIdNumber] = useState(null);  
  const [names, setNames] = useState(null);  
  const [lastNames, setLastNames] = useState(null);  
  const [errorMessage, setErrorMessage] = useState(null);  
  const [showSpinner, setShowSpinner] = useState(false);
  
  const onPressButton = () => {
    if (!idNumber) {
      setErrorMessage("El campo número de identificación es requerido");
      return;
    }
    if (!names) {
      setErrorMessage("El campo Nombres es requerido");
      return;
    }
    if (!idNumber) {
      setErrorMessage("El campo Apellidos es requerido");
      return;
    }
    setShowSpinner(true);
    const userData = {
      idType,
      idNumber,
      names,
      lastNames
    }
    props.addUserData(userData);
    setTimeout(() => {
      setShowSpinner(false);
      /* props.navigation.navigate('SmsRequest'); */
    }, 1000);
  };

  const onChangeInput = (idNumber = null, names = null, lastNames = null) => {
    console.log(idNumber)
    console.log(names)
    console.log(lastNames)

    if(idNumber) {
      setIdNumber(idNumber)
    }

    if(names) {
      setNames(names)
    }

    if(lastNames) {
      setLastNames(lastNames)
    }
  };

  const onChangeIdNumber = (idNumber) => {
    setIdNumber(idNumber)
  };

  const onChangeNames = (names) => {
    setNames(names)
  };

  const onChangeLastNames = (lastNames) => {
    setLastNames(lastNames)
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
            props.navigation.goBack();
          }}
        />        
        <Text style={styles.title}>Dejanos saber como podemos ayudarte</Text>
        <Text style={styles.description}>¡Para enviarte el SOAT de una!</Text>
        <View>
          <View style={styles.inputContainer}>            
             <Picker
              selectedValue={idType}
              style={{ height: 50, width: 'auto' }}
              onValueChange={(itemValue, itemIndex) => setIdType(itemValue)}
            >
              <Picker.Item label="Cédula de ciudadania" value="CC" />
              <Picker.Item label="Tarjeta de identidad" value="TI" /> 
              <Picker.Item label="Pasaporte" value="P" /> 
              <Picker.Item label="Cédula de extrangeria" value="CE" /> 
            </Picker>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Número de identificación"
              style={styles.input}
              onChangeText={(idNumber) => onChangeIdNumber(idNumber) }
              value={idNumber }
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Nombres"
              style={styles.input}
              onChangeText={(names) => onChangeNames(null, names, null) }
              value={names}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Apellidos"
              style={styles.input}
              onChangeText={(lastNames) => onChangeLastNames(null, null, lastNames) }
              value={lastNames}
            />
          </View>
        </View>
        {
          errorMessage &&
          <Text style={styles.error}>{errorMessage}</Text>
        }
        <ContinueButton onPress={() => onPressButton()} text="Ir a Pagar"/>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}


function mapDispatchToProps(dispatch) {
  return {
    addUserData: userData => dispatch({ type: 'ADD_USERDATA', userData })
  };
}

export default connect(
  null,
  mapDispatchToProps
)(UserDataRequestScreen);
