/*
 * @Author: aran.hu
 * @Date: 2017-04-14 14:29:15
 * @Last Modified by: aran.hu
 * @Last Modified time: 2017-06-30 15:10:23
 */


import React, {Component} from "react";
import PropTypes from "prop-types";
import {Animated, Easing, FlatList, PanResponder} from "react-native";
import Item from "./Item";
import {RefreshStatus, ViewType} from "./LDRLStatus";
import LDDefaultRefresh from "./Refresh/LDDefaultRefresh";

export default class RefreshFlatList extends Component {

    static defaultProps = {
        isRefresh: false,
        viewType: ViewType.ScrollView,
    };

    static propTypes = {
        customRefreshView: PropTypes.func,
        onRefreshFun: PropTypes.func,
        onEndReached: PropTypes.func,
        isRefresh: PropTypes.bool,
        viewType: PropTypes.oneOf(['ListView', 'ScrollView'])
    };

    constructor() {
        super();
        this.state = {
            _data: [],
            refreshState: RefreshStatus.pullToRefresh,
            percent: 0,
            toRenderItem: true
        };
        this._scrollEndY = 0;
        this.headerHeight = 70;
        this.mTop = 0 // Record distance from top to top
        this.isOnMove = false // Distinguish whether the finger is triggered Slip; Calculate the sliding percentage
        this.beforeRefreshState = RefreshStatus.pullToRefresh
    }

    componentWillMount() {
        const {customRefreshView} = this.props
        if (customRefreshView) {
           /* const {height} = customRefreshView(RefreshStatus.pullToRefresh).props.style
            this.headerHeight = height*/
        }

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => true,
            onStartShouldSetPanResponderCapture: (event, gestureState) => true,
            onMoveShouldSetPanResponder: (event, gestureState) => false,
            onMoveShouldSetPanResponderCapture: (event, gestureState) => false,
            onPanResponderTerminationRequest: (event, gestureState) => true,
            onPanResponderGrant: (event, gestureState) => {
                this.onStart(event, gestureState);
            },
            onPanResponderMove: (event, gestureState) => {
                this.onMove(event, gestureState);
            },
            onPanResponderRelease: (event, gestureState) => {
                this.onEnd(event, gestureState);
            }
        })
    }


    componentWillReceiveProps(nextProps, nextState) {
        this.setRefreshState(nextProps.isRefresh)
    }

    componentWillUnmount() {
        this.t && clearTimeout(this.t);
        this.timer1 && clearTimeout(this.timer1);
    }

    // Test onRefreshFun
    _onRefreshFun = () => {
        this.setRefreshState(true)
        this.timer1 = setTimeout(() => {
            this.setRefreshState(false)
        }, 2000)
    }

    setRefreshState(refreshing) {
        if (refreshing) {
            this.beforeRefreshState = RefreshStatus.refreshing;
            this.updateRefreshViewState(RefreshStatus.refreshing)
        } else {
            if (this.beforeRefreshState == RefreshStatus.refreshing) {
                this.beforeRefreshState = RefreshStatus.pullToRefresh;
                this.updateRefreshViewState(RefreshStatus.refreshDown)
            } else {
                //?
                // this.updateRefreshViewState(RefreshState.pullToRefresh)
            }
        }
    }

    updateRefreshViewState(refreshState = RefreshStatus.pullToRefresh) {
        switch (refreshState) {
            case RefreshStatus.pullToRefresh:
                this.setState({refreshState: RefreshStatus.pullToRefresh,})
                break;
            case RefreshStatus.releaseToRefresh:
                this.setState({refreshState: RefreshStatus.releaseToRefresh,})
                break;
            case RefreshStatus.refreshing:
                this.setState({refreshState: RefreshStatus.refreshing,}, () => {
                    this._flatList.scrollToOffset({animated: true, offset: -this.headerHeight})
                })
                break;
            case RefreshStatus.refreshDown:
                this.setState({refreshState: RefreshStatus.refreshDown, percent: 100, toRenderItem: true}, () => {
                    // This delay is shown in order to show the refresh time to complete the refresh
                    this.t = setTimeout(() => {
                        this._flatList.scrollToOffset({animated: true, offset: 0});
                        this.tt = setTimeout(() => {
                            this.updateRefreshViewState(RefreshStatus.pullToRefresh)
                        }, 500)
                    }, 500)
                })
            default:

        }
    }

    _onEndReached = () => {
        const {onEndReached} = this.props
        if (onEndReached) {
            return onEndReached()
        }
    }

    _onScroll = (e) => {
        let {y} = e.nativeEvent.contentOffset
        this._scrollEndY = y;
        if (this._scrollEndY == 0) this.setState({toRenderItem: true})
        if (!this.isOnMove && -y >= 0) {
            //刷新状态下，上推列表依percent然显示100%
            let p = parseInt(( -y / (this.headerHeight)) * 100)
            if (this.state.refreshState !== RefreshStatus.refreshDown)
                this.setState({percent: (p > 100 ? 100 : p)})
        }
    }

    onStart(e, g) {
        this.isOnMove = true
        this.setState({toRenderItem: false})
    }

    onMove(e, g) {
        this.mTop = g.dy
        if (g.dy >= 0) {
            let p = parseInt(( g.dy / (2 * this.headerHeight)) * 100)
            p = p > 100 ? 100 : p
            this.setState({percent: p})
            if (p < 100) {
                this.updateRefreshViewState(RefreshStatus.pullToRefresh)
            } else {
                this.updateRefreshViewState(RefreshStatus.releaseToRefresh)
            }
        }
    }

    onEnd(e, g) {
        this.isOnMove = false
        if (this._scrollEndY < -this.headerHeight) {
            const {onRefreshFun} = this.props
            this.setRefreshState(true)
            onRefreshFun ? onRefreshFun() : this._onRefreshFun()
        }
    }

    _renderItem = (item) => {
        return <Item {...this.props} item={item} toRenderItem={this.state.toRenderItem}/>
    };

    customRefreshView = () => {
        const {customRefreshView} = this.props;
        const {refreshState, percent} = this.state;
        if (customRefreshView) return customRefreshView(refreshState, this._scrollEndY);
        return (
            <LDDefaultRefresh
                refreshStatus={this.state.refreshState}
                scrollOffsetY={this._scrollEndY}
            />
        )
    };

    _ListFooterComponent = () => {
        const {listFooterComponent} = this.props;
        if (listFooterComponent) return listFooterComponent()
    };

    render() {
        const {viewType, data} = this.props;
        if (viewType == ViewType.ScrollView) {
            return (
                <FlatList
                    ref={ flatList => {
                        this._flatList = flatList
                    }}
                    {...this._panResponder.panHandlers}
                    {...this.props}
                    onScroll={this._onScroll}
                    data={['1']}
                    renderItem={this._renderItem}
                    keyExtractor={(v, i) => i}
                    ListHeaderComponent={this.customRefreshView}
                    style={[{...this.props.style}, {marginTop: -this.headerHeight}]}
                />
            )
        } else {
            return (
                <FlatList
                    ref={ flatList => {
                        this._flatList = flatList
                    }}
                    {...this._panResponder.panHandlers}
                    {...this.props}
                    onScroll={this._onScroll}
                    data={data || this.state._data}
                    renderItem={this._renderItem}
                    keyExtractor={(v, i) => i}
                    ListHeaderComponent={this.customRefreshView}
                    ListFooterComponent={this._ListFooterComponent}
                    onEndReached={this._onEndReached}
                    onEndReachedThreshold={0.1}
                    style={[{...this.props.style}, {marginTop: -this.headerHeight}]}
                />
            );
        }
    }
}