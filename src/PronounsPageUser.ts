import { PronounsUser } from "./PronounsUser";
import {UserNotFoundError} from "./Errors/UserNotFoundError";

export class PronounsPageUser extends PronounsUser {

    public getNamesList(minimumOpinion:number = 0):Array<string>{
        var retVal:Array<string> = new Array();
        var raw:JSON;
        const data:JSON = this.getDataNoFetch();
        raw = eval('data.profiles.' + this.language + '.names');
        for (const name in raw) {
            // @ts-ignore
            if(raw[name] >= minimumOpinion)
                retVal.push(name);
        }
        return retVal;
    }
    /**
     * This function returns a numerical value based on the input pronoun, either from a predefined
     * provider or from a JSON object.
     *
     * @param pronoun The pronoun parameter is a string that represents the pronoun for which the
     * function will return an opinion.
     *
     * @return a number, which is either 1 or the value of the pronoun in the JSON data.
     */
    public getOpinionOnPronouns(pronoun:String):Number{
        var raw:JSON;
        const data:JSON = this.getDataNoFetch();
        raw = eval('data.profiles.' + this.language + '.pronouns');
        // @ts-ignore
        return raw[pronoun];
    }
    public getPrideFlags():Array<string>{
        var retVal:Array<string> = new Array();
        var raw:JSON;
        const data:JSON = this.getDataNoFetch();
        raw = eval('data.profiles.' + this.language + '.flags');
        for (const flag in raw) {
            // @ts-ignore
            retVal.push(raw[flag]);
        }
        return retVal;
    }
    public async getPronounsList(minimumOpinion:number = 0):Promise<string[]>{
        var retVal:Array<string> = new Array();
        var raw:JSON = await (this.getData());
        raw = eval('raw.profiles.' + this.language + '.pronouns');
        for (const pronoun in raw) {
            // @ts-ignore
            console.debug(`${pronoun}: ${raw[pronoun]}`);
            // @ts-ignore
            if(raw[pronoun] >= minimumOpinion){
                retVal.push(pronoun);
            }
        }
        return retVal;
    }
    public async getAge():Promise<Number>{
        var retVal:Number;
        retVal = eval('raw.profiles.' + this.language + '.age');
        return retVal;
    }
    public async fetchPronouns():Promise<void>{
        var response;
        let fetchFunc:Function = (PronounsUser.testFetch != undefined) ? PronounsUser.testFetch: window.fetch;
        response = await fetchFunc('https://pronouns.page/api/profile/get/'+this.username);
        this.data = await response.json();
        if (response.status == 404
            || !this.data.hasOwnProperty('id')
        ){
            this.data = null;
            this.errorWhileFetching = true;
            throw new UserNotFoundError('User not found');
        }
    }
    public async getAvatar():Promise<URL>{
        var retVal:URL;
        // @ts-ignore
        retVal = new URL(await (this.getData()).avatar);
        return retVal;
    }
    /**
     * This function takes in a name as a string and returns a number indicating the opinion on that
     * name based on the fetched data.
     *
     * @param name The parameter "name" is a string representing a name for which the function will
     * return an opinion (a number).
     *
     * @return a number that represents the opinion on a given name. The opinion is based on the data
     * stored in the object's `data` property, which is accessed based on the language and provider. If
     * the provider is `pronounsAlejo`, the function returns 1 and adds the first name in the `data`
     * array to the `retVal` array.
     */
    public getOpinionOnName(name:string):number{
        var raw:JSON;
        raw = eval('this.data.profiles.' + this.language + '.names');
        // @ts-ignore
        return raw[name];
    }
}
