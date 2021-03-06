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
  input: {
    color: 'black',
    fontSize: 15,
    marginLeft: 10,
    textAlign: 'center',
    height: 50,
    textTransform: "uppercase"
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
  description: {
    fontSize: 13,
    color: '#9c9eb9',
    textAlign: 'center'
  },
  blue:{
    color: "#7265E3"
  },
  error: {
    fontSize: 13,
    color: 'red',
    textAlign: 'center'
  },
});

export default styles;
