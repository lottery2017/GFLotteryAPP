
import React from 'react';
import {
  ScrollView,
} from 'react-native';
import LDDefaultRefresh from './Refresh/LDDefaultRefresh';
import { RefreshStatus } from '../LDRLScroll/LDRLStatus';
import { miniAnimationTime, RefreshTypes } from './LDRLConfig';
import PropTypes from 'prop-types';
/**
 * ======================================LDRefreshScrollView===================================
 */

export default class LDRefreshScrollView extends ScrollView {
  offsetY=0
  isRefreshing=false
  dragFlag = false; // scrollview是否处于拖动状态的标志
  customRefreshViewHeight = 70;
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      refresStatus: RefreshStatus.pullToRefresh,
      offsetY: 0,
    };
    this.onScroll = this.onScroll.bind(this);
    if (props.refreshType === RefreshTypes.pigRefreshType) {
      this.customRefreshViewHeight = 70;
    }
  }

  static propTypes={

    // -------------------------下拉刷新------------------------------
    /**
     * 刷新数据时的操作
     */
    onRefresh: PropTypes.func,
    /**
     * 下拉刷新类型
     */
    refreshType: PropTypes.number,
    /**
     * 是不是分section的类型
     */
    isSectionStyle: PropTypes.bool,
  }

   /**
   * 默认下拉刷新类型
   */
  static defaultProps={
    refreshType: RefreshTypes.pigRefreshType,
    isSectionStyle: false,
  }

  componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  /**
   * 手动调用刷新
   */
  beginRefresh() {
    if (!this.isRefreshing) {
      this.refreshingTime = new Date().getTime();
      this.isRefreshing = true;
      this.setState({
        refresStatus: RefreshStatus.refreshing,
        offsetY: this.customRefreshViewHeight,
      });
      this.scrollView.scrollTo({ x: 0, y: -this.customRefreshViewHeight, animated: true });
    }
  }

  /**
   * 手动结束下拉刷新
   */
  endRefresh() {
    const aniationTime = new Date().getTime() - this.refreshingTime;
    if (aniationTime >= miniAnimationTime) {
      this.onRefreshEnd();
    } else {
      this.timer = setTimeout(
      () => {
        this.onRefreshEnd();
      },
      miniAnimationTime - aniationTime,
    );
    }
  }

  /**
   * !!!!重要：解决列表为分组类型时，Sectionheader异常问题。
   */
  fixSticky() {
    const stickyHeaderIndices = [];
    const propsStickHeader = this.props.stickyHeaderIndices || [];
    for (let i = 0; i < propsStickHeader.length; i += 1) {
      if (i > 0) {
        stickyHeaderIndices.push(propsStickHeader[i] + 1);
      }
    }
    // 分组类型时，设置粘头部的第一个
    if (this.props.isSectionStyle) {
      stickyHeaderIndices.push(1);
    }
    return stickyHeaderIndices;
  }
//---------------------------------------------------------
  render() {
    return (
      <ScrollView
        ref={(ref) => { this.scrollView = ref; }}
        {...this.props}
        scrollEventThrottle={16}
        stickyHeaderIndices={this.fixSticky()}
        onScroll={this.onScroll}
        onScrollEndDrag={(event) => { this.onScrollEndDrag(event); }}
        onScrollBeginDrag={(event) => { this.onScrollBeginDrag(event); }}
      >
        {this.rendRefreshheader()}
        {this.props.children}
      </ScrollView >
    );
  }

  // ------------------下拉刷新部分-----------------------------
  /**
   * 渲染头部刷新组件
   * @private
   */
  rendRefreshheader() {
    if (this.props.refreshType === RefreshTypes.pigRefreshType) {
      return (
        <LDDefaultRefresh
          refresStatus={this.state.refresStatus}
          scrollOffsetY={this.state.offsetY}
        />
      );
    }
    return null;
  }
  /**
   * 滑动中
   * @param event
   * @private
   */
  onScroll(event) {
    const y = event.nativeEvent.contentOffset.y;
    this.offsetY = y;
    if (this.dragFlag) {
      if (!this.isRefreshing) {
        if (y <= -this.customRefreshViewHeight) {
          // 松开以刷新
          this.setState({
            refresStatus: RefreshStatus.releaseToRefresh,
            offsetY: y,
          });
        } else {
          // 下拉以刷新
          this.setState({
            refresStatus: RefreshStatus.pullToRefresh,
            offsetY: y,
          });
        }
      }
    }
    // 调用外部传进来的 onScroll
    if (this.props.onScroll) {
      this.props.onScroll(event);
    }
  }

  /**
   * 拖拽
   * @private
   */
  onScrollEndDrag(event) {
    this.dragFlag = false;
    const y = event.nativeEvent.contentOffset.y;
    this.offsetY = y;
    if (!this.isRefreshing) {
      if (this.state.refresStatus === RefreshStatus.releaseToRefresh) {
        this.isRefreshing = true;
        this.refreshingTime = new Date().getTime();
        this.setState({
          refresStatus: RefreshStatus.refreshing,
          offsetY: y,
        });
        this.scrollView.scrollTo({ x: 0, y: -this.customRefreshViewHeight, animated: true });
        if (this.props.onRefresh) {
          this.props.onRefresh();
        }
      }
    } else if (y <= 0) {
      this.scrollView.scrollTo({ x: 0, y: -this.customRefreshViewHeight, animated: true });
    }
    // 调用外部传进来的 onScrollEndDrag
    if (this.props.onScrollEndDrag) {
      this.props.onScrollEndDrag(event);
    }
  }
  onScrollBeginDrag(event) {
    this.dragFlag = true;
    this.offsetY = event.nativeEvent.contentOffset.y;
    // 调用外部传进来的 onScrollBeginDrag
    if (this.props.onScrollBeginDrag) {
      this.props.onScrollBeginDrag(event);
    }
  }

  /**
   * 刷新结束
   * @private
   */
  onRefreshEnd() {
    if (this.isRefreshing) {
      this.isRefreshing = false;
      // 下拉以刷新
      this.setState({
        refresStatus: RefreshStatus.pullToRefresh,
        offsetY: 0,
      });
      this.scrollView.scrollTo({ x: 0, y: 0, animated: true });
    }
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}
