// 数组 sort 方法
export function by(name) {
    return (o, p) => {
        let a;
        let b;
        if (typeof o === 'object' && typeof p === 'object' && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {
                return 0;
            }
            if (typeof a === typeof b) {
                return a < b ? 1 : -1;
            }
            return typeof a < typeof b ? 1 : -1;
        }
        throw (new Error('array sort error'));
    };
}

// 数组乱序
export function shuffle(a) {
    if (!(a instanceof Array)) {
        return [];
    }

    const length = a.length;
    const shuffled = Array(length);

    for (let index = 0, rand; index < length; index += 1) {
        rand = ~~(Math.random() * (index + 1)); // eslint-disable-line no-bitwise
        if (rand !== index) {
            shuffled[index] = shuffled[rand];
        }
        shuffled[rand] = a[index];
    }

    return shuffled;
}

export function handleSectionListViewData(originData) {
    //    定义变量
    const dataBlob = {};
    const sectionIDs = []; // 一维 存放组ID
    const rowIDs = []; // 二维 存放每组对应的数据
    let firstSectionLength = 0;

    for (let i = 0; i < originData.length; i += 1) {
        // 1.拿到所有的sectionId
        sectionIDs.push(i);

        // 2.把组中的内容放入dataBlob内容中
        dataBlob[i] = originData[i].selectedDate;

        // 3.设置改组中每条数据的结构
        rowIDs[i] = [];

        // 4.取出改组中所有的数据
        const awardMatchList = originData[i].awardMatchList.sort(by('matchNumCn'));

        // 5.遍历awardMatchList,设置每组的列表数据
        for (let j = 0; j < awardMatchList.length; j += 1) {
            // 改组中的每条对应的rowId
            rowIDs[i].push(j);
            // 把每一行中的内容放入dataBlob对象中
            dataBlob[`${i}:${j}`] = awardMatchList[j];
        }
        if (i === 0) {
            firstSectionLength = rowIDs[i].length;
        }
    }
    return {
        dataBlob: dataBlob,
        sectionIDs: sectionIDs,
        rowIDs: rowIDs,
        firstSectionLength: firstSectionLength,
    };
}

export function getCNNameFor(gameEn) {
    if (gameEn === 'jxd11') {
        return '老11选5';
    } else if (gameEn === 'hljd11') {
        return '龙11选5';
    } else if (gameEn === 'lnd11') {
        return '辽宁11选5';
    } else if (gameEn === 'gdd11') {
        return '粤11选5';
    } else if (gameEn === 'zjd11') {
        return '易乐11选5';
    } else if (gameEn === 'cqd11') {
        return '重庆11选5';
    } else if (gameEn === 'd11') {
        return '鲁11选5';
    } else if (gameEn === 'nmgkuai3') {
        return '易快3';
    } else if (gameEn === 'ahkuai3') {
        return '好运快3';
    } else if (gameEn === 'gxkuai3') {
        return '桂快3';
    } else if (gameEn === 'oldkuai3') {
        return '江苏快3';
    } else if (gameEn === 'hbkuai3') {
        return '湖北快3';
    } else if (gameEn === 'kuai3') {
        return '快3';
    } else if (gameEn === 'jxssc') {
        return '新时时彩';
    } else if (gameEn === 'ssc') {
        return '重庆时时彩';
    } else if (gameEn === 'ssq') {
        return '双色球';
    } else if (gameEn === 'dlt') {
        return '大乐透';
    } else if (gameEn === 'jczq') {
        return '竞彩足球';
    } else if (gameEn === 'jclq') {
        return '竞彩篮球';
    } else if (gameEn === 'football_sfc') {
        return '胜负彩';
    } else if (gameEn === 'football_9') {
        return '任选九';
    } else if (gameEn === 'kl8') {
        return '快乐8';
    } else if (gameEn === 'klpk') {
        return '快乐扑克';
    } else if (gameEn === 'klsf') {
        return '粤快乐十分';
    } else if (gameEn === 'pl3') {
        return '排列3';
    } else if (gameEn === 'pl5') {
        return '排列5';
    } else if (gameEn === 'qlc') {
        return '七乐彩';
    } else if (gameEn === 'qxc') {
        return '七星彩';
    } else if (gameEn === 'sfgg') {
        return '胜负过关';
    } else if (gameEn === 'x3d') {
        return '3D';
    } else if (gameEn === 'zqdc') {
        return '足球单场';
    }
    return '';
}

export function getDate(date) {
    if (date.getDate() < 10) {
        return `0${date.getDate()}`;
    }
    return `${date.getDate()}`;
}

export function getMonth(date) {
    if (date.getMonth() < 10) {
        return `0${date.getMonth() + 1}`;
    }
    return `${date.getMonth() + 1}`;
}

export function getWeek(date) {
    let weekDay = '';
    switch (date.getDay()) {
        case 0:
            weekDay = '周日';
            break;
        case 1:
            weekDay = '周一';
            break;
        case 2:
            weekDay = '周二';
            break;
        case 3 :
            weekDay = '周三';
            break;
        case 4:
            weekDay = '周四';
            break;
        case 5:
            weekDay = '周五';
            break;
        case 6:
            weekDay = '周六';
            break;
        default:
            weekDay = '周日';
            break;
    }
    return weekDay;
}
