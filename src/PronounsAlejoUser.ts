import { PronounsUser } from "./PronounsUser";
import {UserNotFoundError} from "./Errors/UserNotFoundError";
export class PronounsAlejoUser extends PronounsUser {
    public getNamesList(minimumOpinion:number = 0):Array<string>{
        var retVal:Array<string> = new Array();
        // @ts-ignore
        retVal.push(this.data[0].name);
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
        // @ts-ignore
        retVal.push(this.data[0].pronoun_id);
        return 1;

    }
    public getPrideFlags():Array<string>{
        console.warn('PronounsAlejo does not support pride flags');
        throw new Error('PronounsAlejo does not support pride flags');
    }
    public async getPronounsList(minimumOpinion:number = 0):Promise<string[]>{
        var retVal:Array<string> = new Array();
        // @ts-ignore
        retVal.push(await (this.getData()[0]).pronoun_id);
        return retVal;
    }
    public async getAge():Promise<Number>{
        throw new Error('PronounsAlejo does not support age');
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
        return 1;
    }
    public async fetchPronouns():Promise<void>{
        var response;
        response = await fetch('https://pronouns.alejo.io/api/users/' + this.username);
        this.data = await response.json();
        if (response.status == 404){
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
}
