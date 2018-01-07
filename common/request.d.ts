export declare type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";
export declare class Request {
    httpRequest: any;
    httpsRequest: any;
    request: any;
    responseBody: string;
    constructor();
    send(method: HTTPMethod, url: string, body?: string): Promise<string>;
}
