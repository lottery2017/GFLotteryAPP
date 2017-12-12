/**
 * 下拉刷新的各状态  1 待下拉 2 触发下拉 3 正在加载
 * @type {pullToRefresh: number, releaseToRefresh: number, refreshing: number}}
 */
export const RefreshStatus = {
  pullToRefresh: 1,
  releaseToRefresh: 2,
  refreshing: 3,
};

/**
 * 上拉加载更多的各状态  1 加载中 2 加载完毕 3 加载完毕 无更多数据
 * @type {loading: number, finish: number, noMoreData: number}}
 */

export const LoadMoreStatus = {
  none: 1,
  idle: 2,
  loading: 3,
  noMoreData: 4,
  error: 5,
};
