import { StyleSheet, Dimensions } from 'react-native';
import { registration } from '../../AppStyles';
// screen sizing
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  container: registration.container,
  title: {
    marginTop: 70,
    marginBottom: 20,
    margin: 30,
    fontSize: 24,
    color: '#2d3142',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  inputContainer: {
    margin: 20,
    marginBottom: 70,
    padding: 5,
    width: SCREEN_WIDTH - 100,
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center'
  },
  dialCodeTextStyle: {
    paddingLeft: 10
  },
  input: {
    color: 'black',
    fontSize: 15,
    marginLeft: 3,
    height: 50,
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  error: {
    fontSize: 13,
    color: 'red',
    textAlign: 'center'
  },
});

export default styles;
