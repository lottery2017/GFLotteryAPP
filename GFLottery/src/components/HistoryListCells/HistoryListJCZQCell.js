import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  NativeModules,
} from 'react-native';
import BaseComponent from '../Views/BaseComponent';
import PropTypes from 'prop-types';
import * as GlobalConstants from '../../utils/GlobalConstants';

const lineColor = '#ececec';
const styles = StyleSheet.create({
  rootTouchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  infoView: {
    backgroundColor: '#F4F4F4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 105,
    width: GlobalConstants.ScreenWidth,
  },
  gameInfoView: {// 比赛信息
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: GlobalConstants.ScreenWidth * 0.9,
  },
  gameResultView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameLeagueInfoView: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  gameLeagueNameView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameLeagueNameText: {
    fontSize: 13,
    color: '#81765a',
  },
  matchNum_StartTimeView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  matchNumText: {
    fontSize: 12.0,
    color: '#81765a',
  },
  startTimeText: {
    fontSize: 12.0,
    color: '#81765a',
  },
  hostNameView: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  hostNameText: {
    fontSize: 16.0,
    color: '#3c3e45',
    textAlign: 'right',
  },
  allScoreView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultScoreView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  halfScoreView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  halfScoreText: {
    fontSize: 11.0,
    color: 'gray',
  },
  guestNameView: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  guestNameText: {
    fontSize: 16.0,
    color: '#3c3e45',
  },
  lotterInfoAreaView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lottResCnSpf_SpSpfView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottResCnSpfView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spSpfView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottSpSpfView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottResCnSpfText: {
    fontSize: 14.0,
    color: '#3c3e45',
  },
  spSpfText: {
    fontSize: 14.0,
    color: '#3c3e45',
  },
  lottResCnRqspf_spRqspfView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottResCnRqspfText: {
    fontSize: 14.0,
    color: '#3c3e45',
  },
  lottResCnRqspfView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spRqspfView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spRqspfText: {
    fontSize: 14.0,
    color: '#3c3e45',
  },
  lottResCnBf_spBfView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottResCnBfView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottResCnBfText: {
    fontSize: 14.0,
    color: '#3c3e45',
  },
  spBfView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spBfViewText: {
    fontSize: 14.0,
    color: '#3c3e45',
  },
  lottResCnZjq_spZjqView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottResCnZjqView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottResCnZjqText: {
    fontSize: 14.0,
    color: '#3c3e45',
  },
  spZjqView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spZjqText: {
    fontSize: 14.0,
    color: '#3c3e45',
  },
  lottResCnBqc_spBqcView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottResCnBqcView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottResCnBqcText: {
    fontSize: 14.0,
    color: '#3c3e45',
  },
  spBqcView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spBqcText: {
    fontSize: 14.0,
    color: '#3c3e45',
  },
  arrowView: {// 箭头
    alignItems: 'center',
    justifyContent: 'center',
    width: GlobalConstants.ScreenWidth * 0.1,
  },
});
export default class HistoryListJCZQCell extends BaseComponent {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.isCancle = this.isCancle.bind(this);
  }
  getMatchResult() {
    if (this.props.rowData.finalHostScore > this.props.rowData.finalGuestScore) {
      return 'win';
    }
    if (this.props.rowData.finalHostScore === this.props.rowData.finalGuestScore) {
      return 'draw';
    }
    if (this.props.rowData.finalHostScore < this.props.rowData.finalGuestScore) {
      return 'lose';
    }
    return '';
  }

  getScoreTextColor() {
    if (this.getMatchResult() === 'win') {
      return '#f54354';
    } else if (this.getMatchResult() === 'lose') {
      return '#40bb0a';
    } else if (this.getMatchResult() === 'draw') {
      return '#5297f6';
    }
    return '#3c3e45';
  }

  getScoreText() {
    if (this.isCancle()) {
      return (
        <Text style={{ fontSize: 15, color: '#3c3e45' }}>
          取消
          </Text>
      );
    }
    return (
      <Text style={{ fontSize: 18, color: this.getScoreTextColor() }}>
        {`${this.props.rowData.finalHostScore}:${this.props.rowData.finalGuestScore}`}
      </Text>
    );
  }

  getHalfScoreText() {
    if (this.isCancle()) {
      return (
        null
      );
    }
    return (
      <Text style={styles.halfScoreText}>
        {`半 ${this.props.rowData.halfHostScore}:${this.props.rowData.halfGuestScore}`}
      </Text>
    );
  }

  getLotterInfoArea() {
    if (this.isCancle()) {
      return (
        <View>
          <Text style={{ fontSize: 14, color: '#3c3e45' }}>
            选项全算对，赔率按1.0计算
           </Text>
        </View>
      );
    }
    return (
      <View style={styles.lotterInfoAreaView}>
        <View style={styles.lottResCnSpf_SpSpfView}>
          <View style={styles.lottResCnSpfView}>
            {
              this.isCancle()
                ?
                null
                :
                <Text style={styles.lottResCnSpfText}>
                  {this.props.rowData.lottResCnSpf}
                </Text>

            }
          </View>
          <View style={styles.spSpfView}>
            {
              this.isCancle()
                ?
                null
                :
                <Text style={styles.lottSpSpfText}>
                  {this.props.rowData.spSpf}
                </Text>

            }
          </View>
        </View>
        <View style={styles.lottResCnRqspf_spRqspfView}>
          <View style={styles.lottResCnRqspfView}>
            {
              this.isCancle()
                ?
                null
                :
                <Text style={styles.lottResCnRqspfText}>
                  {this.props.rowData.lottResCnRqspf}
                </Text>

            }
          </View>
          <View style={styles.spRqspfView}>
            {
              this.isCancle()
                ?
                null
                :
                <Text style={styles.spRqspfText}>
                  {this.props.rowData.spRqspf}
                </Text>

            }
          </View>
        </View>
        <View style={styles.lottResCnBf_spBfView}>
          <View style={styles.lottResCnBfView}>
            {
              this.isCancle()
                ?
                null
                :
                <Text style={styles.lottResCnBfText}>
                  {this.props.rowData.lottResCnBf}
                </Text>

            }
          </View>
          <View style={styles.spBfView}>
            {
              this.isCancle()
                ?
                null
                :
                <Text style={styles.spBfViewText}>
                  {this.props.rowData.spBf}
                </Text>

            }
          </View>
        </View>
        <View style={styles.lottResCnZjq_spZjqView}>
          <View style={styles.lottResCnZjqView}>
            {
              this.isCancle()
                ?
                null
                :
                <Text style={styles.lottResCnZjqText}>
                  {this.props.rowData.lottResCnZjq}
                </Text>

            }
          </View>
          <View style={styles.spZjqView}>
            {
              this.isCancle()
                ?
                null
                :
                <Text style={styles.spZjqText}>
                  {this.props.rowData.spZjq}
                </Text>

            }
          </View>
        </View>
        <View style={styles.lottResCnBqc_spBqcView}>
          <View style={styles.lottResCnBqcView}>
            {
              this.isCancle()
                ?
                null
                :
                <Text style={styles.lottResCnBqcText}>
                  {this.props.rowData.lottResCnBqc}
                </Text>

            }
          </View>
          <View style={styles.spBqcView}>
            {
              this.isCancle()
                ?
                null
                :
                <Text style={styles.spBqcText}>
                  {this.props.rowData.spBqc}
                </Text>
            }
          </View>
        </View>
      </View>);
  }

  isCancle() {
    if (this.props.rowData.lottResCnSpf === '取消' ||
      this.props.rowData.lottResCnRqspf === '取消' ||
      this.props.rowData.lottResCnBf === '取消' ||
      this.props.rowData.lottResCnBqc === '取消' ||
      this.props.rowData.lottResCnZjq === '取消' ||
      this.props.rowData.lottResCnSf === '取消' ||
      this.props.rowData.lottResCnRfsf === '取消' ||
      this.props.rowData.lottResCnDxf === '取消' ||
      this.props.rowData.lottResCnSfc === '取消'
    ) {
      return true;
    }
    return false;
  }

  render() {
    const route = () => {
      NativeModules.LDRNBridge.routeWithURL(`rrzcp://live?g=jczq&mid=${this.props.rowData.mid}&hid=${this.props.rowData.hostId}&vid=${this.props.rowData.guestId}&showBetButton=1&index=0`, {});
    };
    return (
      <TouchableOpacity activeOpacity={1.0} style={styles.rootTouchableOpacity} onPress={route}>
        <View style={styles.infoView}>
          <View style={styles.gameInfoView}>
            <View style={styles.gameResultView}>
              <View style={styles.gameLeagueInfoView}>
                <View style={styles.gameLeagueNameView}>
                  <Text style={styles.gameLeagueNameText}>
                    {this.props.rowData.league}
                  </Text>
                </View>
                <View style={styles.matchNum_StartTimeView}>
                  <Text style={styles.matchNumText}>
                    {this.props.rowData.matchNumCn.startsWith('周') ? this.props.rowData.matchNumCn.substr(2) : this.props.rowData.matchNumCn}
                  </Text>
                  <Text style={styles.startTimeText}>
                    {this.props.rowData.startTime}
                  </Text>
                </View>
              </View>
              <View style={styles.hostNameView}>
                <Text style={styles.hostNameText}>
                  {this.props.rowData.hostName}
                </Text>
              </View>
              <View style={styles.allScoreView}>
                <View style={styles.resultScoreView}>
                  {this.getScoreText()}
                </View>
                <View style={styles.halfScoreView}>
                  {this.getHalfScoreText()}
                </View>
              </View>
              <View style={styles.guestNameView}>
                <Text style={styles.guestNameText}>
                  {this.props.rowData.guestName}
                </Text>
              </View>
            </View>
            <View
              style={{
                height: GlobalConstants.onePixel,
                width: GlobalConstants.ScreenWidth * 0.9,
                backgroundColor: lineColor,
              }}
            />
            {this.getLotterInfoArea()}
          </View>
          <View style={styles.arrowView}>
            <Image source={require('../../../images/historyCellArrow.png')} />
          </View>
        </View>
        <View
          style={{
            height: GlobalConstants.onePixel,
            width: GlobalConstants.ScreenWidth,
            backgroundColor: lineColor,
          }}
        />
      </TouchableOpacity>
    );
  }
}
