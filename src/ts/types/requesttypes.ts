export type RequestBasic = { url: string; type: RequestType };
export const DEFAULT_REQUEST_BASIC: RequestBasic = { url: "", type: "GET" };
export type RequestType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
