import {Language} from "./Language";

export class Pronouns{
    private canonicalName:string;
    private _lang:Language;
    public constructor(canName:string, lang:Language) {
        this.canonicalName = canName;
        this._lang = lang;
    }
    public getCanonicalName(){
        return this.canonicalName;
    }

    get lang(): Language {
        return this._lang;
    }
}
