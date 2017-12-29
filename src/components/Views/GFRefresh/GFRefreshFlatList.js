/**
 * Created by Ryan on 2017/12/19.
 */

import React from "react";
import {FlatList, Image, NetInfo, StyleSheet, Text, View} from "react-native";
import LDDefaultLoadMore from "./GFScroll/LoadMore/LDDefaultLoadMore";
import PropTypes from "prop-types";
import * as CommentConfig from "../../../utils/CommonConfig";
import RefreshFlatList, {LoadMoreStatus, ViewType} from "./GFScroll/index";
import LoadingView from "../LoadingView";
import LDDefaultRefresh from "./GFScroll/Refresh/LDDefaultRefresh";

/**
 *===============================================FlatListLoadPull=====================================
 */
export const LoadMoreTypes = {
    defaultType: 1,
};

export class GFRefreshFlatList extends FlatList {
    isLoading = false;
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            loadStatus: LoadMoreStatus.none,
        };
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

        /** 空列表的View*/

        ListEmptyComponent: PropTypes.element,

        /** 如果没有空列表传入用默认的空列表，空列表的文本属性*/
        emptyText: PropTypes.string,
    };

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
        if (this.props.initLoading) {
            return (
                <LoadingView/>
            )
        } else {
            return (
                <RefreshFlatList
                    {...this.props}
                    viewType={ViewType.ListView}
                    initialNumToRender={20}
                    ItemSeparatorComponent={this.props.ItemSeparatorComponent || this._separator.bind(this)}
                    listFooterComponent={this.renderFooter.bind(this)}
                    onEndReached={this.onEndReached.bind(this)}
                    ListEmptyComponent={this.props.ListEmptyComponent || this.emptyView.bind(this)}
                    customRefreshView={this.customRefreshView.bind(this)}
                />
            )
        }
    }

    customRefreshView(refreshState, scrollOffsetY) {
        return (
            <LDDefaultRefresh
                refreshStatus={refreshState}
                scrollOffsetY={scrollOffsetY}
            />
        )
    }

    _separator = () => {
        return (<View style={styles.lineStyle}/>)
    }
    //空列表View
    emptyView() {
        return (
            <View style={styles.view}>
                <Image style={styles.image} source={require('./GFScroll/images/EmptyHint.png')}/>
                <Text style={styles.text}>
                    {this.props.emptyText || "阿欧~木有数据哎。。。下拉刷新试试呗"}
                </Text>
            </View>
        )
    }

    renderFooter() {
        return (
            <View>
                {this.props.renderFooter ? this.props.renderFooter() : null}
                {this.props.isShowLoadMore
                    ? <LDDefaultLoadMore loadMoreStatus={this.state.loadStatus}/> : null}
            </View>
        );
    }

    onEndReached(event) {
        if (this.state.loadStatus !== LoadMoreStatus.idle || !this.props.isShowLoadMore) {
            return;
        }
        this.isLoading = true;
        this.setState({
            loadStatus: LoadMoreStatus.loading,
        });
        // 调用外部传入的onEndReached
        if (this.props.onEndReached) {
            this.props.onEndReached(event);
        }
    }
}
const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    image: {
        marginBottom: 15,
    },
    text: {
        fontSize: 14,
        color: '#8e8e8e',
    },
    lineStyle: {
        height: 1,
        backgroundColor: '#cdcdcd'
    }
});