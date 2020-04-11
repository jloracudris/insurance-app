import React from 'react';
import { TouchableHighlight, Image, Text, View } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

export default class LogoHeader extends React.Component {
  render() {
    return (
      <View style={this.props.shouldGoUp? styles.headerContainerInnerPage : styles.headerContainer}>
        <TouchableHighlight
          onPress={this.props.onPress}
          underlayColor="rgba(73,182,77,1,0.9)"
          style={styles.iconContainer}
        >
          { this.props.backButton ?
            <Image style={styles.backIcon} source={require('../../../assets/icons/backIcon.png')} />
            :            
            <React.Fragment></React.Fragment>
          }
          
        </TouchableHighlight>
        {
          this.props.showLogo ? 
          <Image style={styles.logo} source={require('../../../assets/icons/logo.png')} />
          :
          <React.Fragment></React.Fragment>
        }
        
      </View>
    );
  }
}

LogoHeader.propTypes = {
  backButton: PropTypes.boolean,
  showLogo: PropTypes.boolean,
  shouldGoUp: PropTypes.boolean
};

LogoHeader.defaultProps = {
  backButton: true,
  showLogo: true
};
