import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView, Dimensions } from 'react-native';
import styles from './styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { carPicture } from '../../data/dataArrays';
import { connect } from 'react-redux';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
import NumberFormat from 'react-number-format';
import LogoHeader from '../../components/LogoHeader/LogoHeader';

class PlateFoundScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTransparent: 'true',
    headerStyle: {
      height: 60
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      type: ''
    };
  }

  renderImage = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,1,0.9)">
      <View style={styles.imageContainer}>
        <Image 
            style={styles.image} 
            source={{ uri: item.photoUrl }} />
      </View>
    </TouchableHighlight>
  );

  onPressPurchase = () => {    
    this.props.navigation.navigate('PhoneRequest');
  };

  getMonthName = () => {
    const date = new Date(this.props.vehicule.expired);
    const monthsArray = [
      { monthNumber: 1, MonthName: 'Ene' },
      { monthNumber: 2, MonthName: 'Feb' },
      { monthNumber: 3, MonthName: 'Mar' },
      { monthNumber: 4, MonthName: 'Abr' },
      { monthNumber: 5, MonthName: 'May' },
      { monthNumber: 6, MonthName: 'Jun' },
      { monthNumber: 7, MonthName: 'Jul' },
      { monthNumber: 8, MonthName: 'Ago' },
      { monthNumber: 9, MonthName: 'Sep' },
      { monthNumber: 10, MonthName: 'Oct' },
      { monthNumber: 11, MonthName: 'Nov' },
      { monthNumber: 12, MonthName: 'Dec' },
    ]
    return monthsArray.find(t=>t.monthNumber === date.getMonth() + 1).MonthName;
  }
  
  getDay = () => {
    const date = new Date(this.props.vehicule.expired);
    return date.getDay()
  }

  render() {
    const { activeSlide } = this.state;
    const { navigation } = this.props;
    return (
      <ScrollView style={styles.container}>
         <LogoHeader
          onPress={() => {
            this.props.navigation.goBack();
          }}
          showLogo={false}
          shouldGoUp={true}
        /> 
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Cotización</Text>          
        </View>
        <View style={styles.titleContainer}>
          <TouchableHighlight
            style={styles.postContainer}
            underlayColor="rgba(73,182,77,1,0.9)"            
          >
            <View>
              <Image style={styles.postImg} source={{ uri: this.props.image }} />
              <View style={styles.rowContainer}>                
                <View style={styles.dateView}>
                  <View style={styles.showMonth}>
                    <Text style={styles.showMonthFont}>{this.getMonthName()}</Text> 
                  </View>
                  <View style={styles.showDay}>
                    <Text>{this.getDay()}</Text> 
                  </View>                
                </View>
                <View style={styles.carDescription}>
                  <Text style={styles.authorName}>{`${this.props.vehicule.Brand.Description} ${this.props.vehicule.BrandLine.Description}`}</Text>                  
                  <Text style={styles.date}>{this.props.vehicule.NumberPlate}</Text>
                </View>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.iconText}>Recuerda que si tienes un accidente, nuestro SOAT ampara lesiones o fallecimiento de conductores, pasajeros o peatones implicados.</Text> 
              </View>
              <View style={styles.inssuranceAmountRow}>
                <Text style={styles.inssuranceValue}><NumberFormat value={this.props.tarifa.TotalAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <Text>{value}</Text>} /></Text> 
              </View>             
            </View>
          </TouchableHighlight>         
        </View>
        <View style={styles.secondHalf}>
          <View style={styles.footerContainer}>
            <TouchableHighlight
              style={styles.purchaseBtnContainer}
              underlayColor="rgba(73,182,77,1,0.9)"
              onPress={() => this.onPressPurchase()}
            >
              <Text style={styles.purchaseBtnTxt}>Comprar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
      description: state.plate.description,
      vehicule: state.plate.vehicule,
      tarifa: state.plate.tarifa,
      image: state.plate.imagen
  };
}


export default connect(
    mapStateToProps,
    null
)(PlateFoundScreen);
