interface Header {
    name: string;
    value: string;
    description: string;
}

interface Parameter {
    name: string;
    type: string;
    required: "Yes" | "No";
    description: string;
}

interface StatusCode {
    code: number;
    meaning: string;
}

interface Error {
    statusCode: number;
    errorCode: string;
    meaning: string;
}

interface RequestData {
    name: string;
    description: string;
    method: string;
    endpoint: string;
    headers: Header[];
    parameters: Parameter[];
    requestBody?: object;
    exampleRequest: string;
    response: object;
    statusCodes: StatusCode[];
    errors: Error[];
}

function generateRequestDocumentation(requestData: RequestData): string {
    const template = `# Request Documentation: ${requestData.name}
  
  ## Description
  
  ${requestData.description}
  
  ## Endpoint
  
  ${requestData.method} ${requestData.endpoint}
  
  ## Headers
  
  ${requestData.headers.length === 0 ? "None" : ""}
  
  | Header     | Value            | Description               |
  | ---------- | ---------------- | ------------------------- |
  ${requestData.headers.map((header) => `| ${header.name} | ${header.value} | ${header.description} |`).join("\n")}
  
  ## Parameters
  
  ${requestData.parameters.length === 0 ? "None" : ""}
  
  | Parameter     | Type               | Required | Description                  |
  | ------------- | ------------------ | -------- | ---------------------------- |
  ${requestData.parameters
      .map((param) => `| ${param.name} | ${param.type} | ${param.required} | ${param.description} |`)
      .join("\n")}
  
  ## Request Body (if applicable)
  
  ${requestData.requestBody ? "```json\n" + JSON.stringify(requestData.requestBody, null, 2) + "\n```" : "None"}
  
  ## Example Request
  
  \`\`\`
  ${requestData.exampleRequest}
  \`\`\`
  
  ## Response
  
  \`\`\`json
  ${JSON.stringify(requestData.response, null, 2)}
  \`\`\`
  
  Status Codes
  
  ${requestData.statusCodes.map((statusCode) => `${statusCode.code} ${statusCode.meaning}`).join("\n")}
  
  Errors
  
  ${requestData.errors.map((error) => `${error.statusCode} ${error.errorCode} ${error.meaning}`).join("\n")}
  `;

    return template;
}

//   // Example input data
//   const requestData: RequestData = {
//     name: "Example Request",
//     description: "This is an example request for documentation generation.",
//     method: "GET",
//     endpoint: "/api/example",
//     headers: [
//       { name: "Authorization", value: "Bearer token", description: "Authentication token" },
//       { name: "Content-Type", value: "application/json", description: "Request content type" },
//     ],
//     parameters: [
//       { name: "id", type: "string", required: "Yes", description: "ID of the item" },
//       { name: "page", type: "number", required: "No", description: "Page number for pagination" },
//     ],
//     requestBody: {
//       property1: "value1",
//       property2: "value2",
//     },
//     exampleRequest:
//       'curl -X GET "/api/example?id=12345" -H "Authorization: Bearer token" -H "Content-Type: application/json"',
//     response: {
//       status: 200,
//       data: {
//         property1: "value1",
//         property2: "value2",
//       },
//     },
//     statusCodes: [
//       { code: 200, meaning: "OK" },
//       { code: 400, meaning: "Bad Request" },
//     ],
//     errors: [
//       { statusCode: 400, errorCode: "ERR-001", meaning: "Invalid Request" },
//       { statusCode: 401, errorCode: "ERR-002", meaning: "Unauthorized" },
//     ],
//   };

//   const documentation = generateRequestDocumentation(requestData);
//   console.log(documentation);
