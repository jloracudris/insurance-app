import React from 'react';
import { Text, View, TouchableHighlight, Image, Dimensions, ScrollView } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import styles from './styles';
import LogoHeader from '../../components/LogoHeader/LogoHeader';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

export default class insuranceWelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0
    };
  }

  renderImage = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,1,0.9)">
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../../../assets/images/running.jpg')} />
      </View>
    </TouchableHighlight>
  );

  onPressGetStarted = () => {
    this.props.navigation.navigate('Plate');
  };

  render() {
    const { activeSlide } = this.state;
    const { navigation } = this.props;
    return (
      <ScrollView style={styles.container}>
        <LogoHeader
            onPress={() => {
              this.props.navigation.goBack();
            }}
            backButton={false}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Bienvenido a tu SOAT Digital</Text>
          <Text style={styles.description}>The best UI Kit for your next health and fitness project</Text>
        </View>
        <ScrollView style={styles.carouselContainer}>
          <View style={styles.carousel}>
            <Carousel
              ref={c => {
                this.slider1Ref = c;
              }}
              data={[
                {
                  id: 0,                
                  photoUrl: '../../../assets/images/running.jpg'
                }
              ]}
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
          </View>
        </ScrollView>
        <View style={styles.logContainer}>
          <TouchableHighlight
            underlayColor="rgba(73,182,77,1,0.9)"
            style={styles.btnContainer}
            onPress={() => this.onPressGetStarted()}
          >
            <Text style={styles.btnText}>Cotizar</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}
