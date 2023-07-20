import { getClient } from "@tauri-apps/api/http";
import { RequestType } from "../common/interfaces/NewRequest";
import { Body } from "@tauri-apps/api/http";

export async function sendHttpRequest(
    url: string,
    requestType: RequestType,
    headers: Record<string, string>,
    query: Record<string, string>,
    bodyJson: Record<any, any> = {}
) {
    const client = await getClient();
    const body = Body.json(bodyJson);
    const response = await client.request({
        method: requestType,
        query,
        url,
        headers,
        body,
    });
    await client.drop();
    return response;
}
