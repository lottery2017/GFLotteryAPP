import React from 'react';
import {
    NetInfo,
    ListView,
} from 'react-native';
import {LDRLListView, LoadMoreStatus} from '../Views/LDRLScroll/LDLoadMoreRefresh';
import EmptyHintView from '../Views/EmptyHintView';
import LoadingView from '../Views/LoadingView';
import PropTypes from 'prop-types';
import * as CommentConfig from "../../utils/CommonConfig";
export default class LDCPHistoryListView extends LDRLListView {

    constructor(props) {
        super(props);
        this.state = {
            emptyHintViewHeight: 0,
            loadingViewHeight: 0,
        };
        this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.getList = this.getList.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    static propTypes = {

        /**
         * 是否显示空状态
         */
        empty: PropTypes.bool,
        /**
         * 是否显示刷新状态
         */
        isRefreshing: PropTypes.bool,
    }

    /**
     * 默认不显示空状态
     */
    static defaultProps = {
        empty: false,
        isRefreshing: true,
    }

    /**
     *
     * scrollview 滚动0.5点
     */
    scrollDownOnePix() {
        this.ldcpListView.scrollDownOnePix();
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

    /**
     * 设置上拉加载更多的状态 分：
     * none:1,idle:2,loading:3,noMoreData:4,error:5, 分别对应不同的展示状态
     */
    setLoadMoreStatus(loadMoreStatus) {
        this.ldcpListView.setLoadMoreStatus(loadMoreStatus);
    }

    /**
     * 手动调用刷新
     */
    beginRefresh() {
        this.ldcpListView.beginRefresh();
    }

    /**
     * 手动结束刷新
     */
    endRefresh() {
        this.ldcpListView.endRefresh();
    }

    onRefresh() {
        if (!this.netIsConnected) {
            this.ldcpListView.endRefresh();
            return;
        }
        if (this.props.onRefresh) {
            this.props.onRefresh();
        }
    }

    handleConnectivityChange(isConnected) {
        this.netIsConnected = isConnected;
        if (!isConnected) {
            this.ldcpListView.setLoadMoreStatus(LoadMoreStatus.none);
        }
    }

    renderRow() {
        if (this.props.isRefreshing) {
            return (<LoadingView height={this.state.loadingViewHeight}/>
            );
        }
        return (
            <EmptyHintView
                height={this.state.emptyHintViewHeight}
            />
        );
    }
    onLayout(event){
        const layout = event.nativeEvent.layout;
        this.setState(
            {
                emptyHintViewHeight: layout.height,
                loadingViewHeight: layout.height,
            },
        );
    }
    getList() {
        if (this.props.empty || this.props.isRefreshing) {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            const historyItems = [1];
            return (
                <LDRLListView
                    //removeClippedSubviews={false}
                    style={{backgroundColor: '#f4f4f4'}}
                    ref={(ref) => {
                        this.ldcpListView = ref;
                    }}
                    onLayout={this.onLayout.bind(this)}
                    renderRow={this.renderRow}
                    dataSource={ds.cloneWithRows(historyItems)}
                    automaticallyAdjustContentInsets={false}
                    horizontal={false}
                    onRefresh={this.onRefresh}
                    initialListSize={this.props.initialListSize ? this.props.initialListSize : 8}
                />
            );
        }
        return (
            <LDRLListView
                style={{backgroundColor: '#f4f4f4'}}
                ref={(ref) => {
                    this.ldcpListView = ref;
                }}
                {...this.props}
                onRefresh={this.onRefresh}
            >
                {this.props.children}
            </LDRLListView>
        );
    }

    render() {
        return (
            this.getList()
        );
    }
}
