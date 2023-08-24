import { KeyValue } from "../types/keyvalue";
import { ProcessedRequestData } from "../types/response";

export function checkURL(url: string) {
    let urlObj: URL;
    try {
        urlObj = new URL(url);
    } catch (_) {
        console.log(_);
        return false;
    }

    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
}

export function checkJson(jsonString: string) {
    if (jsonString.trim() == "") return false;
    try {
        JSON.parse(jsonString);
    } catch (_) {
        return false;
    }
    return true;
}

export function getKeyValue(inputArr: KeyValue[]) {
    let keyValueObj: Record<string, string> = {};

    let isError = false;
    for (const element of inputArr) {
        const { isChecked, key, value } = element;
        if (!isChecked) continue;

        if (keyValueObj.hasOwnProperty(key)) {
            isError = true;
            break;
        }
        if (key !== "") keyValueObj[key] = value;
    }

    if (isError) return false;

    return keyValueObj;
}

export function checkAll(
    headerData: KeyValue[],
    paramData: KeyValue[],
    requestBody: string
): undefined | ProcessedRequestData {
    let params: Record<string, string> = {};
    let header: Record<string, string> = {};
    let bodyObj: Record<any, any> = {};

    let temp = getKeyValue(headerData);
    if (typeof temp == "boolean") return;
    else header = temp;

    temp = getKeyValue(paramData);
    if (typeof temp == "boolean") return;
    else params = temp;

    try {
        if (requestBody !== "") bodyObj = JSON.parse(requestBody);
    } catch (error) {
        return;
    }

    return { params, header, bodyObj };
}

// function getDuplicateKeyError(inputArr: KeyValue[]) {
//     let errorObj: Record<string, number[]> = {};
//     for (let i = 0; i < inputArr.length; i++) {
//         const { isChecked, key } = inputArr[i];

//         if (!isChecked) continue;

//         if (errorObj.hasOwnProperty(key)) errorObj[key].push(i);
//         else errorObj[key] = [i];
//     }

//     const keys = Object.keys(errorObj);

//     // error is the ones appearing more than once
//     keys.forEach((key) => {
//         if (errorObj[key].length == 1) delete errorObj[key];
//     });

//     return errorObj;
// }
