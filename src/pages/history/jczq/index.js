import React from "react";
import {DatePickerAndroid, FlatList, Platform, View} from "react-native";
import {connect} from "react-redux";
import JCZQCell from "../../../components/HistoryListCells/HistoryListJCZQCell";
import * as JCZQListActions from "../../../actions/history/jczq";
import * as GlobalHelper from "../../../utils/GlobalHelper";
import BaseComponent from "../../../components/Views/BaseComponent";
import PropTypes from "prop-types";
import OddsHintView from "../../../components/Views/OddsHintView";
import DatePickerView from "../../../components/Views/DatePickerView";
import JCHistoryListBarDateView from "../../../components/Views/JCHistoryListBarDateView";
import LotteryToolBar from "../../../components/Views/LotteryToolBar";
import {GFRefreshFlatList} from "../../../components/Views/GFRefresh/GFRefreshFlatList";
import CollapsableView from "../../../components/HistoryListCells/CollapsableView";
class JCZQHistoryList extends BaseComponent {
    static navigationOptions = ({navigation, screenProps}) => ({
        headerRight: (
            <JCHistoryListBarDateView onPress={() => navigation.state.params.rightAction() }/> ),
    });
    static propTypes = {
        gameEn: PropTypes.string,
        sectionsInfo: PropTypes.array,
        requestDate: PropTypes.instanceOf(Date),
        isRefreshing: PropTypes.bool,
        isLoading: PropTypes.bool,
        lastest3DaysItems: PropTypes.array,
        isEmpty: PropTypes.bool,
        datePickerShow: PropTypes.bool,
        sectionsStatus: PropTypes.object,
        resetHeader: PropTypes.bool,
        refreshAction: PropTypes.func.isRequired,
        loadingAction: PropTypes.func.isRequired,
        getLatestDayAwards: PropTypes.func.isRequired,
        clearData: PropTypes.func.isRequired,
        sectionHeaderClicked: PropTypes.func.isRequired,
        barDateClicked: PropTypes.func.isRequired,
        datePickerViewDissappear: PropTypes.func.isRequired,
    };

    static defaultProps = {
        requestDate: new Date(),
        isRefreshing: false,
        isLoading: false,
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
        this.state = ({
            gameEn: this.props.navigation.state.params.gameEn,
        })
    }

    componentDidMount() {
        this.props.navigation.setParams({rightAction: () => this.rightAction()});
        this.props.loadingAction();
        this.props.getLatestDayAwards(this.state.gameEn, this.props.requestDate);
    }

    componentWillUnmount() {
        this.props.clearData();
    }
    //点击日期按键
    rightAction() {
        Platform.OS === 'android' ? this.showAndDatePicker() : this.props.barDateClicked();
    }

    async showAndDatePicker() {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: this.props.requestDate,
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                const newDate = new Date(year, month, day);
                this.datePickerConfirmClicked(newDate);
            }
        } catch ({code, message}) {
            // console.warn('Cannot open date picker', message);
        }
    };
    // 下拉刷新
    onRefresh() {
        this.props.refreshAction();
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
        this.props.loadingAction();
        this.props.getLatestDayAwards(this.state.gameEn, date);
    }

    sectionHeaderClicked(sectionId, sectionStatus) {
        this.props.sectionHeaderClicked(sectionId, sectionStatus);
    }

    sectionNeedFold(sectionID) {
        if (`${sectionID}down` === this.props.sectionsStatus[sectionID]) {
            return true;
        }
        return false;
    }


    renderRow({item, index}) {
        if (this.sectionNeedFold(index)) {
            return null;
        }
        return (
            <JCZQCell rowData={item.value}/>
        );
    }

    renderSectionHeader({item, index}) {
        let dataBlob = [];
        let i = 0;
        this.props.lastest3DaysItems[index].awardMatchList.map(function (item) {
            dataBlob.push({
                key: i,
                value: item,
            });
            i++;
        });
        const title = this.getHeaderTitle(index);
        return (
            <CollapsableView
                text={title}
            >
                <FlatList
                    data={dataBlob}
                    renderItem={this.renderRow.bind(this)}/>
            </CollapsableView>
        );
    }

    render() {
        let dataBlob = [];
        let i = 0;
        this.props.sectionsInfo.map(function (item) {
            dataBlob.push({
                key: i,
                value: item,
            });
            i++;
        });
        return (
            <View style={{flex: 1, backgroundColor: '#f1f1f1'}}>
                <OddsHintView />
                <GFRefreshFlatList
                    data={dataBlob}
                    initLoading={this.props.isLoading}
                    onRefreshFun={this.onRefresh}
                    isRefresh={this.props.isRefreshing}
                    renderItem={this.renderSectionHeader.bind(this)}
                    isShowLoadMore={false}
                />
                {
                    this.props.datePickerShow ? <DatePickerView
                        confirmClicked={this.datePickerConfirmClicked}
                        dissappear={this.props.datePickerViewDissappear}
                    />
                        :
                        <LotteryToolBar gameEn={this.state.gameEn}/>
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
        isLoading: JCZQHistoryListReducer.isLoading,
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
        loadingAction: () => dispatch(JCZQListActions.loadingAction()),
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
