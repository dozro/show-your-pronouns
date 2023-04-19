import * as config from "./config";
import {Pronouns} from "./Pronouns";
import {Language} from "./Language";
import {PronounsUser} from "./PronounsUser";
import {PronounsPagePronounsLookupApiResponse} from "./Interfaces/PronounsPagePronounsLookupApiResponse";
import {PronounsPagePronounsLookupMorphemes} from "./Interfaces/PronounsPagePronounsLookupMorphemes";

export class PronounsLookup{
    private pronouns:Pronouns;
    private baseURL:string;
    private data:PronounsPagePronounsLookupApiResponse;
    private static testFetch:Function;
    public constructor(pronouns:Pronouns) {
        this.pronouns = pronouns;
        this.baseURL = config.default.pronounsLookUp.protocol + "://" + pronouns.lang + "." + config.default.pronounsLookUp.host + config.default.pronounsLookUp.basePath + "/";
    }
    public async getData():Promise<PronounsPagePronounsLookupApiResponse>{
        if(this.data === undefined)
            await this.lookup();
        return this.data;
    }
    public async lookup(){
        let requestURL:string = this.baseURL + this.pronouns.getCanonicalName();
        let fetchFunc:Function = (PronounsLookup.testFetch != undefined) ? PronounsLookup.testFetch: window.fetch;
        var response = await fetchFunc(requestURL);
        this.data = await response.json();
    }
    public async getExamples():Promise<Array<string>>{
        let data:PronounsPagePronounsLookupApiResponse = await this.getData();
        let retVal:Array<string> = data.examples;
        return retVal;
    }
    public async getMorphemes():Promise<PronounsPagePronounsLookupMorphemes>{
        let data:PronounsPagePronounsLookupApiResponse = await this.getData();
        let retVal:PronounsPagePronounsLookupMorphemes = data.morphemes;
        return retVal;
    }

    public static setupForTests(fetch:Function):void{
        console.info("setting up PronounsLookup for testing")
        PronounsLookup.testFetch = fetch;
    }
}
