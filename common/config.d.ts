export interface Config {
    mockService: {
        host: string;
        port: number;
    };
    logging: boolean;
}
declare let config: Config;
export { config };
