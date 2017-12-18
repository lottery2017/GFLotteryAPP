import { NativeModules } from 'react-native';
import X2JS from 'x2js';

export function xmlGet(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        // console.log('====>>>>>request.responseText');
        const json = new X2JS().xml2js(request.responseText);
        // console.log('====>>>>>json');
        // console.log(json);
        resolve(json);
      } else {
        reject('xmlGet method error');
      }
    };
    request.send();
  });
}

function filterStatus(res) {
  return res;
}

function filterJSON(res) {
  return res.json();
}

export async function get(url) {
  // if(__DEV__){
  //   console.info('GET:' , url );
  // }
  return fetch(url).then(filterStatus).then(filterJSON);
}

export function post(url, body) {
  // if (__DEV__) {
  //   console.info('POST: ', url);
  //   console.info('Body: ', body);
  // }

  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(filterStatus).then(filterJSON);
}

export function formPost(url, body) {
  // if (__DEV__) {
  // console.info('POST: ', url);
  // console.info('Body: ', body);
  // }

  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body,
  }).then(filterStatus).then(filterJSON);
}

// url拼接product deviceId等信息
// 解析map类型的para,也拼接到url上
export async function urlAddInterfaceHeader(url, para) {
  //const interfaceHeader = await NativeModules.PTCRNBridge.getInterfaceHeader();
  let newUrl = url;
  //newUrl += `?${interfaceHeader}`;
  if (para) {
    para.forEach(
      (value, key) => {
        newUrl += `&${key}=${value}`;
      },
    );
  }
  return newUrl;
}

