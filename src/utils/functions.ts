/* eslint-disable prefer-const */
import i18next from 'i18next';
import Cookies from 'js-cookie';

//? REGEX
export const emailValidator = /^([\w+-.%]+@[\w.-]+\.[A-Za-z]+)*$/;
export const usernameValidator = /^[a-z0-9_-]{3,16}$/gim;
export const alphaNumericWithSpace = /^[a-zA-Z0-9 ]*$/gs;
export const alphaNumericWithoutSpace = /^[a-zA-Z0-9]*$/g;
export const proxyValidator =
  /^(?!www|\..*$).[a-zA-Z0-9]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@%_\+.~#?&\/\/=]*)*:[0-9]{1,4}$/gm;
// export const numberValidator = /^[0-6]+$/;
export const floatValidator = /^\d{1,6}$|^(?=\d+[.]\d+$).{3,10}$/;
export const numberValidator = /^[0-9]{1,6}$/;
export const passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
export const alphaNumeric = /^[a-z0-9]+([-_\s]{1}[a-z0-9]+)*$/i;
export const noSpaceValidator = /^\S*$/gm;
export const isUUID = (uuid: string) => {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(uuid);
};

export const filterDropShadow = (color: any, theme: any) => {
  const colorDark = theme.palette[color].dark;
  return '0 10px 30px ' + hexToRGB(colorDark, 0.26);
};

export const hexToRGB = (colorHex: any, alpha?: any) => {
  const r = parseInt(colorHex.slice(1, 3), 16),
    g = parseInt(colorHex.slice(3, 5), 16),
    b = parseInt(colorHex.slice(5, 7), 16);

  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
};

export const createPath = (moduleRoute: string, path?: string) =>
  moduleRoute + path;

export const translateError = (e: string) => i18next.t('errors.' + e);

export const translateSuccess = (msg: string) => i18next.t(msg);

export const generateRandomString = (length = 8) =>
  Math.random().toString(20).substring(2, length);

export const slugify = (text: string) => {
  if (text) {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  }
  return '';
};

export const checkObjEqual = (
  obj1: Record<string, any>,
  obj2: Record<string, any>
) => {
  if (obj1 && obj2) {
    for (const key in obj1) {
      if (key == 'undefined') {
        delete obj1.undefined;
      }
      if (obj1[key]?.toString() !== obj2[key]?.toString()) {
        return false;
      }
    }
    return true;
  }
  return false;
};

export const convertToBase64 = async (file: File) => {
  return new Promise((resolve, reject) => {
    if (file?.type) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader?.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    } else {
      reject('empty_file');
    }
  });
};

//? ******************************************************

export const findDifference = (array1: Array<any>, array2: Array<any>) =>
  array1?.filter(
    ({ id: id1 }: any) => !array2?.some(({ id: id2 }) => id2 === id1)
  );

export const bytesToSize = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
};

export const getDuplicatedValues = (arr: any[]) => {
  let cache: any = {};
  let results: any[] = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    if (cache[arr[i]?.id] === true) {
      results?.push(arr[i]);
    } else {
      cache[arr[i]?.id] = true;
    }
  }
  return results;
};

// *************** | Remove a certain keyword from object key | ***************

export const transformObject = (object: Record<string, any>, keyword: any) => {
  const renamedObject = Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      const keyName =
        key.replace(keyword, '').charAt(0).toLowerCase() +
        key.replace(keyword, '').slice(1);
      return [keyName, value];
    })
  );
  return renamedObject;
};

// ************************ | Get Key from ENUM value | ************************

export const getKeyByValue = (
  value: string,
  enumObject: Record<string, string>
) => {
  const indexOfVal = Object.values(enumObject).indexOf(value as unknown as any);
  const key = Object.keys(enumObject)[indexOfVal];
  return key;
};

// ************************ | Get all object keys | ************************

export const getObjectKeys = (object: Record<string, string>) => {
  const objKeys: Array<string> = [];
  Object.keys(object).forEach((key) => {
    objKeys.push(key);
  });
  return objKeys;
};

// ****************** | Prepare / Transform imported data | ******************

export const transformImportedData = (
  csvData: Array<Record<string, any>>,
  keysMapping: Record<string, any>
) => {
  const importedData: Array<any> = [];
  csvData?.forEach((res: Record<string, any>) => {
    const mappedData = Object.keys(keysMapping).reduce(
      (obj, k) => Object.assign(obj, { [k]: res[keysMapping[k]] }),
      {}
    );
    importedData.push(mappedData);
  });
  return importedData;
};

// ****************** | Convert Object to Array | ******************

export const objectToArray = (object: any) => {
  let array = Object.keys(object).map((key: any) => {
    return object?.[key];
  });
  return array;
};

// ****************** | Find Duplicates in an Array | ******************

export const findDuplicates = (arr: Array<any>) =>
  arr.filter((item, index) => arr.indexOf(item) != index);

//? ***************** | Base64 To PDF - Print | *****************

const base64ToArrayBuffer = (data: string) => {
  const bString = window.atob(data);
  const bLength = bString.length;
  const bytes = new Uint8Array(bLength);
  for (let i = 0; i < bLength; i++) {
    const ascii = bString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes;
};

export const getArrayBuffersFromBase64 = (pdfList: Array<string>) => {
  const arrayBuffers: Array<ArrayBuffer> = [];
  pdfList?.forEach((pdf) => {
    const bString = window.atob(pdf);
    const bLength = bString.length;
    const bytes = new Uint8Array(bLength);
    for (let i = 0; i < bLength; i++) {
      const ascii = bString.charCodeAt(i);
      bytes[i] = ascii;
    }
    arrayBuffers?.push(bytes?.buffer);
  });

  return arrayBuffers;
};

export const printFile = (basePdf: string) => {
  const content = base64ToArrayBuffer(basePdf);
  const blob = new Blob([content], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = url;
  document.body.appendChild(iframe);
  iframe?.contentWindow?.print();
  iframe?.contentWindow?.close();
};

//? ***************** | ***************** | *****************

export const getFormattedDate = (dateTime: Date) => {
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const day = dateTime.getDate();
  const date = year + '-' + month + '-' + day;
  return date;
};

export const getFormattedTime = (dateTime: Date) => {
  return (
    dateTime.getHours() +
    ':' +
    dateTime.getMinutes() +
    ':' +
    dateTime.getSeconds()
  );
};

export const getCurrentFrenchDateAndTime = (): {
  date: string;
  time: string;
} => {
  const months = [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre',
  ];

  const date = new Date();

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();

  const formattedDate = {
    date: day + ' ' + month + ' ' + year,
    time: hour + 'h' + minute.toString().padStart(2, '0'),
  };

  return formattedDate;
};

//? ***************** | Get Saved Session -- REMEMBER ME OPTION | *****************

export const verifySavedSession = () => {
  const savedUserData = localStorage.getItem('userData');
  if (savedUserData !== null) {
    return JSON.parse(savedUserData);
  } else {
    return null;
  }
};

//? ***************** | Capitalize Words (UpperCase only first letter)| *****************
//? Supports multiple words

export const capitalizeWords = (value: string) => {
  if (value && value !== undefined) {
    return value?.replace(/(?:^|\s)\S/g, function (letter: string) {
      return letter?.toUpperCase();
    });
  }
  return 'N/A';
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return Cookies?.get('token') ?? null;
  }
  return null;
};
