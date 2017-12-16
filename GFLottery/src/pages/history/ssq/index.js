import React from 'react';
import {View, ListView, NativeModules, NativeEventEmitter} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import SSQCell from '../../../components/TabHistoryCells/ssqcell';
import * as SSQListActions from '../../../actions/history/ssq';
import HistoryListHeader from '../../../components/HistoryListHeader/HistoryListHeader';
import LotteryToolBar from '../../../components/Views/LotteryToolBar';
import CommonNaviBar from '../../../components/Views/CommonNaviBar';
import {LoadMoreStatus} from '../../../components/Views/LDRLScroll/LDLoadMoreRefresh';
import LDCPHistoryListView from '../../../components/Views/LDCPHistoryListView';
import BaseComponent from '../../../components/Views/BaseComponent';

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
            gameEn:this.props.navigation.state.params.gameEn
        })
    }

    componentDidMount() {
        this.myModuleEvt = new NativeEventEmitter(NativeModules.LDRNEventEmitter).addListener('LDRN_SET_AWARD_PUSH', () => {
                this.props.getHeaderLabelString(this.state.gameEn);
            },
        );
        this.props.refreshAction();
        this.props.getLatestTwentyAwards(this.state.gameEn);
        this.props.getHeaderLabelString(this.state.gameEn);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isRefreshing) {
            this.listView.endRefresh();
        }
        if (nextProps.historyItems.length > 0) {
            this.listView.setLoadMoreStatus(LoadMoreStatus.idle);
        }
    }

    componentWillUnmount() {
        if (this.myModuleEvt) {
            this.myModuleEvt.remove();
        }
        this.props.clearData();
    }

    // 下拉刷新
    onRefresh() {
        this.props.getLatestTwentyAwards(this.state.gameEn);
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

    renderRow(rowData, sectionID, rowID) {
        return (
            <SSQCell gameEn={this.state.gameEn} rowData={rowData} row={rowID}
                     cellStyle="historyList"/>
        );
    }

    renderHeader() {
        return (
            <HistoryListHeader headerLabelString={this.props.headerLabelString}/>
        );
    }

    render() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const {historyItems} = this.props;
        return (
            <View style={{flex: 1}}>
                <LDCPHistoryListView
                    ref={(ref) => {
                        this.listView = ref;
                    } }
                    renderRow={this.renderRow}
                    dataSource={ds.cloneWithRows(historyItems)}
                    automaticallyAdjustContentInsets={false}
                    horizontal={false}
                    onRefresh={this.onRefresh}
                    onLoadMore={this.onEndReached}
                    isShowLoadMore={this.props.hasNextPage}
                    enableEmptySections
                    renderHeader={this.renderHeader}
                    empty={this.props.isEmpty}
                    isRefreshing={this.props.isRefreshing}
                />
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
        getLatestTwentyAwards: gameEn => dispatch(SSQListActions.getRefreshDataAction(gameEn)),
        getNextPageAwards: (gameEn, lastPeriod) => dispatch(SSQListActions.getNextPageAwardsAction(gameEn, lastPeriod)),
        getHeaderLabelString: gameEn => dispatch(SSQListActions.getHeaderLabelStringAction(gameEn)),
        clearData: () => dispatch(SSQListActions.clearDataAction()),
    };
}

// 生成容器组件SSQHistoryList
export default connect(mapStateToProps, mapDispatchToProps)(SSQHistoryList);
