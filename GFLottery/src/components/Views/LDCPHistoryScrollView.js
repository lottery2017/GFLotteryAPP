import React from 'react';
import {
    NetInfo,
} from 'react-native';
import {LDRefreshScrollView} from '../Views/LDRLScroll/LDLoadMoreRefresh';
import EmptyHintView from '../Views/EmptyHintView';
import LoadingView from '../Views/LoadingView';
import PropTypes from 'prop-types';
import * as CommentConfig from "../../utils/CommonConfig";
export default class LDCPHistoryScrollView extends LDRefreshScrollView {

    constructor(props) {
        super(props);
        this.state = {
            emptyHintViewHeight: 0,
            loadingViewHeight: 0,
        };
        this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.getList = this.getList.bind(this);
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
     * 手动调用刷新
     */
    beginRefresh() {
        this.ldcpRefreshScrollView.beginRefresh();
    }

    /**
     * 手动结束刷新
     */
    endRefresh() {
        this.ldcpRefreshScrollView.endRefresh();
    }

    onRefresh() {
        if (!this.netIsConnected) {
            this.ldcpRefreshScrollView.endRefresh();
            return;
        }
        if (this.props.onRefresh) {
            this.props.onRefresh();
        }
    }

    handleConnectivityChange(isConnected) {
        this.netIsConnected = isConnected;
    }

    renderAbnormalContent() {
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

    getList() {
        if (this.props.empty || this.props.isRefreshing) {
            return (
                <LDRefreshScrollView
                    style={{backgroundColor: '#f4f4f4'}}
                    ref={(ref) => {
                        this.ldcpRefreshScrollView = ref;
                    }}
                    onLayout={(event) => {
                        const layout = event.nativeEvent.layout;
                        this.setState(
                            {
                                emptyHintViewHeight: layout.height,
                                loadingViewHeight: layout.height,

                            },
                        );
                    }}
                    onRefresh={this.onRefresh}
                >
                    {this.renderAbnormalContent()}
                </LDRefreshScrollView>
            );
        }
        return (
            <LDRefreshScrollView
                style={{backgroundColor: '#f4f4f4'}}
                ref={(ref) => {
                    this.ldcpRefreshScrollView = ref;
                }}
                onRefresh={this.onRefresh}
                {...this.props}
            >
                {this.props.children}
            </LDRefreshScrollView>
        );
    }

    render() {
        return (
            this.getList()
        );
    }
}
