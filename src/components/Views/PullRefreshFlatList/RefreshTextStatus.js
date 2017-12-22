/**
 * Created by Ryan on 2017/12/21.
 */
// 0: 未刷新; 1: 到达刷新点; 2: 刷新中; 3: 刷新完成
export const RefreshState = {
    pullToRefresh: 0,
    releaseToRefresh: 1,
    refreshing: 2,
    refreshdown: 3,
}

export const RefreshText = {
    pullToRefresh: '下拉刷新',
    releaseToRefresh: '释放刷新',
    refreshing: '正在刷新',
    refreshdown: '刷新完成'
}