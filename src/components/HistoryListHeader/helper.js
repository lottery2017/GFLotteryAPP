import { NativeModules } from 'react-native';

const EN_SSQ = 'ssq';
const EN_DLT = 'dlt';
const EN_3D = 'x3d';
const EN_PL3 = 'pl3';
const EN_PL5 = 'pl5';
const EN_QXC = 'qxc';

export function awardTimeForGameEn(gameEn) {
  switch (gameEn) {
    case EN_SSQ: return '每周二、四、日21:15开奖';
    case EN_DLT: return '每周一、三、六20:30开奖';
    case EN_3D: return '每天21:15开奖';
    case EN_PL3:
    case EN_PL5: return '每天20:30开奖';
    case EN_QXC: return '每周二、五、日20:30开奖';
    default: return '每周一、三、五21:15开奖';
  }
}

export async function headerLabelStringForGameEn(gameEn) {
  const pushStateString = await NativeModules.PTCRNBridge.awardPushStatusForGameEn(gameEn);
  const awardTime = awardTimeForGameEn(gameEn);
  return `${awardTime}，${pushStateString}`;
}
