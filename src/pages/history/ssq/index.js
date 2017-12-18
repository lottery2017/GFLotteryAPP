import React from 'react';
import {View, ListView, NativeModules, NativeEventEmitter,FlatList} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import SSQCell from '../../../components/TabHistoryCells/ssqcell';
import * as SSQListActions from '../../../actions/history/ssq';
import HistoryListHeader from '../../../components/HistoryListHeader/HistoryListHeader';
import LotteryToolBar from '../../../components/Views/LotteryToolBar';
import {LoadMoreStatus} from '../../../components/Views/LDRLScroll/LDLoadMoreRefresh';
import LDCPHistoryListView from '../../../components/Views/LDCPHistoryListView';
import BaseComponent from '../../../components/Views/BaseComponent';
import CommonStyles from "../../../styles/CommonStyles";

class SSQHistoryList extends BaseComponent {
    static propTypes = {
        gameEn: PropTypes.string,
        isRefreshing: PropTypes.bool,
        historyItems: PropTypes.array,
        hasNextPage: PropTypes.bool,
        isEmpty: PropTypes.bool,
        headerLabelString: PropTypes.string,
        refreshAction: PropTypes.func.isRequired,
        getLatestTwentyAwards: PropTypes.func.isRequired,
        getHeaderLabelString: PropTypes.func.isRequired,
        clearData: PropTypes.func.isRequired,
        getNextPageAwards: PropTypes.func.isRequired,
    };

    static defaultProps = {
        isRefreshing: false,
        historyItems: [],
        hasNextPage: false,
        headerLabelString: '',
        isEmpty: true,
    };

    constructor(props) {
        super(props);
        this.functionBindThis();
        this.state=({
            gameEn:this.props.navigation.state.params.gameEn,
            periodName:this.props.navigation.state.params.periodName,
        })
    }

    componentDidMount() {
        this.myModuleEvt = new NativeEventEmitter(NativeModules.LDRNEventEmitter).addListener('LDRN_SET_AWARD_PUSH', () => {
                this.props.getHeaderLabelString(this.state.gameEn);
            },
        );
        this.props.refreshAction();
        this.props.getLatestTwentyAwards(this.state.gameEn,this.state.periodName);
        this.props.getHeaderLabelString(this.state.gameEn);
    }

    componentWillReceiveProps(nextProps) {
       /* if (!nextProps.isRefreshing) {
            this.listView.endRefresh();
        }
        if (nextProps.historyItems.length > 0) {
            this.listView.setLoadMoreStatus(LoadMoreStatus.idle);
        }*/
    }

    componentWillUnmount() {
        if (this.myModuleEvt) {
            this.myModuleEvt.remove();
        }
        this.props.clearData();
    }

    // 下拉刷新
    onRefresh() {
        this.props.getLatestTwentyAwards(this.state.gameEn,this.state.periodName);
    }

    // 上拉加载更多
    onEndReached() {
        if (this.props.hasNextPage && this.props.historyItems && this.props.historyItems.length !== 0) {
            this.props.getNextPageAwards(
                this.state.gameEn,
                this.props.historyItems[this.props.historyItems.length - 1].periodName,
            );
        }
    }

    functionBindThis() {
        this.onEndReached = this.onEndReached.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    renderRow({item,index}) {
        return (
            <SSQCell gameEn={this.state.gameEn} rowData={item} row={index}
                     cellStyle="historyList"/>
        );
    }

    renderHeader() {
        return (
            <HistoryListHeader headerLabelString={this.props.headerLabelString}/>
        );
    }
    _keyExtractor = (item, index) => item.index;
    _separator = () => {
        return (<View style={CommonStyles.lineStyle}/>)
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={this.props.historyItems}
                    keyExtractor={this._keyExtractor}
                    onRefresh={this.onRefresh}
                    onEndReached={this.onEndReached}
                    refreshing={this.props.isRefreshing}
                    renderItem={this.renderRow.bind(this)}/>

                    {/*isShowLoadMore={this.props.hasNextPage}*/}
                <LotteryToolBar gameEn={this.state.gameEn}/>
            </View>
        );
    }
}

// 选择store中的state注入props
function mapStateToProps(store) {
    const SSQHistoryListReducer = store.SSQHistoryListReducer.toJS();
    return {
        isRefreshing: SSQHistoryListReducer.isRefreshing,
        historyItems: SSQHistoryListReducer.historyItems,
        headerLabelString: SSQHistoryListReducer.headerLabelString,
        hasNextPage: SSQHistoryListReducer.hasNextPage,
        isEmpty: SSQHistoryListReducer.isEmpty,
    };
}

// 选择注入到prop中的回调方法
function mapDispatchToProps(dispatch) {
    return {
        refreshAction: () => dispatch(SSQListActions.refreshAction()),
        getLatestTwentyAwards: (gameEn,periodName) => dispatch(SSQListActions.getRefreshDataAction(gameEn,periodName)),
        getNextPageAwards: (gameEn, lastPeriod) => dispatch(SSQListActions.getNextPageAwardsAction(gameEn, lastPeriod)),
        getHeaderLabelString: gameEn => dispatch(SSQListActions.getHeaderLabelStringAction(gameEn)),
        clearData: () => dispatch(SSQListActions.clearDataAction()),
    };
}

// 生成容器组件SSQHistoryList
export default connect(mapStateToProps, mapDispatchToProps)(SSQHistoryList);
