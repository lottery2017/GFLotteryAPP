/**
 * 大乐透彩种二级页面
 */
import React from 'react';
import PropTypes from 'prop-types';
import {View, ListView, NativeModules, NativeEventEmitter} from 'react-native';
import {connect} from 'react-redux';
import X3DCell from '../../../components/TabHistoryCells/x3dcell';
import * as X3DListActions from '../../../actions/history/x3d';
import HistoryListHeader from '../../../components/HistoryListHeader/HistoryListHeader';
import LotteryToolBar from '../../../components/Views/LotteryToolBar';
import CommonNaviBar from '../../../components/Views/CommonNaviBar';
import {LoadMoreStatus} from '../../../components/Views/LDRLScroll/LDLoadMoreRefresh';
import LDCPHistoryListView from '../../../components/Views/LDCPHistoryListView';
import BaseComponent from '../../../components/Views/BaseComponent';
import * as helper from '../../../utils/GlobalHelper';

class X3DHistoryList extends BaseComponent {
    static propTypes = {
        gameEn: PropTypes.string,
        isRefreshing: PropTypes.bool,
        historyItems: PropTypes.array,
        hasNextPage: PropTypes.bool,
        headerLabelString: PropTypes.string,
        isEmpty: PropTypes.bool,
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
        this.state = ({
            gameEn: this.props.navigation.state.params.gameEn,
            periodName: this.props.navigation.state.params.periodName,
        })
    }

    componentDidMount() {
        this.myModuleEvt = new NativeEventEmitter(NativeModules.LDRNEventEmitter).addListener('LDRN_SET_AWARD_PUSH', () => {
                this.props.getHeaderLabelString(this.state.gameEn);
            },
        );
        this.props.refreshAction();
        this.props.getLatestTwentyAwards(this.state.gameEn, this.state.periodName);
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
        this.props.clearData();
        if (this.myModuleEvt) {
            this.myModuleEvt.remove();
        }
    }

    // 下拉刷新
    onRefresh() {
        this.props.getLatestTwentyAwards(this.state.gameEn, this.state.periodName);
    }

    // 上拉加载更多
    onEndReached() {
        if (this.props.hasNextPage && this.props.historyItems && this.props.historyItems.length !== 0) {
            this.props.getNextPageAwards(
                this.state.gameEn, this.props.historyItems[this.props.historyItems.length - 1].periodName,
            );
        }
    }

    functionBindThis() {
        this.renderHeader = this.renderHeader.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <X3DCell
                gameEn={this.state.gameEn}
                rowData={rowData}
                row={rowID}
                cellStyle="historyList"
            />
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
                    }}
                    renderRow={this.renderRow}
                    dataSource={ds.cloneWithRows(historyItems)}
                    automaticallyAdjustContentInsets={false}
                    horizontal={false}
                    onRefresh={this.onRefresh}
                    onLoadMore={this.onEndReached}
                    enableEmptySections
                    isShowLoadMore={this.props.hasNextPage}
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
    const X3DHistoryListReducer = store.X3DHistoryListReducer.toJS();
    return {
        isRefreshing: X3DHistoryListReducer.isRefreshing,
        historyItems: X3DHistoryListReducer.historyItems,
        headerLabelString: X3DHistoryListReducer.headerLabelString,
        hasNextPage: X3DHistoryListReducer.hasNextPage,
        isEmpty: X3DHistoryListReducer.isEmpty,
    };
}

// 选择注入到prop中的回调方法
function mapDispatchToProps(dispatch) {
    return {
        refreshAction: () => dispatch(X3DListActions.refreshAction()),
        getLatestTwentyAwards: (gameEn, periodName) => dispatch(X3DListActions.getRefreshDataAction(gameEn, periodName)),
        getNextPageAwards: (gameEn, lastPeriod) => dispatch(X3DListActions.getNextPageAwardsAction(gameEn, lastPeriod)),
        getHeaderLabelString: gameEn => dispatch(X3DListActions.getHeaderLabelStringAction(gameEn)),
        clearData: () => dispatch(X3DListActions.clearDataAction()),
    };
}

// 生成容器组件X3DHistoryList
export default connect(mapStateToProps, mapDispatchToProps)(X3DHistoryList);
