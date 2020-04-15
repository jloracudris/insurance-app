/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import React from 'react';
import { View } from 'react-native';
import HomeScreen from '../screens/Home/HomeScreen';
import LandingScreen from '../screens/Landing/LandingScreen';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import EmailAdressScreen from '../screens/EmailAdress/EmailAdressScreen';
import FingerPrintScreen from '../screens/FingerPrint/FingerPrintScreen';
import PasswordScreen from '../screens/Password/PasswordScreen';
import HelpScreen from '../screens/Help/HelpScreen';
import GenderScreen from '../screens/Gender/GenderScreen';
import InterestsScreen from '../screens/Interests/InterestsScreen';
import ProfilePictureScreen from '../screens/ProfilePicture/ProfilePictureScreen';
import WaterScreen from '../screens/Water/WaterScreen';
import CommuityScreen from '../screens/Community/CommunityScreen';
import CommentScreen from '../screens/Comment/CommentScreen';
import CreatePostScreen from '../screens/CreatePost/CreatePostScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import CreateCommentScreen from '../screens/CreateComment/CreateCommentScreen';
import NotificationsScreen from '../screens/Notifications/NotificationsScreeen';
import GoalAchievedScreen from '../screens/GoalAchieved/GoalAchievedScreen';
import NutritionScreen from '../screens/Nutrition/NutritionScreen';
import StepsScreen from '../screens/Steps/StepsScreen';
import PremiumScreen from '../screens/Premium/PremiumScreen';
import SuccessScreen from '../screens/Success/SuccessScreen';
import SignInScreen from '../screens/SignIn/SignInScreen';
import PlateScreen from '../screens/Plate/PlateScreen';
import PlateFoundScreen from '../screens/PlateFound/PlateFoundScreen';
import InsuranceScreen from '../screens/Insurance/InsuranceScreen';
import insurancePaymentResultScreen from '../screens/insurancePaymentResult/insurancePaymentResultScreen';
import InsuranceWelcomeScreen from '../screens/InsuranceWelcome/insuranceWelcomeScreen';
import PhoneRequestScreen from '../screens/PhoneRequest/PhoneRequestScreen';
import SmsRequestScreen from '../screens/SmsRequest/SmsRequestScreen';
import EmailRequestScreen from '../screens/EmailRequest/EmailRequestScreen';
import UserDataRequestScreen from '../screens/UserDataRequest/UserDataRequestScreen';

const MainNavigator = createStackNavigator(
  {
    Plate: PlateScreen,
    PlateFound: PlateFoundScreen,
    Insurance: InsuranceScreen,
    insurancePaymentResult: insurancePaymentResultScreen,
    InsuranceWelcome: InsuranceWelcomeScreen,
    PhoneRequest: PhoneRequestScreen,
    SmsRequest: SmsRequestScreen,
    EmailRequest: EmailRequestScreen,
    UserDataRequest: UserDataRequestScreen
  },
  {
    initialRouteName: 'InsuranceWelcome',    
    headerMode: 'none',
    defaultNavigationOptions: ({ navigation }) => ({
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center'
      },
      headerRight: <View />
    })
  }
);

const LandingNavigator = createStackNavigator(
  {
    Landing: LandingScreen,
    Email: EmailAdressScreen,
    FingerPrint: FingerPrintScreen,
    Password: PasswordScreen,
    Help: HelpScreen,
    Gender: GenderScreen,
    Interests: InterestsScreen,
    ProfilePicture: ProfilePictureScreen,
    SignIn: SignInScreen
  },
  {
    initialRouteName: 'Landing',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

const DrawerStack = createDrawerNavigator(
  {
    Main: MainNavigator,
    Landing: LandingNavigator
  },
  {
    drawerPosition: 'left',
    initialRouteName: 'Main',
    drawerWidth: 250,
    contentComponent: DrawerContainer
  }
);

export default AppContainer = createAppContainer(DrawerStack);
