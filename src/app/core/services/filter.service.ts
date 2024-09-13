import { Injectable } from '@angular/core';

export interface FilterOption {
  value: any;
  keys: string[];
  type: 'include' | 'startWith' | 'match' |
  'dateLower' | 'dateUpper' | 'numberLower' | 'numberUpper' | 'none';
  compare?: 'AND' | 'OR';
}

@Injectable({
  providedIn: 'root'
})

export class FilterService {

  static customFilter(input: any[], filters: FilterOption[]) {


    const orderedData = [];
    for (const item of input) {
      let validity = true;
      if (!filters) {

        return input;
      }
      for (const filter of filters) {
        if (filter.type === 'none') {
          continue;
        }
        let breakLoop = false;
        switch (filter.type) {
          case 'include':
            if (!getItemValue(item, filter.keys).includes(String(filter.value).toLocaleLowerCase())) {
              validity = false;
              break;
            } else if (filter.compare === 'OR') {
              breakLoop = true;
              break;
            }
            break;
          case 'startWith':
            if (!getItemValue(item, filter.keys).startsWith(String(filter.value).toLocaleLowerCase())) {
              validity = false;
              break;
            } else if (filter.compare === 'OR') {
              breakLoop = true;
              break;
            }
            break;
          case 'match':

            if (getItemArrValue(item, filter.keys, filter.value) !== String(filter.value).toLocaleLowerCase()) {
              validity = false;
              break;
            } else if (filter.compare === 'OR') {
              breakLoop = true;
              break;
            }
            break;
          case 'dateLower':
            if (!(getDateItemValue(item, filter.keys) >= new Date(filter.value).getTime())) {
              validity = false;
              break;
            } else if (filter.compare === 'OR') {
              breakLoop = true;
              break;
            }
            break;
          case 'dateUpper':
            if (!(getDateItemValue(item, filter.keys) <= new Date(filter.value).getTime())) {
              validity = false;
              break;
            } else if (filter.compare === 'OR') {
              breakLoop = true;
              break;
            }
            break;
          case 'numberLower':
            if (!(getNumberItemValue(item, filter.keys) >= Number(filter.value))) {
              validity = false;
              break;
            } else if (filter.compare === 'OR') {
              breakLoop = true;
              break;
            }
            break;
          case 'numberUpper':
            if (!(getNumberItemValue(item, filter.keys) <= Number(filter.value))) {
              validity = false;
              break;
            } else if (filter.compare === 'OR') {
              breakLoop = true;
              break;
            }
            break;
        }
        if (breakLoop) {
          validity = true;
          break;
        }
      }
      if (validity) {
        orderedData.push(item);
      }
    }
    return orderedData;
  }

}

export function getItemValue(obj: object, keys: string[]) {
  let temp = null;
  for (const key of keys) {
    if (temp === null) {
      temp = obj[key];
    } else {
      if (temp) {
        temp = temp[key];
      }
    }
  }
  return String(temp).toLocaleLowerCase();
}

export function getItemArrValue(obj: object, keys: string[], value: string) {


  let temp = null;
  let count: number = 0;
  let tempKeys: string[] = keys;
  let nestedLoopStatus: boolean = false;
  let nestedLoop: any[] = [];
  let nestedTemp: any = null;

  for (const key of keys) {
    count++;
    if (temp === null) {
      temp = obj[key];
    } else {
      if (temp) {
        if (key === '0') {

          nestedLoopStatus = true;
          nestedLoop = temp;
          tempKeys = tempKeys.slice(count);
          break;
        }
        temp = temp[key];
      }
    }
  } // end for

  if (nestedLoopStatus) {
    for (const nestedItem of nestedLoop) {
      nestedTemp = null;
      for (const nestedKey of tempKeys) {

        if (nestedTemp === null) {
          nestedTemp = nestedItem[nestedKey];
        } else {
          nestedTemp = nestedTemp[nestedKey];
        }
      }

      if (String(nestedTemp).toLocaleLowerCase() === String(value).toLocaleLowerCase()) {
        return String(nestedTemp).toLocaleLowerCase();
      }

    }

    return null;

  } else {
    return String(temp).toLocaleLowerCase();
  }

}


export function getDateItemValue(obj: object, keys: string[]) {
  let temp = null;
  for (const key of keys) {
    if (temp === null) {
      temp = obj[key];
    } else {
      if (temp) {
        temp = temp[key];
      }
    }
  }
  return new Date(temp).getTime();
}
export function getNumberItemValue(obj: object, keys: string[]) {
  let temp = null;
  for (const key of keys) {
    if (temp === null) {
      temp = obj[key];
    } else {
      if (temp) {
        temp = temp[key];
      }
    }
  }
  return Number(temp);
}
