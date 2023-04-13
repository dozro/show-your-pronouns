import { Language } from "./Language";
enum PronounsProvider{
    pronounsPage = 'pronouns.page',
    pronounsAlejo = 'pronouns.alejo.io'
}
var pronounsUsers = new Map();
class PronounsPageUser{
    username: String;
    data: JSON;
    language: Language;
    provider: PronounsProvider;
    constructor(username:String, language:Language, provider:PronounsProvider = PronounsProvider.pronounsPage){
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
    }
    public getAvatar():URL{
        if(this.provider != PronounsProvider.pronounsPage){
            return new URL('https://pronouns.page/static/img/default.png');
        }
        var retVal:URL;
        // @ts-ignore: TS2339
        retVal = new URL(this.data.avatar);
        return retVal;
    }
    public setLanguage(language:Language):void{
        this.language = language;
    }
    public getAge():Number{
        if(this.provider != PronounsProvider.pronounsPage){
            return -1;
        }
        var retVal:Number;
        retVal = eval('this.data.profiles.' + this.language + '.age');
        return retVal;
    }
    public getPronounsList():Array<String>{
        var retVal:Array<String> = new Array();
        if(this.provider == PronounsProvider.pronounsAlejo){
            // @ts-ignore: TS7053
            retVal.push(this.data[0].pronoun_id);
            return retVal;
        }
        var raw:any;
        raw = eval('this.data.profiles.' + this.language + '.pronouns');
        for (const pronoun in raw) {
            console.debug(`${pronoun}: ${raw[pronoun]}`);
            if(raw[pronoun] >= 0){
                retVal.push(pronoun);
            }
        }
        return retVal;
    }

}
async function newPronounsUser(username:String, language:Language = Language.en, provider:PronounsProvider = PronounsProvider.pronounsPage):Promise<PronounsPageUser>{
    if(pronounsUsers.has(username)){
        pronounsUsers.get(username).setLanguage(language);
        return pronounsUsers.get(username);
    } else {
        pronounsUsers.set(username, new PronounsPageUser(username, language,provider));
        await pronounsUsers.get(username).fetchPronouns();
        return pronounsUsers.get(username);
    }
}
export async function getPronounsUser(username:String, language:Language = Language.en):Promise<PronounsPageUser>{
    return newPronounsUser(username, language, PronounsProvider.pronounsPage);
}
export async function getPronounsPageUser(username:String, language:Language = Language.en):Promise<PronounsPageUser>{
    return getPronounsUser(username,language);
}
export async function getPronounsOfUser(username:String, language:Language = Language.en):Promise<Array<String>>{
    const p:PronounsPageUser = await getPronounsUser(username, language);
    return p.getPronounsList();
}
export async function getAgeOfUser(username:String):Promise<Number>{
    const p:PronounsPageUser = await getPronounsUser(username, Language.en);
    return p.getAge();
}
export async function getFormattedPronounsOfUser(username:String, language:Language = Language.en):Promise<String>{
    const p:PronounsPageUser = await getPronounsUser(username, language);
    return p.getPronounsList().join(', ');
}
export async function getHTMLFormattedPronounsOfUser(username:String, language:Language = Language.en):Promise<HTMLSpanElement>{
    var retVal:HTMLSpanElement = document.createElement('span');
    const p:PronounsPageUser = await getPronounsUser(username, language);
    var pronouns:Array<String> = p.getPronounsList();
    for (const pronoun of pronouns) {
        var pa:HTMLAnchorElement = document.createElement('a');
        pa.classList.add('pronoun');
        pa.href = "https://" + language + ".pronouns.page/" + pronoun;
        pa.target = "_blank";
        pa.innerText = String(pronoun);
        const spacer = document.createTextNode(", ");
        retVal.appendChild(pa);
        retVal.appendChild(spacer);
    }
    return retVal;
}