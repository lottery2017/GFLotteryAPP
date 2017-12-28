import React, {Component} from "react";
import PropTypes from "prop-types";
import {Animated, Dimensions, Easing, FlatList, VirtualizedList} from "react-native";

import Item from "./Item";
import AndroidSwipeRefreshLayout from "./AndroidSwipeRefreshLayout";
import LDDefaultRefresh from "./Refresh/LDDefaultRefresh";
import {RefreshStatus, ViewType} from "./LDRLStatus";
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimatedVirtualizedList = Animated.createAnimatedComponent(VirtualizedList);

export default class FlatListTest extends Component {
    static defaultProps = {
        isRefresh: false,
        viewType: ViewType.ScrollView,
    };
    static propTypes = {
        customRefreshView: PropTypes.func,
        isRefresh: PropTypes.bool,
        onRefreshFun: PropTypes.func,
        onEndReached: PropTypes.func,
        viewType: PropTypes.oneOf(['ListView', 'ScrollView'])
    };

    constructor(props) {
        super(props);
        this.state = {
            rotation: new Animated.Value(0),
            rotationNomal: new Animated.Value(0),
            refreshState: RefreshStatus.pullToRefresh,
            percent: 0,
            toRenderItem: true
        }
        this._marginTop = new Animated.Value()
        this._scrollEndY = 0
        this.headerHeight = 70// Default refreshView height
        this.isAnimating = false // Controls the same animation not many times during the sliding process
        this.beforeRefreshState = RefreshStatus.pullToRefresh
    }

    componentWillMount() {
        const {customRefreshView} = this.props
        if (customRefreshView) {
            const {height} = customRefreshView(RefreshStatus.pullToRefresh).props.style
            this.headerHeight = height
        }
        this._marginTop.setValue(-this.headerHeight)
        this._marginTop.addListener((v) => {
            let p = parseInt(( (this.headerHeight + v.value) / (this.headerHeight)) * 100)
            if (this.state.refreshState !== RefreshStatus.refreshDown)
                this.setState({percent: (p > 100 ? 100 : p) + '%'})
        })
    }


    componentDidMount() {
    }

    componentWillReceiveProps(nextProps, nextState) {
        this.setRefreshState(nextProps.isRefresh)
    }

    componentWillUnmount() {
        this.t && clearTimeout(this.t);
        this.timer1 && clearTimeout(this.timer1);
        this.timer2 && clearTimeout(this.timer2);
    }

    // test onRefreshFun
    _onRefreshFun = () => {
        this.setRefreshState(true);
        this.timer1 = setTimeout(() => {
            this.setRefreshState(false)
        }, 2000)
    }

    setRefreshState(refreshing) {
        const {onRefreshFun} = this.props
        if (refreshing) {
            this.beforeRefreshState = RefreshStatus.refreshing
            this.updateRefreshViewState(RefreshStatus.refreshing)
        } else {
            if (this.beforeRefreshState == RefreshStatus.refreshing) {
                this.beforeRefreshState = RefreshStatus.pullToRefresh
                this.updateRefreshViewState(RefreshStatus.refreshDown)
            } else {
                // 意欲何为?
                // this.updateRefreshViewState(RefreshState.pullToRefresh)
            }
        }
    }

    updateRefreshViewState(refreshState = RefreshStatus.pullToRefresh) {
        switch (refreshState) {
            case RefreshStatus.pullToRefresh:
                this.setState({
                    refreshState: RefreshStatus.pullToRefresh,
                }, () => {
                    Animated.timing(
                        this._marginTop,
                        {
                            toValue: -this.headerHeight,
                            duration: 200,
                            easing: Easing.linear
                        }).start(() => {
                        this.updateItemRenderState()
                    })
                })
                break;
            case RefreshStatus.releaseToRefresh:
                this.setState({refreshState: RefreshStatus.releaseToRefresh})
                break;
            case RefreshStatus.refreshing:
                this.setState({refreshState: RefreshStatus.refreshing,}, () => {
                    Animated.timing(
                        this._marginTop,
                        {
                            toValue: 0,
                            duration: 200,
                            easing: Easing.linear
                        }).start()
                })
                break;
            case RefreshStatus.refreshDown:
                this.setState({
                    refreshState: RefreshStatus.refreshDown,
                    toRenderItem: true
                }, () => {
                    // This delay is shown in order to show the refresh time to complete the refresh
                    this.setState({toRenderItem: false})
                    this.t = setTimeout(() => {
                        // 当刷新完成时，先回到初始状态保持100%, 然后在更新组件状态
                        Animated.timing(
                            this._marginTop,
                            {
                                toValue: -this.headerHeight,
                                duration: 200,
                                easing: Easing.linear
                            }).start(() => {
                            this.updateRefreshViewState(RefreshStatus.pullToRefresh)
                        })
                    }, 500)
                })
                break;
            default:

        }
    }

    // 滑动列表结束后，设置item可以render， 用来接收新的state
    updateItemRenderState() {
        if (!this.state.toRenderItem) {
            this.setState({toRenderItem: true})
        }
    }

    _onSwipe = (movement) => {
        /**
         * If you are in the refresh or refresh the completion of the state will not trigger the refresh
         */
        // this.setState({toRenderItem: false})
        if (this.state.refreshState >= RefreshStatus.refreshing) return
        this._scrollEndY = movement
        if (movement >= 0) this._marginTop.setValue(movement - this.headerHeight);
        if (movement >= this.headerHeight) {
            this.updateRefreshViewState(RefreshStatus.releaseToRefresh)
        } else if (movement < this.headerHeight) {
            if (this.state.refreshState === RefreshStatus.releaseToRefresh)
                this.updateRefreshViewState(RefreshStatus.pullToRefresh)
        }
    }

    _onRefresh = () => {
        if (this.state.refreshState >= RefreshStatus.refreshing) return;
        if (this._scrollEndY >= this.headerHeight) {
            const {onRefreshFun} = this.props;
            this.setRefreshState(true)
            onRefreshFun ? onRefreshFun() : this._onRefreshFun()
        } else {
            //下拉距离不够自动收回
            Animated.timing(
                this._marginTop,
                {
                    toValue: -this.headerHeight,
                    duration: 200,
                    easing: Easing.linear
                }).start(() => {
                this.updateItemRenderState()
            })
        }
    }

    _onEndReached = () => {
        const {onEndReached} = this.props
        if (onEndReached) {
            return onEndReached()
        }
    };

    _onTouchEnd = () => {
        if (!this.state.toRenderItem)
            this.setState({toRenderItem: true})
    };
    _onMomentumScrollEnd = () => {
        if (!this.state.toRenderItem)
            this.setState({toRenderItem: true})
    };

    _onScrollBeginDrag = () => {
        if (this.state.toRenderItem)
            this.setState({toRenderItem: false})
    };

    _onScrollEndDrag = () => {
        if (!this.state.toRenderItem)
            this.setState({toRenderItem: true})
    };

    _renderItem = (item) => {
        return <Item {...this.props} item={item} toRenderItem={this.state.toRenderItem}/>
    };

    customRefreshView = () => {
        const {customRefreshView} = this.props;
        const {refreshState, percent} = this.state;
        if (customRefreshView) return customRefreshView(refreshState, percent);
        return (
            <LDDefaultRefresh
                refreshStatus={this.state.refreshState}
                scrollOffsetY={parseFloat(JSON.stringify(this._marginTop))}
            />
        )
    };

    _ListFooterComponent = () => {
        const {listFooterComponent} = this.props
        if (listFooterComponent) return listFooterComponent()
    };

    render() {
        const {viewType, data} = this.props;
        return (
            <AndroidSwipeRefreshLayout
                ref={ component => this._swipeRefreshLayout = component }
                enabledPullUp={true}
                enabledPullDown={true}
                onSwipe={this._onSwipe}
                onRefresh={this._onRefresh}>
                {
                    viewType == ViewType.ScrollView ?
                        <AnimatedFlatList
                            ref={ flatList => {
                                this._flatList = flatList
                            }}
                            {...this.props}
                            data={['1']}
                            renderItem={this._renderItem}
                            keyExtractor={(v, i) => i}
                            ListHeaderComponent={this.customRefreshView}
                            onTouchEnd={this._onTouchEnd}
                            onScrollBeginDrag={this._onScrollBeginDrag}
                            onScrollEndDrag={this._onScrollEndDrag}
                            onMomentumScrollEnd={this._onMomentumScrollEnd}
                            style={[{...this.props.style},
                                {
                                    marginTop: this._marginTop.interpolate({
                                        inputRange: [-this.headerHeight, 0, 500],
                                        outputRange: [-this.headerHeight, 0, 150]
                                    })
                                }]}
                        />
                        :
                        <AnimatedFlatList
                            ref={ flatList => {
                                this._flatList = flatList
                            }}
                            {...this.props}
                            data={data}
                            keyExtractor={(v, i) => i}
                            renderItem={this._renderItem}
                            ListHeaderComponent={this.customRefreshView}
                            ListFooterComponent={this._ListFooterComponent}
                            onEndReached={this._onEndReached}
                            onEndReachedThreshold={0.1}
                            onTouchEnd={this._onTouchEnd}
                            onScrollBeginDrag={this._onScrollBeginDrag}
                            onScrollEndDrag={this._onScrollEndDrag}
                            onMomentumScrollEnd={this._onMomentumScrollEnd}
                            style={[{...this.props.style},
                                {
                                    marginTop: this._marginTop.interpolate({
                                        inputRange: [-this.headerHeight, 0, 500],
                                        outputRange: [-this.headerHeight, 0, 150]
                                    })
                                }]}
                        />
                }
            </AndroidSwipeRefreshLayout>
        );
    }
}