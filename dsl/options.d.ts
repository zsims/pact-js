/**
 * Pact Options module.
 * @module PactOptions
 */
import { PactfileWriteMode } from "./mockService";
export interface PactOptions {
    consumer: string;
    provider: string;
    port?: number;
    host?: string;
    ssl?: boolean;
    sslcert?: string;
    sslkey?: string;
    dir?: string;
    log?: string;
    logLevel?: "trace" | "debug" | "info" | "error" | "fatal" | "warn" | undefined;
    spec?: number;
    cors?: boolean;
    pactfileWriteMode?: PactfileWriteMode;
}
export interface MandatoryPactOptions {
    port: number;
    host: string;
    ssl: boolean;
}
export declare type PactOptionsComplete = PactOptions & MandatoryPactOptions;
