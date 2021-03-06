import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import BaseComponent from '../Views/BaseComponent';
import PropTypes from 'prop-types';
const styles = StyleSheet.create({
  rootTouchableWithoutFeedback: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 29,
    backgroundColor: 'white',
  },
  touchableWithoutFeedback_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 29,
  },
  titleText: {
    color: '#3c3e45',
    fontSize: 14,
  },
  arrowView: {
    position: 'absolute',
    top: 4.5,
    right: 23,
    width: 20,
    height: 20,
  },
});
export default class JCListSectionHeader extends BaseComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    sectionId: PropTypes.number.isRequired,
    onClicked: PropTypes.func.isRequired,
    resetHeader: PropTypes.bool.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      arrowDirection: 'up',
    };
    this.clicked = this.clicked.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.resetHeader && nextProps.resetHeader) {
      this.setState(
        { arrowDirection: 'up' },
      );
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.arrowDirection !== nextState.arrowDirection) {
      return true;
    }
    return false;
  }
  clicked() {
    this.setState(preState => ({
      arrowDirection: preState.arrowDirection === 'up' ? 'down' : 'up',
    }
    ));
    this.props.onClicked(this.props.sectionId, this.props.sectionId + (this.state.arrowDirection === 'up' ? 'down' : 'up'));
  }
  render() {
    return (
      <TouchableWithoutFeedback style={styles.rootTouchableWithoutFeedback} onPress={this.clicked}>
        <View style={styles.touchableWithoutFeedback_view}>
          <Text style={styles.titleText}>
            {this.props.text}
          </Text>
          <View style={styles.arrowView}>
            {
               this.state.arrowDirection === 'up'
               ?
                 <Image source={require('../../../images/roundGrayUpArrow.png')} />
               :
                 <Image source={require('../../../images/roundGrayDownArrow.png')} />
            }
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

