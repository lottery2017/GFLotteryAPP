import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Platform,
    TouchableOpacity,
    NativeModules,
} from 'react-native';
import BaseComponent from '../Views/BaseComponent';
import PropTypes from 'prop-types';
const naviBackIcon = require('../../../images/navbar_backbutton.png');

const styles = StyleSheet.create({
  barView: {
    height: Platform.OS === 'android' ? 44 : 64,
    backgroundColor: '#D7213C',
  },
  showView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: Platform.OS === 'android' ? 0 : 20,
    height: 44,
  },
  title: {
    color: 'white',
    fontSize: 18.0,
    fontWeight: 'bold',
  },
  leftNav: {
    position: 'absolute',
    top: 6,
    left: 0,
    width: 33,
    height: 33,
    justifyContent: 'center',
  },
  rightNav: {
    position: 'absolute',
    right: 8,
    top: 8,
    bottom: 8,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
});

export default class CommonNaviBar extends BaseComponent {


  static propTypes = {
    middleTitle: PropTypes.string,
    middleView: PropTypes.element,
    leftTitle: PropTypes.string,
    leftView: PropTypes.element,
    leftAction: PropTypes.func,
    rightTitle: PropTypes.string,
    rightView: PropTypes.element,
    rightAction: PropTypes.func,
    leftHidden: PropTypes.bool,
    style: PropTypes.string,
  };

  static defaultProps = {
    middleTitle: '请设置标题!',
    leftHidden: false,
    leftView: <Image source={naviBackIcon} />,
    leftAction: () => { NativeModules.LDRNBridge.pop(); },
    middleView: null,
    leftTitle: null,
    rightTitle: null,
    rightView: null,
    rightAction: null,
    style: null,
  };

  constructor(props) {
    super(props);
    this.getLeftBar = this.getLeftBar.bind(this);
    this.getMiddleTitle = this.getMiddleTitle.bind(this);
    this.getRightBar = this.getRightBar.bind(this);
  }

// leftTitle和leftImage 优先判断leftTitle (即 文本按钮和图片按钮优先显示文本按钮)，right相同。
  getLeftBar() {
    if (this.props.leftHidden) {
      return null;
    }
    if (this.props.leftTitle) {
      return (
        <TouchableOpacity style={styles.leftNav} onPress={this.props.leftAction}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.text}>{this.props.leftTitle}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    if (this.props.leftView) {
      return (
        <TouchableOpacity style={styles.leftNav} onPress={this.props.leftAction}>
          <View style={{ alignItems: 'center' }}>
            {this.props.leftView}
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  }

  getMiddleTitle() {
    if (this.props.middleTitle) {
      return (
        <Text style={styles.title}>{this.props.middleTitle || ''}</Text>
      );
    }
    if (this.props.middleView) {
      return (this.props.middleView);
    }
    return null;
  }

  getRightBar() {
    if (this.props.rightTitle) {
      return (
        <TouchableOpacity style={styles.rightNav} onPress={this.props.rightAction}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.text}>{this.props.rightTitle}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    if (this.props.rightView) {
      return (
        <TouchableOpacity style={styles.rightNav} onPress={this.props.rightAction}>
          <View style={{ alignItems: 'center' }}>
            {this.props.rightView}
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  }
  render() {
    return (
      <View style={[styles.barView, this.props.style]}>
        <View style={styles.showView}>
          {this.getLeftBar()}
          {this.getMiddleTitle()}
          {this.getRightBar()}
        </View>
      </View>
    );
  }
}
