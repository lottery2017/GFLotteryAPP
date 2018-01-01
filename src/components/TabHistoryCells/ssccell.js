import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    NativeModules,
    Dimensions,
    ImageBackground
} from 'react-native';
import * as GlobalHelper from '../../utils/GlobalHelper';
import * as helper from './helper';
import BaseComponent from '../Views/BaseComponent';
import PropTypes from 'prop-types';
const SCREEN_WIDTH = Dimensions.get('window').width;
const X_SCALE = SCREEN_WIDTH / 320.0;
const LINE_HEIGHT = 1;

const styles = StyleSheet.create({
    wrapper: {flex: 1},
    ball: {width: 31 * X_SCALE, height: 31 * X_SCALE, marginRight: 3.5, alignItems: 'center', justifyContent: 'center'},
    text: {backgroundColor: 'transparent', color: 'white', fontSize: 18},
    whiteText: {backgroundColor: 'transparent', color: 'white', fontSize: 18},
    redText: {backgroundColor: 'transparent', color: 'red', fontSize: 18},
});
export default class SSCCell extends BaseComponent {
    static propTypes = {
        gameEn: PropTypes.string.isRequired,
        awardNo: PropTypes.string,
        awardTime: PropTypes.string,
        periodName: PropTypes.string,
        cellStyle: PropTypes.oneOf(['tabHall', 'historyList', 'detail']).isRequired,
        // 列表页需要
        row: PropTypes.number,
        rowData: PropTypes.object,
    };
    static defaultProps = {
        gameEn: 'ssc',
        awardNo: '',
        awardTime: '',
        periodName: '',
        // 列表页需要
        row: 0,
        rowData: null,
    };

    render() {
        const getPeriodString = (awardTime, periodName) => {
            if (awardTime && periodName) {
                return helper.getPeriodTimeString(awardTime, periodName);
            }
            return '';
        };
        const getAwardNoArray = (awardNo) => {
            const numbers = awardNo.split(' ');
            return numbers;
        };
        const getAwardDescription = (rowNumerString) => {
            const getNumberDescription = (number) => {
                if (number >= 5) {
                    return number % 2 ? '大单' : '大双';
                }
                return number % 2 ? '小单' : '小双';
            };
            const number1 = getAwardNoArray(rowNumerString)[3];
            const number2 = getAwardNoArray(rowNumerString)[4];
            return `${getNumberDescription(Number(number1))}|${getNumberDescription(Number(number2))}`;
        };
        if (this.props.cellStyle === 'tabHall') {
            const awardNoArr = getAwardNoArray(this.props.awardNo);
            if (this.props.awardNo) {
                return (
                    <TouchableOpacity activeOpacity={1.0} onPress={this.props.onPress} style={{
                        height: 87 * X_SCALE,
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{height: 87 * X_SCALE, justifyContent: 'space-between'}}>
                            <View style={{marginTop: 15, flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{marginLeft: 15, fontSize: 16}}>{GlobalHelper
                                    .getCNNameFor(this.props.gameEn)}</Text>
                                <Text style={{
                                    marginLeft: 5,
                                    fontSize: 12,
                                    color: '#aaaaaa'
                                }}>{getPeriodString(this.props.awardTime, this.props.periodName)}</Text>
                            </View>
                            <View style={{
                                marginLeft: 15,
                                marginBottom: 10 * X_SCALE,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                {awardNoArr.map((number, index) => {
                                    const key = `${number} ${index}`;
                                    return (
                                        <ImageBackground key={key} style={styles.ball}
                                                         source={require('../../../images/redBall.png')}>
                                            <Text style={styles.text}>{number}</Text>
                                        </ImageBackground>);
                                })}
                                <Text style={{marginLeft: 10}}>{getAwardDescription(this.props.awardNo)}</Text>
                            </View>
                        </View>
                        <Image style={{marginRight: 15}} source={require('../../../images/historyCellArrow.png')}/>
                    </TouchableOpacity>
                );
            }
            return (
                <View style={{
                    height: 87 * X_SCALE,
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <View style={{height: 87 * X_SCALE, justifyContent: 'space-between'}}>
                        <View style={{marginTop: 15, flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{marginLeft: 15, fontSize: 16}}>{GlobalHelper
                                .getCNNameFor(this.props.gameEn)}</Text>
                            <Text style={{
                                marginLeft: 5,
                                fontSize: 12,
                                color: '#aaaaaa'
                            }}>{getPeriodString(this.props.awardTime, this.props.periodName)}</Text>
                        </View>
                        <View style={{marginLeft: 15, marginBottom: 20 * X_SCALE, flexDirection: 'row'}}>
                            <Text style={{fontSize: 16, color: '#ADADAD'}}>暂无开奖信息</Text>
                        </View>
                    </View>
                </View>
            );
        } else if (this.props.cellStyle === 'historyList') {
            const awardNoArr = getAwardNoArray(this.props.rowData.awardNo);
            const bgImage = this.props.row === 0 ? require('../../../images/redBall.png') : require('../../../images/transparencyBall.png');
            const textStyle = this.props.row === 0 ? styles.whiteText : styles.redText;
            if (this.props.rowData && this.props.rowData.awardNo) {
                return (
                    <View>
                        <TouchableOpacity activeOpacity={1.0} onPress={this.props.onPress} style={{
                            height: 87 * X_SCALE,
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <View style={{height: 87 * X_SCALE, justifyContent: 'space-between'}}>
                                <View style={{marginTop: 15, flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{
                                        marginLeft: 5,
                                        fontSize: 12,
                                        color: '#aaaaaa'
                                    }}>{getPeriodString(this.props.rowData.awardTime, this.props.rowData.periodName)}</Text>
                                </View>
                                <View style={{
                                    marginLeft: 15,
                                    marginBottom: 10 * X_SCALE,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    {awardNoArr.map((number, index) => {
                                        const key = `${number} ${index}`;
                                        return (
                                            <ImageBackground key={key} style={styles.ball} source={bgImage}>
                                                <Text style={textStyle}>{number}</Text>
                                            </ImageBackground>);
                                    })}
                                    <Text style={{marginLeft: 10}}>{getAwardDescription(this
                                        .props.rowData.awardNo)}</Text>
                                </View>
                            </View>
                            <Image style={{marginRight: 15}} source={require('../../../images/historyCellArrow.png')}/>
                        </TouchableOpacity>
                        <View style={{height: LINE_HEIGHT, width: SCREEN_WIDTH, backgroundColor: '#ececec'}}/>
                    </View>
                );
            }
        }
        return null;
    }
}

