import {Language} from "./Language";
import {PronounsProvider} from "./PronounsProvider";
export class PronounsUser{
    username: String;
    data: JSON;
    language: Language;
    provider: PronounsProvider;
    private async getData():Promise<JSON>{
        if(this.data == null)
            await this.fetchPronouns();
        return this.data;
    }
    constructor(username:String, language:Language, provider:PronounsProvider = PronounsProvider.pronounsPage){
        if(provider == undefined)
            provider = PronounsProvider.pronounsPage;
        this.username = username;
        this.language = language;
        this.provider = provider;
        this.fetchPronouns()
    }
    public async fetchPronouns():Promise<void>{
        var response
            if(this.provider == PronounsProvider.pronounsAlejo){
                response = await fetch('https://pronouns.alejo.io/api/users/' + this.username);
            } else if(this.provider == PronounsProvider.pronounsPage){
                response = await fetch('https://pronouns.page/api/profile/get/'+this.username);
            }
            this.data = await response.json();
            if (response.status == 404){
                this.data = null;
                throw new Error('User not found');
            }
    }
    public async getAvatar():Promise<URL>{
        if(this.provider != PronounsProvider.pronounsPage){
            return new URL('https://pronouns.page/static/img/default.png');
        }
        var retVal:URL;
        // @ts-ignore
        retVal = new URL(await (this.getData()).avatar);
        return retVal;
    }
    public setLanguage(language:Language):void{
        this.language = language;
    }
    public async getAge():Promise<Number>{
        if(this.provider != PronounsProvider.pronounsPage){
            return -1;
        }
        var retVal:Number;
        const raw:JSON = await this.getData();
        retVal = eval('raw.profiles.' + this.language + '.age');
        return retVal;
    }
    public async getPronounsList():Promise<string[]>{
        var retVal:Array<string> = new Array();
        if(this.provider == PronounsProvider.pronounsAlejo){
            // @ts-ignore
            retVal.push(await (this.getData()[0]).pronoun_id);
            return retVal;
        }
        var raw:JSON = await (this.getData());
        raw = eval('raw.profiles.' + this.language + '.pronouns');
        for (const pronoun in raw) {
            // @ts-ignore
            console.debug(`${pronoun}: ${raw[pronoun]}`);
            // @ts-ignore
            if(raw[pronoun] >= 0){
                retVal.push(pronoun);
            }
        }
        return retVal;
    }
    public getOpinionOnPronouns(pronoun:String):Number{
        var retVal:Array<String> = new Array();
        if(this.provider == PronounsProvider.pronounsAlejo){
            // @ts-ignore
            retVal.push(this.data[0].pronoun_id);
            return 1;
        }
        var raw:JSON;
        raw = eval('this.data.profiles.' + this.language + '.pronouns');
        // @ts-ignore
        return raw[pronoun];
    }
    public getOpinionOnName(name:string):number{
        var retVal:Array<String> = new Array();
        if(this.provider == PronounsProvider.pronounsAlejo){
            // @ts-ignore
            retVal.push(this.data[0].name);
            return 1;
        }
        var raw:JSON;
        raw = eval('this.data.profiles.' + this.language + '.names');
        // @ts-ignore
        return raw[name];
    }
    public getNamesList(minimumOpinion:number = 0):Array<string>{
        var retVal:Array<string> = new Array();
        if(this.provider == PronounsProvider.pronounsAlejo){
            // @ts-ignore
            retVal.push(this.data[0].name);
            return retVal;
        }
        var raw:JSON;
        raw = eval('this.data.profiles.' + this.language + '.names');
        for (const name in raw) {
            // @ts-ignore
            if(raw[name] >= minimumOpinion)
                retVal.push(name);
        }
        return retVal;
    }
    public async getHTMLFormattedPronouns(withLinks:boolean):Promise<HTMLSpanElement>{
        var retVal:HTMLSpanElement = document.createElement('span');
        for (const pronoun of (await this.getPronounsList())) {
            var pa:any;
            if(withLinks){
                pa = document.createElement('a');
                pa.href = "https://" + this.language + ".pronouns.page/" + pronoun;
                pa.target = "_blank";
            } else {
                pa = document.createElement('span');
            }
            pa.classList.add('pronoun');
            var pronounsElement:HTMLSpanElement = document.createElement('span');
            pronounsElement.innerHTML = pronoun;
            if(this.getOpinionOnPronouns(pronoun) == 1){
                pronounsElement.style.fontWeight = "bold";
                pronounsElement.style.color = "green";
            } else if(this.getOpinionOnPronouns(pronoun) == 0){
                pronounsElement.style.color = "orange";
            } else if(this.getOpinionOnPronouns(pronoun) == -1){
                pronounsElement.style.color = "red";
            }
            pa.append(pronounsElement);
            const spacer = document.createTextNode(", ");
            retVal.appendChild(pa);
            retVal.appendChild(spacer);
        }
        return retVal;
    }

}
