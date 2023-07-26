export type ResponseObject = {
    body: any;
    header: Record<string, string>;
    responseStats: string;
    timetaken: string;
    size: string;
    requestData?: ProcessedRequestData;
};

export type ProcessedRequestData = {
    header: Record<string, string>;
    params: Record<string, string>;
    bodyObj: Record<any, any>;
};

export const DEFAULT_PROCESSED_REQUEST_DATA: ProcessedRequestData = {
    header: {},
    params: {},
    bodyObj: {},
};

export const DEFAULT_RESPONSE_OBJECT: ResponseObject = {
    body: {},
    header: {},
    responseStats: "",
    timetaken: "",
    size: "",
    requestData: DEFAULT_PROCESSED_REQUEST_DATA,
};
