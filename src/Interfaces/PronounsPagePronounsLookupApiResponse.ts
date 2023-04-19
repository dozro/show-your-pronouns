import {PronounsPagePronounsLookupMorphemes} from "./PronounsPagePronounsLookupMorphemes";
export interface PronounsPagePronounsLookupApiResponse {
    canonicalName:string,
    description:string,
    normative:boolean,
    morphemes:PronounsPagePronounsLookupMorphemes,
    pronunciations:JSON,
    plural:Array<string>,
    pluralHonorific:Array<string>,
    aliases:Array<string>,
    history:string,
    pronounceable:boolean,
    thirdForm:string,
    smallForm:string,
    sourcesInfo:any,
    examples:Array<string>,
    name:string
}
