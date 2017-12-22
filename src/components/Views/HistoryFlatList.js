/**
 * Created by Ryan on 2017/12/19.
 */

import React from "react";
import {FlatList, NetInfo, View} from "react-native";
import {LoadMoreStatus} from "../Views/LDRLScroll/LDLoadMoreRefresh";
import LDDefaultLoadMore from "./LDRLScroll/LoadMore/LDDefaultLoadMore";
import PropTypes from "prop-types";
import * as CommentConfig from "../../utils/CommonConfig";
import RefreshFlatList, {ViewType} from "../../components/Views/PullRefreshFlatList";
import LoadingView from "./LoadingView";

/**
 *===============================================FlatListLoadPull=====================================
 */
export const LoadMoreTypes = {
    defaultType: 1,
};

export class HistoryFlatList extends FlatList {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            loadStatus: LoadMoreStatus.none,
        };
        this.renderFooter = this.renderFooter.bind(this);
    }

    static propTypes = {
        // ----------------下拉刷新-----------------------------
        /**
         * 刷新数据时的操作
         */
        onRefresh: PropTypes.func,
        // ----------------上拉加载-----------------------------
        /**
         * 加载更多调用的方法
         */
        onLoadMore: PropTypes.func,
        /**
         * 是否显示底部的加载更多 默认为true
         */
        isShowLoadMore: PropTypes.bool,
        /**
         * 上拉加载类型
         */
        loadMoreType: PropTypes.number,
        /**
         * 是否为分组类型
         */
        isSectionStyle: PropTypes.bool,
    }

    static defaultProps = {
        isShowLoadMore: true,
        loadMoreType: LoadMoreTypes.defaultType,
    };
    /**
     * 设置上拉加载更多的状态 分：
     * none:1,idle:2,loading:3,noMoreData:4,error:5, 分别对应不同的展示状态
     */
    /**
     * 设置上拉加载更多的状态 分：
     * none:1,idle:2,loading:3,noMoreData:4,error:5, 分别对应不同的展示状态
     */
    setLoadMoreStatus(loadMoreStatus) {
        this.setState({
            loadStatus: loadMoreStatus,
        });
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener(
            CommentConfig.NETINFO_CHANGE,
            this.handleConnectivityChange,
        );
        NetInfo.isConnected.fetch().done(
            (isConnected) => {
                this.handleConnectivityChange(isConnected);
            },
        );
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener(
            CommentConfig.NETINFO_CHANGE,
            this.handleConnectivityChange,
        );
    }

    handleConnectivityChange(isConnected) {
        this.netIsConnected = isConnected;
        if (!isConnected) {
            this.setLoadMoreStatus(LoadMoreStatus.none);
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {this.props.initLoading ?
                    <LoadingView/> :
                    <RefreshFlatList
                        {...this.props}
                        viewType={ViewType.ListView}
                        initialNumToRender={20}
                        onEndReachedThreshold={0.2}
                        listFooterComponent={this.renderFooter}
                    />
                }
            </View>
        );
    }

    renderFooter() {
        if (this.props.loadMoreType === LoadMoreTypes.defaultType) {
            return (
                <View>
                    {this.props.renderFooter ? this.props.renderFooter() : null}
                    {this.props.isShowLoadMore
                        ? <LDDefaultLoadMore loadMoreStatus={this.state.loadStatus}/> : null}
                </View>
            );
        }
        return null;
    }
}
