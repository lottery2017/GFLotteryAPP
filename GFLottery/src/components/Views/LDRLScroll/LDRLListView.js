
import React from 'react';
import {
  ListView,
  View,
  PixelRatio,
} from 'react-native';
import { LDRefreshScrollView, LoadMoreStatus } from './LDLoadMoreRefresh';
import LDDefaultLoadMore from '../LDRLScroll/LoadMore/LDDefaultLoadMore';
import PropTypes from 'prop-types';
const onePixel = 1 / PixelRatio.get();
/**
 *===============================================LDRLListView=====================================
 */
export const LoadMoreTypes = {
  defaultType: 1,
};

export class LDRLListView extends ListView {
  isLoading = false
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      loadStatus: LoadMoreStatus.none,
    };
    this.onEndReached = this.onEndReached.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }
  static propTypes={
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
  setLoadMoreStatus(loadMoreStatus) {
    this.setState({
      loadStatus: loadMoreStatus,
    });
  }
  /**
   * 手动调用刷新
   */
  beginRefresh() {
    this.scrollView.beginRefresh();
  }
  /**
   * 手动结束刷新
   */
  endRefresh() {
    this.scrollView.endRefresh();
  }
 /* eslint-disable no-underscore-dangle */
  scrollDownOnePix() {
    if (this.listView._scrollComponent && this.listView
    ._scrollComponent.scrollView.scrollTo) {
      this.listView._scrollComponent
      .scrollView.scrollTo({ y: this.listView._scrollComponent.offsetY + onePixel });
    }
  }
 /* eslint-disable no-underscore-dangle */

  render() {
    return (
      <ListView
        ref={(ref) => { this.listView = ref; }}
        {...this.props}
        onEndReachedThreshold={1}
        onEndReached={this.onEndReached}
        renderFooter={this.renderFooter}
        renderHeader={this.renderHeader}
        renderScrollComponent={props => <LDRefreshScrollView
          ref={(scrollView) => {
            if (scrollView) {
              this.scrollView = scrollView;
            }
          }}
          {...props}
          isSectionStyle={this.props.isSectionStyle}
        />
      }
      />
    );
  }

  renderHeader() {
    if (this.props.renderHeader) {
      return this.props.renderHeader();
    }
    return null;
  }

  renderFooter() {
    if (this.props.loadMoreType === LoadMoreTypes.defaultType) {
      return (
        <View>
          {this.props.renderFooter ? this.props.renderFooter() : null}
          {this.props.isShowLoadMore
            ? <LDDefaultLoadMore loadMoreStatus={this.state.loadStatus} /> : null}
        </View>
      );
    }
    return null;
  }

  /**
   * 上刷拉操作
   * @param event
   * @private
   */
  onEndReached(event) {
    if (this.state.loadStatus !== LoadMoreStatus.idle || !this.props.isShowLoadMore) {
      return;
    }
    this.isLoading = true;
    this.setState({
      loadStatus: LoadMoreStatus.loading,
    });
    // 调用外部传入的onEndReached
    if (this.props.onLoadMore) {
      this.props.onLoadMore(event);
    }
  }
}
