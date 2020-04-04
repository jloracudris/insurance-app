import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView } from 'react-native';
import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';
import { connect } from 'react-redux';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerStyle: {
        backgroundColor: '#ECECEC',
        elevation: 0,
        height: 80,
        shadowColor: 'transparent',
        borderBottomWidth: 0
      },
      headerLeft: (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: (
        <View style={styles.photoContainer}>
          <View style={styles.greenDot}></View>
          <Image style={styles.userPhoto} source={{ uri: params.userPhoto }} />
        </View>
      )
    };
  };
  constructor(props) {
    super(props);

    this.state = {
      stepsDone: 7000,
      stepsGoal: 10000,
      macroNutrients: {
        proteinDone: 100,
        proteinGoal: 160,
        carbDone: 60,
        carbGoal: 200,
        fatDone: 20,
        fatGoal: 75
      }
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      userPhoto: this.props.userPhoto
    });
  }
  onPressNutrition = () => {
    this.props.navigation.navigate('Nutrition', {
      macroNutrients: this.state.macroNutrients
    });
  };

  onPressSteps = () => {
    let stepsDone = this.state.stepsDone;
    let stepsGoal = this.state.stepsGoal;
    this.props.navigation.navigate('Steps', { stepsDone, stepsGoal });
  };

  onPressDetailsText = () => {};

  getCaloriesDone = () => {
    var calories = 0;
    this.props.nutrition.map(data => {
      data.foods.map(food => {
        calories += food.calories;
      });
    });
    return calories;
  };
  render() {
    const caloriesDone = this.getCaloriesDone();
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.boldText}>Good morning, {this.props.userName}</Text>
          <Text style={styles.normalText}>
            Eat the right amount of food and stay hydrated through the day
          </Text>
          <TouchableHighlight
            underlayColor="rgba(73,182,77,1,0.9)"
            onPress={() => this.onPressDetailsText()}
          >
            <Text style={styles.detailText}>More details</Text>
          </TouchableHighlight>
        </View>

        <TouchableHighlight
          style={styles.infoContainer}
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => this.onPressNutrition()}
        >
          <View style={styles.rowContainer}>
            <Image
              style={styles.questionIcon}
              source={require('../../../assets/icons/colorFood.png')}
            />
            <View style={styles.columnContainer}>
              <View style={styles.rowContainer2}>
                <View style={styles.textContainer}>
                  <Text style={styles.mainText}>Nutrition</Text>
                  <Text style={styles.secText}>
                    {caloriesDone} cal / {this.props.nutritionGoal} cal
                  </Text>
                </View>
                <View
                  style={
                    caloriesDone > this.props.nutritionGoal
                      ? styles.warningBtnContainer
                      : styles.btnContainer
                  }
                >
                  <Text
                    style={
                      caloriesDone > this.props.nutritionGoal
                        ? styles.warningBtnText
                        : styles.btnText
                    }
                  >
                    {caloriesDone > this.props.nutritionGoal ? 'Warning' : 'On'}
                  </Text>
                </View>
              </View>
              <View style={styles.bar}>
                <View
                  style={
                    caloriesDone <= this.props.nutritionGoal
                      ? {
                          height: 12,
                          width: 2,
                          backgroundColor: 'black',
                          position: 'absolute',
                          left: (caloriesDone / this.props.nutritionGoal) * 100 + '%',
                          top: -4,
                          zIndex: 5
                        }
                      : {
                          height: 12,
                          width: 2,
                          backgroundColor: 'black',
                          position: 'absolute',
                          left: '100%',
                          top: -4,
                          zIndex: 5
                        }
                  }
                />
                <View style={styles.bar1}></View>
                <View style={styles.bar2}></View>
                <View style={styles.bar3}></View>
              </View>
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.infoContainer}
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => this.props.navigation.navigate('Water')}
        >
          <View style={styles.rowContainer}>
            <Image
              style={styles.questionIcon}
              source={require('../../../assets/icons/colorWater.png')}
            />
            <View style={styles.columnContainer}>
              <View style={styles.rowContainer2}>
                <View style={styles.textContainer}>
                  <Text style={styles.mainText}>Water</Text>
                  <Text style={styles.secText}>
                    {' '}
                    {this.props.waterDone} / {this.props.waterGoal} glasses
                  </Text>
                </View>
                <View
                  style={
                    this.props.waterDone <= this.props.waterGoal / 2
                      ? styles.warningBtnContainer
                      : styles.btnContainer
                  }
                >
                  <Text
                    style={
                      this.props.waterDone <= this.props.waterGoal / 2
                        ? styles.warningBtnText
                        : styles.btnText
                    }
                  >
                    {this.props.waterDone <= this.props.waterGoal / 2 ? 'Warning' : 'On'}
                  </Text>
                </View>
              </View>
              <View style={styles.bar}>
                <View
                  style={
                    this.props.waterDone <= this.props.waterGoal
                      ? {
                          height: 12,
                          width: 2,
                          backgroundColor: 'black',
                          position: 'absolute',
                          left: (this.props.waterDone / this.props.waterGoal) * 100 + '%',
                          top: -4,
                          zIndex: 5
                        }
                      : {
                          height: 12,
                          width: 2,
                          backgroundColor: 'black',
                          position: 'absolute',
                          left: '100%',
                          top: -4,
                          zIndex: 5
                        }
                  }
                />
                <View style={styles.bar3}></View>
                <View style={styles.bar2}></View>
                <View style={styles.bar1}></View>
              </View>
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.infoContainer}
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => this.onPressSteps()}
        >
          <View style={styles.rowContainer}>
            <Image
              style={styles.questionIcon}
              source={require('../../../assets/icons/colorWalk.png')}
            />
            <View style={styles.columnContainer}>
              <View style={styles.rowContainer2}>
                <View style={styles.textContainer}>
                  <Text style={styles.mainText}>Daily Steps</Text>
                  <Text style={styles.secText}>
                    {this.state.stepsDone} steps / {this.state.stepsGoal} steps
                  </Text>
                </View>
                <View
                  style={
                    this.state.stepsDone <= this.state.stepsGoal / 2
                      ? styles.warningBtnContainer
                      : styles.btnContainer
                  }
                >
                  <Text
                    style={
                      this.state.stepsDone <= this.state.stepsGoal / 2
                        ? styles.warningBtnText
                        : styles.btnText
                    }
                  >
                    {' '}
                    {this.state.stepsDone <= this.state.stepsGoal / 2 ? 'Warning' : 'On'}
                  </Text>
                </View>
              </View>
              <View style={styles.bar}>
                <View
                  style={
                    this.state.stepsDone <= this.state.stepsGoal
                      ? {
                          height: 12,
                          width: 2,
                          borderRadius: 8,
                          backgroundColor: 'black',
                          position: 'absolute',
                          left: (this.state.stepsDone / this.state.stepsGoal) * 100 + '%',
                          top: -4,
                          zIndex: 5
                        }
                      : {
                          height: 12,
                          width: 2,
                          borderRadius: 8,
                          backgroundColor: 'black',
                          position: 'absolute',
                          left: '100%',
                          top: -4,
                          zIndex: 5
                        }
                  }
                />
                <View style={styles.bar3}></View>
                <View style={styles.bar2}></View>
                <View style={styles.bar1}></View>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    waterDone: state.water.waterDone,
    waterGoal: state.water.waterGoal,
    nutritionGoal: state.nutrition.nutritionGoal,
    nutrition: state.nutrition.nutrition,
    userName: state.registration.userName,
    userPhoto: state.registration.userPhoto
  };
}

export default connect(
  mapStateToProps,
  null
)(HomeScreen);
