import { PronounsUser } from "./PronounsUser";
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
        var retVal:Array<string> = new Array();
        var raw:JSON;
        raw = eval('this.data.profiles.' + this.language + '.flags');
        for (const flag in raw) {
            // @ts-ignore
            retVal.push(raw[flag]);
        }
        return retVal;
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
    public async fetchPronouns():Promise<void>{
        var response;
        response = await fetch('https://pronouns.alejo.io/api/users/' + this.username);
        this.data = await response.json();
        if (response.status == 404){
            this.data = null;
            throw new Error('User not found');
        }
    }
    public async getAvatar():Promise<URL>{
        var retVal:URL;
        // @ts-ignore
        retVal = new URL(await (this.getData()).avatar);
        return retVal;
    }
}