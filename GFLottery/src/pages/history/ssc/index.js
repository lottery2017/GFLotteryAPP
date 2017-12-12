import React, { PropTypes } from 'react';
import { View, ListView } from 'react-native';
import { connect } from 'react-redux';
import SSCCell from '../../../components/TabHistoryCells/ssccell';
import * as SSCListActions from '../../../actions/history/ssc';
import LotteryToolBar from '../../../components/Views/LotteryToolBar';
import CommonNaviBar from '../../../components/Views/CommonNaviBar';
import { LoadMoreStatus } from '../../../components/Views/LDRLScroll/LDLoadMoreRefresh';
import LDCPHistoryListView from '../../../components/Views/LDCPHistoryListView';
import * as helper from '../../../utils/GlobalHelper';
import BaseComponent from '../../../components/Views/BaseComponent';

class SSCHistoryList extends BaseComponent {
  static propTypes = {
    gameEn: PropTypes.string.isRequired,
    isRefreshing: PropTypes.bool,
    historyItems: PropTypes.array,
    hasNextPage: PropTypes.bool,
    isEmpty: PropTypes.bool,
    refreshAction: PropTypes.func.isRequired,
    getLatestTwentyAwards: PropTypes.func.isRequired,
    clearData: PropTypes.func.isRequired,
    getNextPageAwards: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isRefreshing: false,
    historyItems: [],
    hasNextPage: false,
    isEmpty: true,
  }

  constructor(props) {
    super(props);
    this.functionBindThis();
  }

  componentDidMount() {
    this.props.refreshAction();
    this.props.getLatestTwentyAwards(this.props.gameEn);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isRefreshing) {
      this.listView.endRefresh();
    }
    if (nextProps.historyItems.length > 0) {
      this.listView.setLoadMoreStatus(LoadMoreStatus.idle);
    }
  }

  componentWillUnmount() {
    this.props.clearData();
  }

  // 下拉刷新
  onRefresh() {
    this.props.getLatestTwentyAwards(this.props.gameEn);
  }

  // 上拉加载更多
  onEndReached() {
    if (this.props.hasNextPage && this.props.historyItems && this.props.historyItems.length !== 0) {
      this.props.getNextPageAwards(
        this.props.gameEn,
        this.props.historyItems[this.props.historyItems.length - 1].periodName,
      );
    }
  }

  functionBindThis() {
    this.onRefresh = this.onRefresh.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(rowData, sectionID, rowID) {
    return (<SSCCell gameEn={this.props.gameEn} rowData={rowData} row={rowID} cellStyle="historyList" />);
  }

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const { historyItems } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <CommonNaviBar middleTitle={helper.getCNNameFor(this.props.gameEn)} />
        <LDCPHistoryListView
          ref={(ref) => { this.listView = ref; }}
          renderRow={this.renderRow}
          dataSource={ds.cloneWithRows(historyItems)}
          automaticallyAdjustContentInsets={false}
          horizontal={false}
          onRefresh={this.onRefresh}
          onLoadMore={this.onEndReached}
          isShowLoadMore={this.props.hasNextPage}
          enableEmptySections
          renderHeader={this.renderHeader}
          empty={this.props.isEmpty}
          isRefreshing={this.props.isRefreshing}
        />
        <LotteryToolBar gameEn={this.props.gameEn} />
      </View>
    );
  }
}

// 选择store中的state注入props
function mapStateToProps(storeImmutualble) {
  const store = storeImmutualble.toJS();
  return {
    isRefreshing: store.SSCHistoryListReducer.isRefreshing,
    historyItems: store.SSCHistoryListReducer.historyItems,
    hasNextPage: store.SSCHistoryListReducer.hasNextPage,
    isEmpty: store.SSCHistoryListReducer.isEmpty,
  };
}

// 选择注入到prop中的回调方法
function mapDispatchToProps(dispatch) {
  return {
    refreshAction: () => dispatch(SSCListActions.refreshAction()),
    getLatestTwentyAwards: gameEn => dispatch(SSCListActions.getRefreshDataAction(gameEn)),
    getNextPageAwards:
      (gameEn, lastPeriod) => dispatch(SSCListActions.getNextPageAwardsAction(gameEn, lastPeriod)),
    clearData: () => dispatch(SSCListActions.clearDataAction()),
  };
}

// 生成容器组件SSCHistoryList
export default connect(mapStateToProps, mapDispatchToProps)(SSCHistoryList);
