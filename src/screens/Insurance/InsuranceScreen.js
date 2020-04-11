import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView, Dimensions, FlatList, TouchableWithoutFeedback} from 'react-native';
import styles from './styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { carPicture } from '../../data/dataArrays';
import { connect } from 'react-redux';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

class InsuranceScreen extends React.Component {
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
      type: '',
      paymentMethods: [
        { id: 0, name: 'PSE', check: true },
        { id: 1, name: 'TC', check: false },
        { id: 2, name: 'TD', check: false }        
      ],
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
    this.props.navigation.navigate('insurancePaymentResult');
  };

  onPressPaymentMethod = id => {
    let arr = this.state.paymentMethods;
    arr.map(data => {
      if (!data.check && data.id == id) {
        data.check = true;
      } else {
        data.check = false;
      }
    });
    this.setState({
      currentPaymentMethod: arr
    });
  };

  renderPaymentMethod = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,1,0.9)"
      onPress={() => this.onPressPaymentMethod(item.id)}
    >
      <View style={styles.mealContainer}>
        <Image
          style={styles.circle}
          source={
            item.check
              ? require('../../../assets/icons/fullCircle.png')
              : require('../../../assets/icons/emptyCircle.png')
          }
        />
        <Text style={styles.mealTitle}>{item.name}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    const { activeSlide } = this.state;
    return (
      <ScrollView style={styles.container}>
        <ScrollView style={styles.carouselContainer}>
          <View style={styles.carousel}>
            <Carousel
              ref={c => {
                this.slider1Ref = c;
              }}
              data={carPicture}
              renderItem={this.renderImage}
              sliderWidth={SCREEN_WIDTH}
              itemWidth={SCREEN_WIDTH}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              firstItem={0}
              loop={false}
              autoplay={false}
              autoplayDelay={500}
              autoplayInterval={3000}
              onSnapToItem={index => this.setState({ activeSlide: index })}
            />
            <Pagination
              dotsLength={carPicture.length}
              activeDotIndex={activeSlide}
              containerStyle={styles.paginationContainer}
              dotColor="rgba(255, 255, 255, 0.92)"
              dotStyle={styles.paginationDot}
              inactiveDotColor="white"
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={this.slider1Ref}
              tappableDots={!!this.slider1Ref}
            />
          </View>
        </ScrollView>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{this.props.plateInfo.brand}</Text>
          <Text style={styles.description}>{this.props.plateInfo.insuranceAmount}</Text>
        </View>
        <TouchableWithoutFeedback>
          <View style={styles.center}>
            <FlatList              
              vertical
              showsVerticalScrollIndicator={false}
              numColumns={3}
              data={this.state.paymentMethods}
              renderItem={this.renderPaymentMethod}
              extraData={this.state}
              keyExtractor={item => `${item.id}`}
              listKey={0}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableHighlight
          style={styles.purchaseBtnContainer}
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => this.onPressPurchase()}
        >
          <Text style={styles.purchaseBtnTxt}>Pagar</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
    return {        
        plateInfo: state.plate
    };
  }

function mapDispatchToProps(dispatch) {
  return {
    payInsurance: currentPaymentMethod => dispatch({ type: 'ADD_PAYMENT_METHOD', currentPaymentMethod })
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InsuranceScreen);
