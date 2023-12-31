import { RequestBasic } from "./requesttypes";
import { ResponseObject } from "./response";
import { DEFAULT_REQUEST_BASIC } from "./requesttypes";
import { KeyValue, DEFAULT_KEY_VALUE } from "./keyvalue";
import { DEFAULT_INPUT_FORM, InputFormType } from "./FormInput";

export type RequestInputData = {
    // id: number;
    requestBasicInfo: RequestBasic;
    paramData: KeyValue[];
    headerData: KeyValue[];
    requestBody: string;
    savedResponses: ResponseObject[];
    formData: InputFormType[];
};

export const DEFAULT_REQUEST_INPUT = {
    requestBasicInfo: DEFAULT_REQUEST_BASIC,
    paramData: [DEFAULT_KEY_VALUE],
    headerData: [DEFAULT_KEY_VALUE],
    requestBody: "",
    savedResponses: [],
    formData: [DEFAULT_INPUT_FORM],
};
