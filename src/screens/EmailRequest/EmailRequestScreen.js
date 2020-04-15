import React, {useState} from 'react';
import { Text, View, TouchableWithoutFeedback, Keyboard, SafeAreaView, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import LogoHeader from '../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import styles from './styles';
import Spinner from 'react-native-loading-spinner-overlay';


const EmailRequestScreen = (props) => {
  const [email, setEmail] = useState('');  
  const [errorMessage, setErrorMessage] = useState(null);  
  const [showSpinner, setShowSpinner] = useState(false);
  
  const onPressButton = () => {    
    if(!email) {
      setErrorMessage("El correo electrónico es necesario para continuar!");
    } else {
      setShowSpinner(true);
      const result = validate(email);

      if(result){      
        props.addUserEmail(email);
        setTimeout(() => {
          setShowSpinner(false);
          props.navigation.navigate('UserDataRequest');
        }, 1000);
      } else {
        setShowSpinner(false);
        setError("El correo electrónico es invalido.")
      }
    }
  };

  const onChangeText = (email) => {
    setEmail(email);
  };

  const validate = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase())
  }


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
        <Text style={styles.title}>¿Cuál es tu correo electrónico?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(email) => onChangeText(email) }
            value={email}
          />          
        </View>
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
    addUserEmail: email => dispatch({ type: 'ADD_USEREMAIL', email })
  };
}

export default connect(
  null,
  mapDispatchToProps
)(EmailRequestScreen);
