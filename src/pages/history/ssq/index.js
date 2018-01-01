import React from "react";
import {View} from "react-native";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import SSQCell from "../../../components/TabHistoryCells/ssqcell";
import * as SSQListActions from "../../../actions/history/ssq";
import LotteryToolBar from "../../../components/Views/LotteryToolBar";
import {LoadMoreStatus} from "../../../components/Views/GFRefresh/GFScroll/index";
import BaseComponent from "../../../components/Views/BaseComponent";
import {GFRefreshFlatList} from "../../../components/Views/GFRefresh/GFRefreshFlatList";
class SSQHistoryList extends BaseComponent {
    static propTypes = {
        gameEn: PropTypes.string,
        isRefreshing: PropTypes.bool,
        isLoading: PropTypes.bool,
        historyItems: PropTypes.array,
        hasNextPage: PropTypes.bool,
        isEmpty: PropTypes.bool,
        refreshAction: PropTypes.func.isRequired,
        getLatestTwentyAwards: PropTypes.func.isRequired,
        clearData: PropTypes.func.isRequired,
        getNextPageAwards: PropTypes.func.isRequired,
        loadingAction:PropTypes.func.isRequired,
    };

    static defaultProps = {
        isRefreshing: false,
        isLoading: false,
        historyItems: [],
        hasNextPage: false,
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
        this.props.loadingAction();
        this.props.getLatestTwentyAwards(this.state.gameEn, this.state.periodName);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isRefreshing) {
        }
        if (nextProps.historyItems.length > 0) {
            this.flatList.setLoadMoreStatus(LoadMoreStatus.idle);
        }
    }

    componentWillUnmount() {
        this.props.clearData();
    }

    // 下拉刷新
    onRefresh() {
        this.props.refreshAction();
        this.props.getLatestTwentyAwards(this.state.gameEn, this.state.periodName);
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
        this.onRefresh = this.onRefresh.bind(this);
    }

    renderRow({item, index}) {
        return (
            <SSQCell
                gameEn={this.state.gameEn}
                rowData={item.value}
                row={index}
                cellStyle="historyList"/>
        );
    }

    render() {
        let dataBlob = [];
        let i = 0;
        this.props.historyItems.map(function (item) {
            dataBlob.push({
                key: i,
                value: item,
            });
            i++;
        });
        return (
            <View style={{flex: 1, backgroundColor: '#f1f1f1'}}>
                <View style={{flex: 1}}>
                    <GFRefreshFlatList
                        ref={(ref) => {
                            this.flatList = ref;
                        }}
                        data={dataBlob}
                        initLoading={this.props.isLoading}
                        onRefreshFun={this.onRefresh}
                        onEndReached={this.onEndReached}
                        isRefresh={this.props.isRefreshing}
                        renderItem={this.renderRow.bind(this)}
                        isShowLoadMore={true}
                    />
                </View>
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
        isLoading: SSQHistoryListReducer.isLoading,
        historyItems: SSQHistoryListReducer.historyItems,
        hasNextPage: SSQHistoryListReducer.hasNextPage,
        isEmpty: SSQHistoryListReducer.isEmpty,
    };
}

// 选择注入到prop中的回调方法
function mapDispatchToProps(dispatch) {
    return {
        refreshAction: () => dispatch(SSQListActions.refreshAction()),
        loadingAction: () => dispatch(SSQListActions.loadingAction()),
        getLatestTwentyAwards: (gameEn, periodName) => dispatch(SSQListActions.getRefreshDataAction(gameEn, periodName)),
        getNextPageAwards: (gameEn, lastPeriod) => dispatch(SSQListActions.getNextPageAwardsAction(gameEn, lastPeriod)),
        clearData: () => dispatch(SSQListActions.clearDataAction()),
    };
}

// 生成容器组件SSQHistoryList
export default connect(mapStateToProps, mapDispatchToProps)(SSQHistoryList);
