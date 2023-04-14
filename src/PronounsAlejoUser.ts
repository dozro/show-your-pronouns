import { PronounsUser } from "./PronounsUser";
export class PronounsAlejoUser extends PronounsUser {
    public getNamesList(minimumOpinion:number = 0):Array<string>{
        var retVal:Array<string> = new Array();
        // @ts-ignore
        retVal.push(this.data[0].name);
        return retVal;
    }
}