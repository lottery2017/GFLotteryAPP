/**
 * 大乐透彩种二级页面
 */
import React, { PropTypes } from 'react';
import { View, ListView, NativeModules, NativeEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import DLTCell from '../../../components/TabHistoryCells/dltcell';
import * as DLTListActions from '../../../actions/history/dlt';
import HistoryListHeader from '../../../components/HistoryListHeader/HistoryListHeader';
import LotteryToolBar from '../../../components/Views/LotteryToolBar';
import CommonNaviBar from '../../../components/Views/CommonNaviBar';
import { LoadMoreStatus } from '../../../components/Views/LDRLScroll/LDLoadMoreRefresh';
import LDCPHistoryListView from '../../../components/Views/LDCPHistoryListView';
import BaseComponent from '../../../components/Views/BaseComponent';
import * as helper from '../../../utils/GlobalHelper';

class DLTHistoryList extends BaseComponent {
  static propTypes = {
    gameEn: PropTypes.string.isRequired,
    isRefreshing: PropTypes.bool,
    historyItems: PropTypes.array,
    hasNextPage: PropTypes.bool,
    headerLabelString: PropTypes.string,
    isEmpty: PropTypes.bool,
    refreshAction: PropTypes.func.isRequired,
    getLatestTwentyAwards: PropTypes.func.isRequired,
    getHeaderLabelString: PropTypes.func.isRequired,
    clearData: PropTypes.func.isRequired,
    getNextPageAwards: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isRefreshing: false,
    historyItems: [],
    hasNextPage: false,
    headerLabelString: '',
    isEmpty: true,
  }

  constructor(props) {
    super(props);
    this.functionBindThis();
  }

  componentDidMount() {
    this.myModuleEvt = new NativeEventEmitter(NativeModules.LDRNEventEmitter).addListener('LDRN_SET_AWARD_PUSH', () => {
      this.props.getHeaderLabelString(this.props.gameEn);
    },
    );
    this.props.refreshAction();
    this.props.getLatestTwentyAwards(this.props.gameEn);
    this.props.getHeaderLabelString(this.props.gameEn);
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
    if (this.myModuleEvt) {
      this.myModuleEvt.remove();
    }
  }

  // 下拉刷新
  onRefresh() {
    this.props.getLatestTwentyAwards(this.props.gameEn);
  }

  // 上拉加载更多
  onEndReached() {
    if (this.props.hasNextPage && this.props.historyItems && this.props.historyItems.length !== 0) {
      this.props.getNextPageAwards(
        this.props.gameEn, this.props.historyItems[this.props.historyItems.length - 1].periodName,
      );
    }
  }

  functionBindThis() {
    this.renderHeader = this.renderHeader.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <DLTCell
        gameEn={this.props.gameEn}
        rowData={rowData}
        row={rowID}
        cellStyle="historyList"
      />
    );
  }

  renderHeader() {
    return (
      <HistoryListHeader headerLabelString={this.props.headerLabelString} />
    );
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
          enableEmptySections
          isShowLoadMore={this.props.hasNextPage}
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
    isRefreshing: store.DLTHistoryListReducer.isRefreshing,
    historyItems: store.DLTHistoryListReducer.historyItems,
    headerLabelString: store.DLTHistoryListReducer.headerLabelString,
    hasNextPage: store.DLTHistoryListReducer.hasNextPage,
    isEmpty: store.DLTHistoryListReducer.isEmpty,
  };
}

// 选择注入到prop中的回调方法
function mapDispatchToProps(dispatch) {
  return {
    refreshAction: () => dispatch(DLTListActions.refreshAction()),
    getLatestTwentyAwards: gameEn => dispatch(DLTListActions.getRefreshDataAction(gameEn)),
    getNextPageAwards:
    (gameEn, lastPeriod) => dispatch(DLTListActions.getNextPageAwardsAction(gameEn, lastPeriod)),
    getHeaderLabelString: gameEn => dispatch(DLTListActions.getHeaderLabelStringAction(gameEn)),
    clearData: () => dispatch(DLTListActions.clearDataAction()),
  };
}

// 生成容器组件DLTHistoryList
export default connect(mapStateToProps, mapDispatchToProps)(DLTHistoryList);