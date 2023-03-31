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
    constructor(username:String, language:Language, provider:PronounsProvider = PronounsProvider.pronounsPage){
        this.username = username;
        this.language = language;
        this.provider = provider;
        const fetchPronouns = async () => {
            var response
            if(provider == PronounsProvider.pronounsAlejo){
                response = await fetch('https://pronouns.alejo.io/api/users/' + this.username);
            } else if(provider == PronounsProvider.pronounsPage){
                response = await fetch('https://pronouns.page/api/profile/get/'+this.username);
            }
            this.data = await response.json();
        }
        fetchPronouns()
    }
    public getAvatar():URL{
        if(this.provider != PronounsProvider.pronounsPage){
            return new URL('https://pronouns.page/static/img/default.png');
        }
        var retVal:URL;
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
            retVal.push(this.data[0].pronoun_id);
            return retVal;
        }
        var raw:JSON;
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
function newUser(username:String, language:Language = Language.en, provider:PronounsProvider = PronounsProvider.pronounsPage):PronounsPageUser{
    if(users.has(username)){
        users.get(username).setLanguage(language);
        return users.get(username);
    } else {
        users.set(username, new PronounsPageUser(username, language,provider));
        return users.get(username);
    }
}
function getUser(username:String, language:Language = Language.en):PronounsPageUser{
    return newUser(username, language, PronounsProvider.pronounsPage);
}
function getPronounsPageUser(username:String, language:Language = Language.en):PronounsPageUser{
    return getUser(username,language);
}
function getPronounsOfUser(username:String, language:Language = Language.en):Array<String>{
    const p:PronounsPageUser = getUser(username, language);
    return p.getPronounsList();
}
function getAgeOfUser(username:String):Number{
    const p:PronounsPageUser = getUser(username, Language.en);
    return p.getAge();
}
function getFormattedPronounsOfUser(username:String, language:Language = Language.en):String{
    const p:PronounsPageUser = getUser(username, language);
    return p.getPronounsList().join(', ');
}