import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  StyleSheet,
  View,
  DatePickerIOS,
  TouchableOpacity,
} from 'react-native';
import * as GlobalConstants from '../../utils/GlobalConstants';
import BaseComponent from '../Views/BaseComponent';

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundTouch: {
    width: GlobalConstants.ScreenWidth,
    height: GlobalConstants.ScreenHeight - 260,
  },
  handleAreaView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E21939',
    height: 44,
    width: GlobalConstants.ScreenWidth,
    marginTop: 0,
  },
  handleTouch: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePicker: {
    height: 216,
    width: GlobalConstants.ScreenWidth,
    marginTop: 0,
    backgroundColor: 'white',
  },
  cancleText: {
    color: '#FFFFFF',
    fontSize: 15,
    marginLeft: 10,
  },
  confirmText: {
    color: '#FFFFFF',
    fontSize: 15,
    marginRight: 10,
  },
});


export default class DatePickerView extends BaseComponent {
  static propTypes = {
    confirmClicked: PropTypes.func.isRequired,
    dissappear: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      hidden: false,
    };
    this.backgroundClicked = this.backgroundClicked.bind(this);
    this.cancleClicked = this.cancleClicked.bind(this);
    this.confirmClicked = this.confirmClicked.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }
  onDateChange(date) {
    this.setState({ date: date });
  }
  // 点击取消
  cancleClicked() {
    this.setState({ hidden: true });
    this.props.dissappear();
  }
  // 点击区域外
  backgroundClicked() {
    this.setState({ hidden: true });
    this.props.dissappear();
  }
  // 点击确定
  confirmClicked() {
    this.setState({ hidden: true });
    this.props.confirmClicked(this.state.date);
    this.props.dissappear();
  }

  render() {
    return (!this.state.hidden) && (
    <View style={styles.view}>
      <TouchableOpacity
        style={styles.backgroundTouch}
        onPress={this.backgroundClicked}
        hidden={this.state.hidden}
      />
      <View>
        <View style={styles.handleAreaView}>
          <TouchableOpacity
            style={styles.handleTouch}
            onPress={this.cancleClicked}
          >
            <Text style={styles.cancleText} >
            取消
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.handleTouch} onPress={this.confirmClicked}>
            <Text style={styles.confirmText} >
            确定
            </Text>
          </TouchableOpacity>
        </View>
        <DatePickerIOS
          style={styles.datePicker}
          date={this.state.date}
          mode="date"
          onDateChange={this.onDateChange}
        />
      </View>
    </View>
    );
  }
}
