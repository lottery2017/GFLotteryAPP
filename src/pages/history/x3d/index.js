/**
 * 大乐透彩种二级页面
 */
import React from "react";
import PropTypes from "prop-types";
import {View} from "react-native";
import {connect} from "react-redux";
import X3DCell from "../../../components/TabHistoryCells/x3dcell";
import * as X3DListActions from "../../../actions/history/x3d";
import LotteryToolBar from "../../../components/Views/LotteryToolBar";
import {LoadMoreStatus} from "../../../components/Views/GFRefresh/GFScroll/index";
import BaseComponent from "../../../components/Views/BaseComponent";
import {GFRefreshFlatList} from "../../../components/Views/GFRefresh/GFRefreshFlatList";

class X3DHistoryList extends BaseComponent {
    static propTypes = {
        gameEn: PropTypes.string,
        isRefreshing: PropTypes.bool,
        isLoading: PropTypes.bool,
        historyItems: PropTypes.array,
        hasNextPage: PropTypes.bool,
        isEmpty: PropTypes.bool,
        refreshAction: PropTypes.func.isRequired,
        loadingAction: PropTypes.func.isRequired,
        getLatestTwentyAwards: PropTypes.func.isRequired,
        clearData: PropTypes.func.isRequired,
        getNextPageAwards: PropTypes.func.isRequired,
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
        if (this.myModuleEvt) {
            this.myModuleEvt.remove();
        }
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
                this.state.gameEn, this.props.historyItems[this.props.historyItems.length - 1].periodName,
            );
        }
    }

    functionBindThis() {
        this.onRefresh = this.onRefresh.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
    }

    renderRow({item, index}) {
        return (
            <X3DCell
                gameEn={this.state.gameEn}
                rowData={item.value}
                row={index}
                cellStyle="historyList"
            />
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
    const X3DHistoryListReducer = store.X3DHistoryListReducer.toJS();
        return {
            isRefreshing: X3DHistoryListReducer.isRefreshing,
            isLoading: X3DHistoryListReducer.isLoading,
            historyItems: X3DHistoryListReducer.historyItems,
            hasNextPage: X3DHistoryListReducer.hasNextPage,
            isEmpty: X3DHistoryListReducer.isEmpty,
        };
}

// 选择注入到prop中的回调方法
function mapDispatchToProps(dispatch) {
    return {
        refreshAction: () => dispatch(X3DListActions.refreshAction()),
        loadingAction: () => dispatch(X3DListActions.loadingAction()),
        getLatestTwentyAwards: (gameEn, periodName) => dispatch(X3DListActions.getRefreshDataAction(gameEn, periodName)),
        getNextPageAwards: (gameEn, lastPeriod) => dispatch(X3DListActions.getNextPageAwardsAction(gameEn, lastPeriod)),
        clearData: () => dispatch(X3DListActions.clearDataAction()),
    };
}

// 生成容器组件X3DHistoryList
export default connect(mapStateToProps, mapDispatchToProps)(X3DHistoryList);
