export type ResponseObject = {
    body: any;
    header: Record<string, string>;
    responseStats: string;
    timetaken: string;
    size: string;
};

export const DEFAULT_RESPONSE_OBJECT: ResponseObject = {
    body: {},
    header: {},
    responseStats: "",
    timetaken: "",
    size: "",
};
