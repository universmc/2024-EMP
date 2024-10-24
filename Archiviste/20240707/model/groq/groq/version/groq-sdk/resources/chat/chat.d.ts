import { APIResource } from '../../resource';
import * as CompletionsAPI from './completions';
export declare class Chat extends APIResource {
    completions: CompletionsAPI.Completions;
}
export declare namespace Chat {
    export import Completions = CompletionsAPI.Completions;
    export import ChatCompletion = CompletionsAPI.ChatCompletion;
    export import CompletionCreateParams = CompletionsAPI.CompletionCreateParams;
}
//# sourceMappingURL=chat.d.ts.map