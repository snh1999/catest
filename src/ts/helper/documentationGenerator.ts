import { KeyValue } from "../types/keyvalue";
import { RequestInputData } from "../types/requestInput";
import { ResponseObject } from "../types/response";

interface Header {
    name: string;
    value: string;
    description: string;
}

interface Parameter {
    name: string;
    type: string;
    description: string;
}

interface ExampleResponse {
    headers: Record<string, string> | undefined;
    params: Record<string, string> | undefined;
    reqBody: any | undefined;
    resBody: any;
    status: string;
}

interface RequestData {
    name: string;
    description: string;
    method: string;
    endpoint: string;
    headers: Header[];
    parameters: Parameter[];
    requestBody?: any;
    responses: ExampleResponse[];
}

export default function generateDocumentationFromRequest(title: string, inputData: RequestInputData) {
    const { headerData, paramData, requestBasicInfo, requestBody, savedResponses } = inputData;

    const requestData: RequestData = {
        name: title,
        description: "This is placeholder documentation.",
        method: String(requestBasicInfo.type),
        endpoint: requestBasicInfo.url,
        headers: keyValueToHeader(headerData),
        parameters: keyValueToParams(paramData),
        requestBody: requestBody,
        responses: convertSavedResponse(savedResponses),
    };

    return generateRequestDocumentation(requestData);
}
function generateRequestDocumentation(requestData: RequestData): string {
    const template = `## Request Documentation: ${requestData.name}
  
  ### Description
  
  ${requestData.description}
  
  ### Endpoint
  
  ${requestData.method} ${requestData.endpoint}
  
  ${
      requestData.headers.length > 0
          ? `### Headers

  | Header     | Value            | Description               |
  | ---------- | ---------------- | ------------------------- |
  ${requestData.headers.map((header) => `| ${header.name} | ${header.value} | ${header.description} |`).join("\n")}
  `
          : ""
  }

  ${
      requestData.headers.length > 0
          ? `### Parameters

          | Parameter     | Type               | Description                  |
          | ------------- | ------------------ |  ---------------------------- |
          ${requestData.parameters
              .map((param) => `| ${param.name} | ${param.type} | ${param.description} |`)
              .join("\n")}
          `
          : ""
  }
  

  
  
  ${
      requestData.requestBody
          ? "### Request Body\n\n```json\n" + JSON.stringify(JSON.parse(requestData.requestBody), null, 2) + "\n```"
          : ""
  }
  
  
  
  ${requestData.responses.map(generateExampleResponseTable).join("\n")}
  
  `;

    return template;
}

function generateExampleResponseTable(exampleResponse: ExampleResponse): string {
    const headersTable =
        exampleResponse.headers && Object.keys(exampleResponse.headers).length > 0
            ? `
  ### Responses

  | Header       | Value                 |
  | ------------ | --------------------- |
  ${Object.entries(exampleResponse.headers)
      .map(([name, value]) => `| ${name} | ${value} |`)
      .join("\n")}
  `
            : "";

    const paramsTable =
        exampleResponse.params && Object.keys(exampleResponse.params).length > 0
            ? `
  | Parameter    | Value                 |
  | ------------ | --------------------- |
  ${Object.entries(exampleResponse.params)
      .map(([name, value]) => `| ${name} | ${value} |`)
      .join("\n")}
  `
            : "";

    return `
  #### Example Response
  
  ${headersTable ? "#### Headers\n" + headersTable : ""}
  
  ${paramsTable ? "#### Parameters\n" + paramsTable : ""}
  
  ${
      exampleResponse.reqBody
          ? "#### Request Body\n" + "```json\n" + JSON.stringify(exampleResponse.reqBody, null, 2) + "\n```"
          : ""
  }
  ##### Status
  
  ${exampleResponse.status}

  ##### Response Body
  
  \`\`\`json
  ${JSON.stringify(exampleResponse.resBody, null, 2)}
  \`\`\`
  `;
}

function keyValueToHeader(keyValues: KeyValue[]) {
    let header: Header[] = [];
    keyValues.forEach((keyValue) => {
        if (keyValue.isChecked && keyValue.key.trim() !== "")
            header.push({
                name: keyValue.key,
                value: keyValue.value,
                description: "",
            });
    });
    return header;
}

function keyValueToParams(keyValues: KeyValue[]) {
    let params: Parameter[] = [];
    keyValues.forEach((keyValue) => {
        if (keyValue.key.trim() !== "")
            params.push({
                name: keyValue.isChecked ? keyValue.key : keyValue.key + " (Optional)",
                type: String(typeof keyValue.value),
                description: "",
            });
    });
    return params;
}

function convertSavedResponse(savedResponses: ResponseObject[]) {
    let responses: ExampleResponse[] = [];
    savedResponses.forEach((data) => {
        responses.push({
            headers: data.requestData?.header,
            params: data.requestData?.params,
            reqBody: data.requestData?.bodyObj,
            resBody: data.body,
            status: data.responseStats,
        });
    });
    return responses;
}
