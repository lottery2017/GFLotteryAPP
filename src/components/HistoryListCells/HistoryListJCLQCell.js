import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    NativeModules,
} from 'react-native';
import PropTypes from 'prop-types';
import BaseComponent from '../Views/BaseComponent';
import * as GlobalConstants from '../../utils/GlobalConstants';

const lineColor = '#ececec';
const styles = StyleSheet.create({
    rootTouchableOpacity: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    infoView: {
        backgroundColor: '#F9F8F0',
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
        alignItems: 'flex-start',
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
        alignItems: 'flex-end',
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

    lottResCnSf_spSfView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottResCnSfView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    spSfView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottspSfView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottResCnSfText: {
        fontSize: 14.0,
        color: '#3c3e45',
    },
    spSpfText: {
        fontSize: 14.0,
        color: '#3c3e45',
    },
    lottResCnRfsf_spRfsfView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottResCnRfsfText: {
        fontSize: 14.0,
        color: '#3c3e45',
    },
    lottResCnRfsfView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    spRfsfView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    spRfsfText: {
        fontSize: 14.0,
        color: '#3c3e45',
    },
    lottResCnDxf_spDxfView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottResCnDxfView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottResCnDxfText: {
        fontSize: 14.0,
        color: '#3c3e45',
    },
    spDxfView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    spDxfText: {
        fontSize: 14.0,
        color: '#3c3e45',
    },
    lottResCnSfc_spSfcView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottResCnSfcView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottResCnSfcText: {
        fontSize: 14.0,
        color: '#3c3e45',
    },
    spSfcView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    spSfcText: {
        fontSize: 14.0,
        color: '#3c3e45',
    },
    arrowView: {// 箭头
        alignItems: 'center',
        justifyContent: 'center',
        width: GlobalConstants.ScreenWidth * 0.1,
    },
});
export default class HistoryListJCLQCell extends BaseComponent {
    static propTypes = {
        rowData: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.isCancle = this.isCancle.bind(this);
    }

    getMatchResult() {
        if (Number(this.props.rowData.hostScore) > Number(this.props.rowData.guestScore)) {
            return 'win';
        }
        if (Number(this.props.rowData.hostScore) === Number(this.props.rowData.guestScore)) {
            return 'draw';
        }
        if (Number(this.props.rowData.hostScore) < Number(this.props.rowData.guestScore)) {
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
                <Text style={{fontSize: 15, color: '#3c3e45'}}>
                    取消
                </Text>
            );
        }
        return (
            <Text style={{fontSize: 18, color: this.getScoreTextColor()}}>
                {`${this.props.rowData.guestScore}:${this.props.rowData.hostScore}`}
            </Text>
        );
    }

    getScoreResultText() {
        if (this.isCancle()) {
            return (
                null
            );
        }
        return (
            <Text style={styles.halfScoreText}>
                {`总分${(parseInt(this.props.rowData.guestScore, 0) + parseInt(this.props.rowData.hostScore, 0))} 分差${(parseInt(this.props.rowData.hostScore, 0) - parseInt(this.props.rowData.guestScore, 0))}`}
            </Text>
        );
    }

    getLotterInfoArea() {
        if (this.isCancle()) {
            return (
                <View>
                    <Text style={{fontSize: 14, color: '#3c3e45'}}>
                        选项全算对，赔率按1.0计算
                    </Text>
                </View>
            );
        }
        return (
            <View style={styles.lotterInfoAreaView}>
                <View style={styles.lottResCnSf_spSfView}>
                    <View style={styles.lottResCnSfView}>
                        {
                            this.isCancle()
                                ?
                                null
                                :
                                <Text style={styles.lottResCnSfText}>
                                    {this.props.rowData.lottResCnSf}
                                </Text>

                        }
                    </View>
                    <View style={styles.spSfView}>
                        {
                            this.isCancle()
                                ?
                                null
                                :
                                <Text style={styles.spSfText}>
                                    {this.props.rowData.spSf}
                                </Text>

                        }
                    </View>
                </View>
                <View style={styles.lottResCnRfsf_spRfsfView}>
                    <View style={styles.lottResCnRfsfView}>
                        {
                            this.isCancle()
                                ?
                                null
                                :
                                <Text style={styles.lottResCnRfsfText}>
                                    {this.props.rowData.lottResCnRfsf}
                                </Text>

                        }
                    </View>
                    <View style={styles.spRfsfView}>
                        {
                            this.isCancle()
                                ?
                                null
                                :
                                <Text style={styles.spRfsfText}>
                                    {this.props.rowData.spRfsf}
                                </Text>

                        }
                    </View>
                </View>
                <View style={styles.lottResCnDxf_spDxfView}>
                    <View style={styles.lottResCnDxfView}>
                        {
                            this.isCancle() ? null :
                                <Text style={styles.lottResCnDxfText}>
                                    {this.props.rowData.lottResCnDxf}
                                </Text>
                        }
                    </View>
                    <View style={styles.spDxfView}>
                        {this.isCancle() ? null :
                            <Text style={styles.spDxfText}>
                                {this.props.rowData.spDxf}
                            </Text>
                        }
                    </View>
                </View>
                <View style={styles.lottResCnSfc_spSfcView}>
                    <View style={styles.lottResCnSfcView}>
                        {
                            this.isCancle() ? null :
                                <Text style={styles.lottResCnSfcText}>
                                    {this.props.rowData.lottResCnSfc}
                                </Text>
                        }
                    </View>
                    <View style={styles.spSfcView}>
                        {
                            this.isCancle() ? null :
                                <Text style={styles.spSfcText}>
                                    {this.props.rowData.spSfc}
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

    route() {
        NativeModules.LDRNBridge.routeWithURL(`rrzcp://live?g=jclq&mid=${this.props.rowData.mid}&hid=${this.props.rowData.hostId}&vid=${this.props.rowData.guestId}&showBetButton=1&index=0`, {});
    }

    render() {
        const route = () => {
            NativeModules.LDRNBridge.routeWithURL(`rrzcp://live?g=jclq&mid=${this.props.rowData.mid}&hid=${this.props.rowData.hostId}&vid=${this.props.rowData.guestId}&showBetButton=1&index=0`, {});
        };
        const totalString = `总分${(parseInt(this.props.rowData.guestScore, 0) + parseInt(this.props.rowData.hostScore, 0))} 分差${(parseInt(this.props.rowData.hostScore, 0) - parseInt(this.props.rowData.guestScore, 0))}`;
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
                            <View style={styles.guestNameView}>
                                <Text style={styles.guestNameText}>
                                    {this.props.rowData.guestName}
                                </Text>
                            </View>
                            <View style={[styles.allScoreView, {width: totalString.length * 11}]}>
                                <View style={styles.resultScoreView}>
                                    {this.getScoreText()}
                                </View>
                                <View style={styles.halfScoreView}>
                                    {this.getScoreResultText()}
                                </View>
                            </View>
                            <View style={styles.hostNameView}>
                                <Text style={styles.hostNameText}>
                                    {this.props.rowData.hostName}
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
                        <Image source={require('../../../images/historyCellArrow.png')}/>
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
