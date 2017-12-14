import React from "react";
import {View, Text} from "react-native";
import {connect} from "react-redux";
import SSQCell from "../../components/TabHistoryCells/ssqcell";
import DLTCell from "../../components/TabHistoryCells/dltcell";
import SYXWCell from "../../components/TabHistoryCells/syxwcell";
import PL3Cell from "../../components/TabHistoryCells/pl3cell";
import PL5Cell from "../../components/TabHistoryCells/pl5cell";
import KLSFCell from "../../components/TabHistoryCells/klsfcell";
import QXCCell from "../../components/TabHistoryCells/qxccell";
import QLCCell from "../../components/TabHistoryCells/qlccell";
import SSCCell from "../../components/TabHistoryCells/ssccell";
import X3DCell from "../../components/TabHistoryCells/x3dcell";
import KUAI3Cell from "../../components/TabHistoryCells/kuai3cell";
import SFCCell from "../../components/TabHistoryCells/sfccell";
import KLPKCell from "../../components/TabHistoryCells/klpkcell";
import KL8Cell from "../../components/TabHistoryCells/kl8cell";
import JCZQCell from "../../components/TabHistoryCells/jczqcell";
import JCLQCell from "../../components/TabHistoryCells/jclqcell";
import SFGGCell from "../../components/TabHistoryCells/sfggcell";
import ZQDCCell from "../../components/TabHistoryCells/zqdccell";
import CommonNaviBar from "../../components/Views/CommonNaviBar";
import HistoryawardsPushSettingsView from "../../components/Views/HistoryawardsPushSettingsView";
import * as TabHistoryHallActions from "../../actions/history/TabHall";
import LDCPHistoryScrollView from "../../components/Views/LDCPHistoryScrollView";
import BaseComponent from "../../components/Views/BaseComponent";
import HallNoticeView from "../../components/Views/HallNoticeView";
import PropTypes from "prop-types";
import Immutable from 'immutable';
class TabHistoryHall extends BaseComponent {
    static navigationOptions = {
        tabBarLabel: '开奖',
    };

    static propTypes = {
        isRefreshing: PropTypes.bool,
        awardInfo: PropTypes.array,
        gameEnArray: PropTypes.array,
        awardInfoNew: PropTypes.object,
        refreshAction: PropTypes.func.isRequired,
        getAwardHomeAction: PropTypes.func.isRequired,
        getRefreshDataAction: PropTypes.func.isRequired,
    };

    static defaultProps = {
        isRefreshing: false,
        awardInfo: [],
        gameEnArray: [],
        awardInfoNew: {},
    };

    constructor(props) {
        super(props);
        this.onRefresh = this.onRefresh.bind(this);
    }

    componentDidMount() {
        this.props.refreshAction();
        this.props.getAwardHomeAction();
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isRefreshing) {
            this.scrollView.endRefresh();
        }
    }

    onRefresh() {
        this.props.getRefreshDataAction();
    }

    findDataByGameEn(gameEn) {
        if (this.props.awardInfo.length > 0) {
            for (let i = 0; i < this.props.awardInfo.length; i += 1) {
                if (this.props.awardInfo[i].gameEn === gameEn) {
                    return this.props.awardInfo[i];
                }
            }
        }
        return {};
    }

    renderNotice() {
        if (this.props.awardRankArray && this.props.awardRankArray.length > 0) {
            return (
                <View>
                    <HallNoticeView notices={this.props.awardRankArray}/>
                    <View style={{height: 10, backgroundColor: '#F4F4F4'}}/>
                </View>
            );
        }
        return null;
    }

    renderContent() {
        if (this.props.gameEnArray && this.props.gameEnArray.length > 0) {
            return (
                <View>
                    {this.props.gameEnArray.map((gameEn, index) => {
                        if (index < this.props.gameEnArray.length - 1) {
                            return (<View key={gameEn}
                                          style={{backgroundColor: 'white'}}>{this.renderCell(gameEn, index)}<View
                                style={{marginLeft: 15, height: 1, backgroundColor: '#ECECEC'}}/></View>);
                        }

                        return this.renderCell(gameEn, index);
                    })}
                </View>
            );
        }
        return null;
    }

    renderCell(gameEn, index) {
        if (gameEn === 'ssq') {
            return (
                <SSQCell
                    key={index}
                    awardNo={this.findDataByGameEn(gameEn).awardNo}
                    awardTime={this.findDataByGameEn(gameEn).awardTime}
                    periodName={this.findDataByGameEn(gameEn).periodName}
                    gameEn={gameEn}
                    cellStyle="tabHall"
                />);
        } else if (gameEn === 'dlt') {
            return (
                <DLTCell
                    key={index}
                    awardNo={this.findDataByGameEn(gameEn).awardNo}
                    awardTime={this.findDataByGameEn(gameEn).awardTime}
                    periodName={this.findDataByGameEn(gameEn).periodName}
                    gameEn={gameEn}
                    cellStyle="tabHall"
                />);
        } else if (gameEn === 'd11' || gameEn === 'jxd11' || gameEn === 'hljdd11' || gameEn === 'lnd11' || gameEn === 'gdd11' || gameEn === 'zjd11' || gameEn === 'hljd11' || gameEn === 'cqd11') {
            return (
                <SYXWCell
                    key={index}
                    gameEn={gameEn}
                    awardNo={this.findDataByGameEn(gameEn).awardNo}
                    awardTime={this.findDataByGameEn(gameEn).awardTime}
                    periodName={this.findDataByGameEn(gameEn).periodName}
                    cellStyle="tabHall"
                />);
        } else if (gameEn === 'pl3') {
            return (
                <PL3Cell
                    key={index}
                    awardNo={this.findDataByGameEn(gameEn).awardNo}
                    awardTime={this.findDataByGameEn(gameEn).awardTime}
                    periodName={this.findDataByGameEn(gameEn).periodName}
                    gameEn={gameEn}
                />);
        } else if (gameEn === 'pl5') {
            return (
                <PL5Cell
                    key={index}
                    awardNo={this.findDataByGameEn(gameEn).awardNo}
                    awardTime={this.findDataByGameEn(gameEn).awardTime}
                    periodName={this.findDataByGameEn(gameEn).periodName}
                    gameEn={gameEn}
                />);
        } else if (gameEn === 'kl10') {
            return (
                <KLSFCell
                    key={index}
                    awardNo={this.findDataByGameEn(gameEn).awardNo}
                    awardTime={this.findDataByGameEn(gameEn).awardTime}
                    periodName={this.findDataByGameEn(gameEn).periodName}
                    gameEn={gameEn}
                />);
        } else if (gameEn === 'qxc') {
            return (
                <QXCCell
                    key={index}
                    awardNo={this.findDataByGameEn(gameEn).awardNo}
                    awardTime={this.findDataByGameEn(gameEn).awardTime}
                    periodName={this.findDataByGameEn(gameEn).periodName}
                    gameEn={gameEn}
                />);
        } else if (gameEn === 'qlc') {
            return (
                <QLCCell
                    key={index}
                    awardNo={this.findDataByGameEn(gameEn).awardNo}
                    awardTime={this.findDataByGameEn(gameEn).awardTime}
                    periodName={this.findDataByGameEn(gameEn).periodName}
                    gameEn={gameEn}
                />);
        } else if (gameEn === 'ssc' || gameEn === 'jxssc') {
            return (
                <SSCCell
                    key={index}
                    gameEn={gameEn}
                    awardNo={this.findDataByGameEn(gameEn).awardNo}
                    awardTime={this.findDataByGameEn(gameEn).awardTime}
                    periodName={this.findDataByGameEn(gameEn).periodName}
                    cellStyle="tabHall"
                />);
        } else if (gameEn === 'x3d') {
            return (
                <X3DCell
                    key={index}
                    extra={this.findDataByGameEn(gameEn).extra}
                    awardNo={this.findDataByGameEn(gameEn).awardNo}
                    awardTime={this.findDataByGameEn(gameEn).awardTime}
                    periodName={this.findDataByGameEn(gameEn).periodName}
                    gameEn={gameEn}
                    cellStyle="tabHall"
                />);
        } else if (gameEn === 'kuai3' || gameEn === 'nmgkuai3' || gameEn === 'ahkuai3' || gameEn === 'gxkuai3' || gameEn === 'oldkuai3' || gameEn === 'hbkuai3') {
            return (
                <KUAI3Cell
                    key={index}
                    gameEn={gameEn}
                    awardNo={this.findDataByGameEn(gameEn).awardNo}
                    awardTime={this.findDataByGameEn(gameEn).awardTime}
                    periodName={this.findDataByGameEn(gameEn).periodName}
                    cellStyle="tabHall"
                />);
        } else if (gameEn === 'football_sfc') {
            return (
                <SFCCell
                    key={index}
                    gameEn={gameEn}
                    awardNo={this.findDataByGameEn(gameEn).awardNo}
                    awardTime={this.findDataByGameEn(gameEn).awardTime}
                    periodName={this.findDataByGameEn(gameEn).periodName}
                    cellStyle="tabHall"
                />);
        } else if (gameEn === 'klpk') {
            return (
                <KLPKCell
                    key={index}
                    awardNo={this.findDataByGameEn(gameEn).awardNo}
                    awardTime={this.findDataByGameEn(gameEn).awardTime}
                    periodName={this.findDataByGameEn(gameEn).periodName}
                    gameEn={gameEn}
                />);
        } else if (gameEn === 'kl8') {
            return (
                <KL8Cell
                    key={index}
                    awardNo={this.findDataByGameEn(gameEn).awardNo}
                    awardTime={this.findDataByGameEn(gameEn).awardTime}
                    periodName={this.findDataByGameEn(gameEn).periodName}
                    gameEn={gameEn}
                />);
        } else if (gameEn === 'jczq') {
            return (
                <JCZQCell
                    key={index}
                    matchItem={this.props.awardInfoNew.jczq}
                    gameEn={gameEn}
                />);
        } else if (gameEn === 'jclq') {
            return (
                <JCLQCell
                    key={index}
                    matchItem={this.props.awardInfoNew.jclq}
                    gameEn={gameEn}
                />);
        } else if (gameEn === 'dcsfgg') {
            return (
                <SFGGCell
                    key={index}
                    matchItem={this.props.awardInfoNew.dcsfgg}
                    gameEn={gameEn}
                />);
        } else if (gameEn === 'dcspf') {
            return (
                <ZQDCCell
                    key={index}
                    matchItem={this.props.awardInfoNew.dcspf}
                    gameEn={gameEn}
                />);
        }
        return (
            <View
                key={index}
                style={{
                    height: 87,
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            />);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <CommonNaviBar middleTitle="开奖信息" leftHidden rightView={<HistoryawardsPushSettingsView />}/>
                <LDCPHistoryScrollView
                    ref={(ref) => {
                        this.scrollView = ref;
                    }}
                    automaticallyAdjustContentInsets={false}
                    horizontal={false}
                    onRefresh={this.onRefresh}
                    isRefreshing={this.props.isRefreshing}
                >
                    {this.renderNotice()}
                    {this.renderContent()}
                </LDCPHistoryScrollView>
            </View>
        );
    }
}

// 选择store中的state注入props
function mapStateToProps(store) {
    //const store = Immutable.toJS();
    var tabHistoryHallReducer = store.tabHistoryHallReducer.toJS();

    console.log(JSON.stringify(tabHistoryHallReducer.isRefreshing));
    return {
        isRefreshing: tabHistoryHallReducer.isRefreshing,
        awardInfo: tabHistoryHallReducer.awardInfo,
        awardInfoNew: tabHistoryHallReducer.awardInfoNew,
        gameEnArray: tabHistoryHallReducer.gameEnArray,
        awardRankArray: tabHistoryHallReducer.awardRankArray,
    };
}

// 选择注入到prop中的回调方法
function mapDispatchToProps(dispatch) {
    return {
        refreshAction: () => dispatch(TabHistoryHallActions.refreshAction()),
        getAwardHomeAction: () => dispatch(TabHistoryHallActions.getAwardHomeAction()),
        getRefreshDataAction: () => dispatch(TabHistoryHallActions.getRefreshDataAction()),
    };
}

// 生成容器组件TabHistoryHall
export default connect(mapStateToProps, mapDispatchToProps)(TabHistoryHall);
