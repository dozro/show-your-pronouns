import {Language} from "./Language";
import {PronounsProvider} from "./PronounsProvider";
export abstract class PronounsUser{
    username: String;
    data: JSON;
    language: Language;
    provider: PronounsProvider;
    /**
     * This is an asynchronous function that returns a JSON object after fetching pronouns data if it's
     * not already available.
     * 
     * @return A Promise that resolves to a JSON object.
     */
    private async getData():Promise<JSON>{
        if(this.data == null)
            await this.fetchPronouns();
        return this.data;
    }
    /**
     * This is a constructor function that initializes the username, language, and provider properties
     * of an object and fetches pronouns based on the provider.
     * 
     * @param username A string representing the username of the user for whom the pronouns are being
     * fetched.
     * @param language The `language` parameter is a `Language` object that represents the programming
     * language that the user is working with. It is likely an enum or a class that contains constants
     * for different programming languages.
     * @param provider The `provider` parameter is an optional parameter of type `PronounsProvider`
     * that specifies where to fetch the pronouns from. If no value is provided for this parameter, the
     * default value is `PronounsProvider.pronounsPage`, which means that the pronouns will be fetched
     * from
     */
    constructor(username:String, language:Language, provider:PronounsProvider = PronounsProvider.pronounsPage){
        if(provider == undefined)
            provider = PronounsProvider.pronounsPage;
        this.username = username;
        this.language = language;
        this.provider = provider;
        this.fetchPronouns()
    }
    /**
     * This function fetches pronoun data from either the Pronouns Alejo or Pronouns Page API based on
     * the provider specified and throws an error if the user is not found.
     */
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
    /**
     * This function returns the avatar URL of a user, with a default URL if the user is not using the
     * Pronouns Page provider.
     * 
     * @return A Promise that resolves to a URL.
     */
    public async getAvatar():Promise<URL>{
        if(this.provider != PronounsProvider.pronounsPage){
            return new URL('https://pronouns.page/static/img/default.png');
        }
        var retVal:URL;
        // @ts-ignore
        retVal = new URL(await (this.getData()).avatar);
        return retVal;
    }
    /**
     * This function sets the language of the code.
     * 
     * @param language The parameter "language" is of type "Language", which is likely a custom data
     * type or an enum that represents a programming language. The function "setLanguage" takes in a
     * value of this type and sets it as the language property of the object that the function is
     * called on.
     */
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
    /**
     * This function retrieves a list of pronouns based on a minimum opinion score from a provider's
     * data source.
     * 
     * @param minimumOpinion minimumOpinion is a number parameter that represents the minimum opinion
     * score required for a pronoun to be included in the returned list. The opinion score is obtained
     * from the data source and indicates how widely accepted or recognized a particular pronoun is.
     * 
     * @return This function returns a Promise that resolves to an array of strings representing
     * pronouns. The pronouns are filtered based on a minimum opinion score, which is an optional
     * parameter with a default value of 0. The function retrieves the pronouns from a data source
     * based on the provider and language specified. If the provider is "pronounsAlejo", it retrieves
     * the pronoun ID from the first item in
     */
    public async getPronounsList(minimumOpinion:number = 0):Promise<string[]>{
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
            if(raw[pronoun] >= minimumOpinion){
                retVal.push(pronoun);
            }
        }
        return retVal;
    }
    /**
     * This function returns an array of pride flags based on the language and provider selected, with
     * a warning if the provider is not compatible.
     * 
     * @return An array of strings representing pride flags. If the provider is "PronounsAlejo", an
     * empty array is returned and a warning message is logged.
     */
    public getPrideFlags():Array<string>{
        var retVal:Array<string> = new Array();
        if(this.provider == PronounsProvider.pronounsAlejo){
            console.warn('PronounsAlejo does not support pride flags');
            return retVal;
        }
        var raw:JSON;
        raw = eval('this.data.profiles.' + this.language + '.flags');
        for (const flag in raw) {
            // @ts-ignore
            retVal.push(raw[flag]);
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
    public abstract getNamesList(minimumOpinion:number):Array<string>;
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
