import { StyleSheet, Dimensions } from 'react-native';
import { post } from '../../AppStyles';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    fontFamily: 'Rubik'
  },
  title: {
    lineHeight: 30,
    fontSize: 30,
    color: '#2d3142',
    fontWeight: 'bold'
  },
  titleContainer: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inscription: {
    height: 20,
    width: 20,
    marginRight: 10
  },
  cardImg: {
    width: 60,
    height: 60,
    borderRadius: 60,
    margin: 10,
    marginLeft: 0,
    marginRight: 20
  },
  inssuranceValue: {
    color: '#7265E3',
    fontSize: 30,
    fontWeight: '700',
    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
    paddingTop: 40
  },
  carouselContainer: {
    margin: 20
  },
  inssuranceAmountRow: {
    flexDirection: 'row',
    marginBottom: -27,
    marginTop: 15,
    marginLeft: -30,
    marginRight: -30,
    backgroundColor: '#f5f6fa',
    borderRadius: 10,    
    paddingBottom: 30
  },
  dateView: {        
    flex: 1,
    flexDirection: 'column'
  },
  showMonth: {
    backgroundColor: '#7265E3',    
    marginTop: 0,
    width: 55,
    height: 20,
    borderWidth: 1,
    borderColor: '#7265E3',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    justifyContent: 'center',
    alignItems: 'center' 
  },
  showMonthFont: {
    color: 'white',
    fontWeight: '700',
  },
  showDay: {    
    borderWidth: 1,
    backgroundColor: '#f5f6fa',
    borderColor: '#f5f6fa',
    color: 'black',
    fontWeight: '700',    
    width: 55,
    height: 40,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'    
  },
  carDescription: {
    width: '80%'
  },
  postImg: {    
    marginBottom: -10,
    width: SCREEN_WIDTH - 30,
    height: 250,
    marginTop: 0,
    top: -15,
    left: -30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginRight: 0
  },
  postContainer: {
    backgroundColor: '#ffff',
    borderColor: '#ffff',
    borderRadius: 10,
    width: SCREEN_WIDTH - 30,
    paddingTop: 15,
    padding: 30,
    marginBottom: 20
  },
  secondHalf: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    marginTop: 40,
  },
  footerContainer: {
    justifyContent: 'flex-end',
    height: 40,
    flex: 1,
  },
  purchaseBtnContainer: {
    width: SCREEN_WIDTH - 100,
    height: 50,
    borderWidth: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#7265E3',
    borderColor: '#7265E3',
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 0    
  },
  purchaseBtnTxt:{
    color: 'white',
    fontWeight: '700'
  },
  iconText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    marginRight: 20,
    marginLeft: 5,
    marginTop: 4
  },
  rowContainer: post.rowContainer,
  authorImg: post.authorImg,
  authorName: post.authorName,
  date: post.date,  
  postTitle: post.postTitle,
  icon: post.icon
});

export default styles;
