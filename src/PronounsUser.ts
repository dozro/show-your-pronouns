import {Language} from "./Language";
import {PronounsProvider} from "./PronounsProvider";
import {NoDataBecauseUserNotFound} from "./Errors/UserNotFoundError";
export abstract class PronounsUser{
    protected username: String;
    protected data: JSON;
    protected language: Language;
    protected provider: PronounsProvider;
    protected errorWhileFetching:boolean;
    protected static testDocument:Document;
    protected static testFetch:Function;
    public static setupForTests(document:Document, fetch:Function):void{
        console.info("setting up PronounsUser for testing purposes; if this message appears in production systems there is a bug");
        PronounsUser.testDocument = document;
        PronounsUser.testFetch = fetch;
    }

    /**
     * This is an asynchronous function that returns a JSON object after fetching pronouns data if it's
     * not already available.
     * 
     * @return A Promise that resolves to a JSON object.
     */
    protected async getData():Promise<JSON>{
        if(this.errorWhileFetching)
            throw new NoDataBecauseUserNotFound("There was previously an error while trying to fetch data. Therefor no data is available.");
        if(this.data == null)
            await this.fetchPronouns();
        return this.data;
    }
    protected getDataNoFetch():JSON{
        if(this.errorWhileFetching)
            throw new NoDataBecauseUserNotFound("There was previously an error while trying to fetch data. Therefor no data is available.");
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
    public abstract fetchPronouns():Promise<void>;
    /**
     * This function returns the avatar URL of a user, with a default URL if the user is not using the
     * Pronouns Page provider.
     * 
     * @return A Promise that resolves to a URL.
     */
    public abstract getAvatar():Promise<URL>;
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
    public abstract getAge():Promise<Number>;
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
    public abstract getPronounsList(minimumOpinion:number):Promise<string[]>;
    /**
     * This function returns an array of pride flags based on the language and provider selected, with
     * a warning if the provider is not compatible.
     * 
     * @return An array of strings representing pride flags. If the provider is "PronounsAlejo", an
     * empty array is returned and a warning message is logged.
     */
    public abstract getPrideFlags():Array<string>;
    /**
     * This function returns a numerical value based on the input pronoun, either from a predefined
     * provider or from a JSON object.
     * 
     * @param pronoun The pronoun parameter is a string that represents the pronoun for which the
     * function will return an opinion.
     * 
     * @return a number, which is either 1 or the value of the pronoun in the JSON data.
     */
    public abstract getOpinionOnPronouns(pronoun:String):Number;
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
        let doc:Document = (PronounsUser.testDocument != undefined)? PronounsUser.testDocument : window.document;
        var retVal:HTMLSpanElement = doc.createElement('span');
        for (const pronoun of (await this.getPronounsList(0))) {
            var pa:any;
            if(withLinks){
                pa = doc.createElement('a');
                pa.href = "https://" + this.language + ".pronouns.page/" + pronoun;
                pa.target = "_blank";
            } else {
                pa = document.createElement('span');
            }
            pa.classList.add('pronoun');
            var pronounsElement:HTMLSpanElement = doc.createElement('span');
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
            const spacer = doc.createTextNode(", ");
            retVal.appendChild(pa);
            retVal.appendChild(spacer);
        }
        return retVal;
    }

}
