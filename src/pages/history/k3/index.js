import React from "react";
import PropTypes from "prop-types";
import {View} from "react-native";
import {connect} from "react-redux";
import K3Cell from "../../../components/TabHistoryCells/kuai3cell";
import * as K3ListActions from "../../../actions/history/k3";
import LotteryToolBar from "../../../components/Views/LotteryToolBar";
import {LoadMoreStatus} from "../../../components/Views/GFRefresh/GFScroll/index";
import * as GlobalHelper from "../../../utils/GlobalHelper";
import BaseComponent from "../../../components/Views/BaseComponent";
import {GFRefreshFlatList} from "../../../components/Views/GFRefresh/GFRefreshFlatList";

class K3HistoryList extends BaseComponent {
    static navigationOptions = ({navigation}) => ({
        title: GlobalHelper.getCNNameFor(navigation.state.params.gameEn)
    });
    static propTypes = {
        gameEn: PropTypes.string,
        isRefreshing: PropTypes.bool,
        historyItems: PropTypes.array,
        hasNextPage: PropTypes.bool,
        isEmpty: PropTypes.bool,
        refreshAction: PropTypes.func.isRequired,
        getLatestTwentyAwards: PropTypes.func.isRequired,
        clearData: PropTypes.func.isRequired,
        getNextPageAwards: PropTypes.func.isRequired,
    };

    static defaultProps = {
        isRefreshing: false,
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
        this.props.refreshAction();
        this.props.getLatestTwentyAwards(this.state.gameEn, this.state.periodName);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isRefreshing) {
            this.setState({isRefresh: false});
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
        this.onRefresh = this.onRefresh.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    renderRow(rowData, sectionID, rowID) {
        return (<K3Cell gameEn={this.state.gameEn} rowData={rowData} row={rowID} cellStyle="historyList"/>);
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
                        initLoading={this.props.isRefreshing}
                        onRefreshFun={this.onRefresh}
                        onEndReached={this.onEndReached}
                        isRefresh={this.state.isRefresh}
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
    const K3HistoryListReducer = store.K3HistoryListReducer.toJS();
    return {
        isRefreshing: K3HistoryListReducer.isRefreshing,
        historyItems: K3HistoryListReducer.historyItems,
        hasNextPage: K3HistoryListReducer.hasNextPage,
        isEmpty: K3HistoryListReducer.isEmpty,
    };
}

// 选择注入到prop中的回调方法
function mapDispatchToProps(dispatch) {
    return {
        refreshAction: () => dispatch(K3ListActions.refreshAction()),
        getLatestTwentyAwards: (gameEn, periodName) => dispatch(K3ListActions.getRefreshDataAction(gameEn, periodName)),
        getNextPageAwards: (gameEn, lastPeriod) => dispatch(K3ListActions.getNextPageAwardsAction(gameEn, lastPeriod)),
        clearData: () => dispatch(K3ListActions.clearDataAction()),
    };
}

// 生成容器组件K3HistoryList
export default connect(mapStateToProps, mapDispatchToProps)(K3HistoryList);
