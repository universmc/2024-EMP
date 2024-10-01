import { APIResource } from '../../resource';
import * as AudioAPI from './audio';
import * as TranscriptionsAPI from './transcriptions';
import * as TranslationsAPI from './translations';
export declare class Audio extends APIResource {
    transcriptions: TranscriptionsAPI.Transcriptions;
    translations: TranslationsAPI.Translations;
}
export interface Translation {
    text: string;
}
export declare namespace Audio {
    export import Translation = AudioAPI.Translation;
    export import Transcriptions = TranscriptionsAPI.Transcriptions;
    export import Transcription = TranscriptionsAPI.Transcription;
    export import TranscriptionCreateParams = TranscriptionsAPI.TranscriptionCreateParams;
    export import Translations = TranslationsAPI.Translations;
    export import TranslationCreateParams = TranslationsAPI.TranslationCreateParams;
}
//# sourceMappingURL=audio.d.ts.map