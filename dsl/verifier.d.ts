import { VerifierOptions } from "@pact-foundation/pact-node";
import { Promise } from "es6-promise";
export declare class Verifier {
    verifyProvider(opts: VerifierOptions): Promise<string>;
}
