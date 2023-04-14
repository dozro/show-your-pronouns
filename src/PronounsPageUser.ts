import { PronounsUser } from "./PronounsUser";

export class PronounsPageUser extends PronounsUser {
    
    public getNamesList(minimumOpinion:number = 0):Array<string>{
        var retVal:Array<string> = new Array();
        var raw:JSON;
        raw = eval('this.data.profiles.' + this.language + '.names');
        for (const name in raw) {
            // @ts-ignore
            if(raw[name] >= minimumOpinion)
                retVal.push(name);
        }
        return retVal;
    }
}