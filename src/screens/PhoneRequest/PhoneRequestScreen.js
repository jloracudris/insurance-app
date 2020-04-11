import React, {useState} from 'react';
import { Text, View, TouchableWithoutFeedback, Keyboard, SafeAreaView  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import LogoHeader from '../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import styles from './styles';
import Spinner from 'react-native-loading-spinner-overlay';
import IntlPhoneInput from 'react-native-intl-phone-input';


const PhoneRequestScreen = (props) => {
  const [phone, setPhone] = useState('');  
  const [showSpinner, setShowSpinner] = useState(false);
  
  const onPressButton = () => {
    setShowSpinner(true);
    props.addUserPhone(phone);    
    setTimeout(() => {
      setShowSpinner(false);
      props.navigation.navigate('SmsRequest');
    }, 1000);
  };

  const onChangeText = ({dialCode, unmaskedPhoneNumber, phoneNumber, isVerified}) => {
    if(isVerified) {
      setPhone(phoneNumber)
    }

    console.log(dialCode, unmaskedPhoneNumber, phoneNumber, isVerified);
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
        <Text style={styles.title}>¿Cuál es tu número de teléfono móvil?</Text>
        <SafeAreaView>
          <IntlPhoneInput onChangeText={onChangeText} defaultCountry="CO" phoneInputStyle={styles.input} dialCodeTextStyle={styles.dialCodeTextStyle} />
        </SafeAreaView>
        <ContinueButton onPress={() => onPressButton()} text="Continuar"/>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}


function mapDispatchToProps(dispatch) {
  return {
    addUserPhone: phone => dispatch({ type: 'ADD_USERPHONE', phone })
  };
}

export default connect(
  null,
  mapDispatchToProps
)(PhoneRequestScreen);
