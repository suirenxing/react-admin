import CryptoJS from 'crypto-js';

// @ts-ignore
function replacer(key, value) {
  if (value !== null && value !== undefined) {
    return value;
  }
}

export function buildObjStr(obj?: Object) {
  if (!obj) {
    return '';
  }
  if (obj instanceof FormData) {
    return ''
  }
  if (Array.isArray(obj)) {
    const jsonStr = JSON.stringify(obj, replacer);
    let digestArr = 0;
    for (let index = 0; index < jsonStr.length; index++) {
      digestArr += jsonStr.charCodeAt(index);
    }
    return digestArr + '' + jsonStr.length + '&';
  }

  const keyArr: string[] = [];

  let paramStr = '';
  let key: keyof Object;
  for (key in obj) {
    keyArr.push(key);
  }
  keyArr.sort().forEach((keyItem) => {
    let tmp = obj[keyItem];
    if (keyItem !== '_t' && undefined !== tmp && null !== tmp) {
      if (tmp instanceof Object) {
        const jsonStr = JSON.stringify(tmp, replacer);
        let total = 0;
        for (let index = 0; index < jsonStr.length; index++) {
          total += jsonStr.charCodeAt(index);
        }

        tmp = total + '' + jsonStr.length;
      }

      paramStr += keyItem + '=' + tmp + '&';
    }
  });
  return paramStr;
}

/**
 * 参数签名获取
 * @param url 请求api路径
 * @param param  query参数
 * @param data  json参数
 * @param time  时间
 * @returns
 */
export function encodeParam(params: {
  url: string;
  param?: any;
  data?: any;
  time?: number;
}): string {
  //参数
  let queryParam = buildObjStr(params.param);
  const bodyParam = buildObjStr(params.data);

  queryParam += bodyParam;
  if (!!params.time) {
    queryParam += params.time + '&';
  }

  const BASE_URL = import.meta.env.VITE_GLOB_API_URL;
  const reg = new RegExp(`^(${BASE_URL})?\/\\w+/`);
  queryParam += params.url.replace(reg, '/');
  //生成签名
  const key = 'Pod87Ojk93D09Md3';

  return CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(queryParam, key));
}
