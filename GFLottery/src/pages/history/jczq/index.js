import React from 'react';
import { View, ListView, DatePickerAndroid, Platform } from 'react-native';
import { connect } from 'react-redux';
import JCZQCell from '../../../components/HistoryListCells/HistoryListJCZQCell';
import * as JCZQListActions from '../../../actions/history/jczq';
import OddsHintView from '../../../components/Views/OddsHintView';
import LotteryToolBar from '../../../components/Views/LotteryToolBar';
import CommonNaviBar from '../../../components/Views/CommonNaviBar';
import JCHistoryListBarDateView from '../../../components/Views/JCHistoryListBarDateView';
import DatePickerView from '../../../components/Views/DatePickerView';
import JCListSectionHeader from '../../../components/Views/JCListSectionHeader';
import LDCPHistoryListView from '../../../components/Views/LDCPHistoryListView';
import * as GlobalHelper from '../../../utils/GlobalHelper';
import BaseComponent from '../../../components/Views/BaseComponent';
import PropTypes from 'prop-types';
class JCZQHistoryList extends BaseComponent {
  static propTypes = {
    gameEn: PropTypes.string,
    sectionsInfo: PropTypes.array,
    requestDate: PropTypes.instanceOf(Date),
    isRefreshing: PropTypes.bool,
    lastest3DaysItems: PropTypes.array,
    isEmpty: PropTypes.bool,
    datePickerShow: PropTypes.bool,
    sectionsStatus: PropTypes.object,
    resetHeader: PropTypes.bool,
    refreshAction: PropTypes.func.isRequired,
    getLatestDayAwards: PropTypes.func.isRequired,
    clearData: PropTypes.func.isRequired,
    sectionHeaderClicked: PropTypes.func.isRequired,
    barDateClicked: PropTypes.func.isRequired,
    datePickerViewDissappear: PropTypes.func.isRequired,
  };

  static defaultProps = {
    requestDate: new Date(),
    isRefreshing: false,
    sectionsInfo: [],
    lastest3DaysItems: [],
    isEmpty: true,
    resetHeader: false,
    datePickerShow: false,
    sectionsStatus: {},
  }

  constructor(props) {
    super(props);
    this.functionBindThis();
    
  }

  componentDidMount() {
    this.props.refreshAction();
    this.props.getLatestDayAwards(this.state.gameEn, this.props.requestDate);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isRefreshing) {
      this.listView.endRefresh();
    }
  }
  componentWillUnmount() {
    this.props.clearData();
  }

  // 下拉刷新
  onRefresh() {
    this.props.getLatestDayAwards(this.state.gameEn, this.props.requestDate);
  }

  getHeaderTitle(sectionId) {
    const date = new Date(this.props.sectionsInfo[sectionId].selectedDate.replace(/-/g, '/'));
    return `${GlobalHelper.getMonth(date)}月${GlobalHelper.getDate(date)}日 ${GlobalHelper.getWeek(date)} ${this.props.sectionsInfo[sectionId].matchNum}场比赛已开奖`;
  }

  functionBindThis() {
    this.renderRow = this.renderRow.bind(this);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.datePickerConfirmClicked = this.datePickerConfirmClicked.bind(this);
    this.sectionHeaderClicked = this.sectionHeaderClicked.bind(this);
  }

  datePickerConfirmClicked(date) {
    this.props.refreshAction();
    this.props.getLatestDayAwards(this.state.gameEn, date);
  }

  sectionHeaderClicked(sectionId, sectionStatus) {
        // 保证sectionheader 正确渲染
    this.listView.scrollDownOnePix();
    this.props.sectionHeaderClicked(sectionId, sectionStatus);
  }

  sectionNeedFold(sectionID) {
    if (`${sectionID}down` === this.props.sectionsStatus[sectionID]) {
      return true;
    }
    return false;
  }

  renderRow(rowData, sectionID) {
    if (this.sectionNeedFold(sectionID)) {
      return null;
    }
    return (
      <JCZQCell rowData={rowData} />
    );
  }

  renderSectionHeader(sectionData, sectionId) {
    const title = this.getHeaderTitle(sectionId);
    return (
      <JCListSectionHeader
        key={title}
        text={title}
        sectionId={sectionId}
        onClicked={this.sectionHeaderClicked}
        resetHeader={this.props.resetHeader}
      />
    );
  }

  render() {
    const showAndDatePicker = async () => {
      try {
        const { action, year, month, day } = await DatePickerAndroid.open({
          date: this.props.requestDate,
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          const newDate = new Date(year, month, day);
          this.datePickerConfirmClicked(newDate);
        }
      } catch ({ code, message }) {
        // console.warn('Cannot open date picker', message);
      }
    };

    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[`${sectionID}:${rowID}`];

    const dataSource = new ListView.DataSource({
      getSectionData: (dataBlob, sectionID) => getSectionData(dataBlob, sectionID), // 获取组中数据
      getRowData: (dataBlob, sectionID, rowID) => getRowData(dataBlob, sectionID, rowID), // 获取行中的数据
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    const { dataBlob, sectionIDs, rowIDs, firstSectionLength } =
      GlobalHelper.handleSectionListViewData(this.props.lastest3DaysItems);

    return (
      <View style={{ flex: 1 }}>
        <CommonNaviBar middleTitle="竞彩足球" rightView={<JCHistoryListBarDateView />} rightAction={Platform.OS === 'android' ? showAndDatePicker : this.props.barDateClicked} />
        <OddsHintView />
        <LDCPHistoryListView
          ref={(ref) => { this.listView = ref; }}
          automaticallyAdjustContentInsets={false}
          horizontal={false}
          initialListSize={Platform.OS === 'android' ? 5 : firstSectionLength}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}
          onRefresh={this.onRefresh}
          dataSource={dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)}
          empty={this.props.isEmpty}
          isRefreshing={this.props.isRefreshing}
          isSectionStyle
        />
        {
          this.props.datePickerShow ? <DatePickerView
            confirmClicked={this.datePickerConfirmClicked}
            dissappear={this.props.datePickerViewDissappear}
          />
            :
          <LotteryToolBar gameEn={this.state.gameEn} />
        }
      </View>
    );
  }
}

// 选择store中的state注入props
function mapStateToProps(store) {
  const JCZQHistoryListReducer = store.JCZQHistoryListReducer.toJS();
  return {
    isRefreshing: JCZQHistoryListReducer.isRefreshing,
    datePickerShow: JCZQHistoryListReducer.datePickerShow,
    lastest3DaysItems: JCZQHistoryListReducer.lastest3DaysItems,
    requestDate: JCZQHistoryListReducer.requestDate,
    sectionsStatus: JCZQHistoryListReducer.sectionsStatus,
    resetHeader: JCZQHistoryListReducer.resetHeader,
    sectionsInfo: JCZQHistoryListReducer.sectionsInfo,
    isEmpty: JCZQHistoryListReducer.isEmpty,
  };
}

// 选择注入到prop中的回调方法
function mapDispatchToProps(dispatch) {
  return {
    refreshAction: () => dispatch(JCZQListActions.refreshAction()),
    clearData: () => dispatch(JCZQListActions.clearDataAction()),
    barDateClicked: () => dispatch(JCZQListActions.barDateClicked()),
    datePickerViewDissappear: () => dispatch(JCZQListActions.datePickerViewDissapper()),
    getLatestDayAwards: (gameEn, date) =>
      dispatch(JCZQListActions.getLatestDayAwardsAction(gameEn, date)),
    sectionHeaderClicked: (sectionId, sectionStatus) =>
      dispatch(JCZQListActions.sectionHeaderClickedAction(sectionId, sectionStatus)),
  };
}

// 生成容器组件JCZQHistoryList
export default connect(mapStateToProps, mapDispatchToProps)(JCZQHistoryList);
