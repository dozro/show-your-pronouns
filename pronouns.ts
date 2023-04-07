enum Language{
    en = 'en',
    de = 'de',
    es = 'es',
    fr = 'fr',
    it = 'it',
    nl = 'nl',
    pt = 'pt'
}
enum PronounsProvider{
    pronounsPage = 'pronouns.page',
    pronounsAlejo = 'pronouns.alejo.io'
}
var users = new Map();
class PronounsPageUser{
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
    public async getPronounsList():Promise<String[]>{
        var retVal:Array<String> = new Array();
        if(this.provider == PronounsProvider.pronounsAlejo){
            retVal.push(await (this.getData()[0]).pronoun_id);
            return retVal;
        }
        var raw:JSON = await (this.getData());
        raw = eval('raw.profiles.' + this.language + '.pronouns');
        for (const pronoun in raw) {
            console.debug(`${pronoun}: ${raw[pronoun]}`);
            if(raw[pronoun] >= 0){
                retVal.push(pronoun);
            }
        }
        return retVal;
    }
    public getOpinionOnPronouns(pronoun:String):Number{
        var retVal:Array<String> = new Array();
        if(this.provider == PronounsProvider.pronounsAlejo){
            retVal.push(this.data[0].pronoun_id);
            return 1;
        }
        var raw:JSON;
        raw = eval('this.data.profiles.' + this.language + '.pronouns');
        return raw[pronoun];
    }
    public getOpinionOnName(name:String):number{
        var retVal:Array<String> = new Array();
        if(this.provider == PronounsProvider.pronounsAlejo){
            retVal.push(this.data[0].name);
            return 1;
        }
        var raw:JSON;
        raw = eval('this.data.profiles.' + this.language + '.names');
        return raw[name];
    }
    public getNamesList(minimumOpinion:number = 0):Array<String>{
        var retVal:Array<String> = new Array();
        if(this.provider == PronounsProvider.pronounsAlejo){
            retVal.push(this.data[0].name);
            return retVal;
        }
        var raw:JSON;
        raw = eval('this.data.profiles.' + this.language + '.names');
        for (const name in raw) {
            if(raw[name] >= minimumOpinion)
                retVal.push(name);
        }
        return retVal;
    }
    public async getHTMLFormattedPronouns(withLinks:boolean):Promise<HTMLSpanElement>{
        var retVal:HTMLSpanElement = document.createElement('span');
        for (const pronoun of (await this.getPronounsList())) {
            var pa:HTMLElement;
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
async function newUser(username:String, language:Language = Language.en, provider:PronounsProvider = PronounsProvider.pronounsPage):PronounsPageUser{
    if(users.has(username)){
        users.get(username).setLanguage(language);
        return users.get(username);
    } else {
        users.set(username, new PronounsPageUser(username, language,provider));
        await users.get(username).fetchPronouns();
        return users.get(username);
    }
}
async function getUser(username:String, language:Language = Language.en):Promise<PronounsPageUser>{
    return newUser(username, language, PronounsProvider.pronounsPage);
}
async function getPronounsPageUser(username:String, language:Language = Language.en):Promise<PronounsPageUser>{
    return getUser(username,language);
}
async function getPronounsOfUser(username:String, language:Language = Language.en):Promise<Array<String>>{
    const p:PronounsPageUser = await getUser(username, language);
    return p.getPronounsList();
}
async function getAgeOfUser(username:String):Promise<Number>{
    const p:PronounsPageUser = await getUser(username, Language.en);
    return await p.getAge();
}
async function getFormattedPronounsOfUser(username:String, language:Language = Language.en):Promise<String>{
    const p:PronounsPageUser = await getUser(username, language);
    return (await p.getPronounsList()).join(', ');
} 
async function getHTMLFormattedPronounsOfUser(username:String, language:Language = Language.en):Promise<HTMLSpanElement>{
    const p:PronounsPageUser = await getUser(username, language);
    return (await p.getHTMLFormattedPronouns(true));
}
async function getHTMLFormattedPronounsOfUserNoLink(username:String, language:Language = Language.en):Promise<HTMLSpanElement>{
    const p:PronounsPageUser = await getUser(username, language);
    return (await p.getHTMLFormattedPronouns(false));
}
async function getPreferedNamesOfUser(username:String, language:Language = Language.en):Promise<Array<String>>{
    const p:PronounsPageUser = await getUser(username, language);
    return p.getNamesList(1);
}
async function getAllNamesOfUser(username:String, language:Language = Language.en, minimumOpinion:number = -1):Promise<Array<String>>{
    const p:PronounsPageUser = await getUser(username, language);
    return p.getNamesList(minimumOpinion);
}
async function getHTMLFormattedNamesOfUser(username:String, language:Language = Language.en, minimumOpinion:number = 0):Promise<HTMLElement>{
    const p:PronounsPageUser = await getUser(username, language);
    var retVal:HTMLElement = document.createElement('span');
    var counter = 0;
    for (const name of p.getNamesList(minimumOpinion)) {
        counter++;
        var nameElement:HTMLSpanElement = document.createElement('span');
        nameElement.innerHTML = name;
        if(p.getOpinionOnName(name) == 1){
            nameElement.style.fontWeight = "bold";
            nameElement.style.color = "green";
        } else if(p.getOpinionOnName(name) == 0){
            nameElement.style.color = "orange";
        } else if(p.getOpinionOnName(name) == -1){
            nameElement.style.color = "red";
        }
        retVal.append(nameElement);
        if(counter < p.getNamesList(minimumOpinion).length){
            const spacer = document.createTextNode(", ");
            retVal.appendChild(spacer);
        }
    }
    return retVal;
}