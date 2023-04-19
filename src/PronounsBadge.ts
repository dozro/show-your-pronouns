import {Pronouns} from "./Pronouns";
import {Language} from "./Language";
import {PronounsLookup} from "./PronounsLookup";
import {sendSnackbar} from "./misc/Snackbar";

export class PronounsBadge{
    /** `private shieldsURL:URL;` is declaring a private instance variable `shieldsURL` of type `URL` in
    the `PronounsBadge` class. This variable is used to store the base URL for the shields.io
    service, which is used to generate the pronouns badge image. The `private` keyword makes this
    variable accessible only within the `PronounsBadge` class and not from outside the class. */
    private shieldsURL:URL;
    private stylingForPronounsBadge:string;
    private logo:string;
    private logoColor:string;
    constructor(
        shieldsURL:URL = new URL('https://badges.thejulian.uk/badge/pronouns-'),
        stylingForPronounsBadge:string = "for-the-badge",
        logo:string = "data:image/png;base64,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",
        logoColor:string = "white"
        ){
        this.shieldsURL = shieldsURL;
        this.stylingForPronounsBadge = stylingForPronounsBadge;
        this.logo = logo;
        this.logoColor = logoColor;
    }
    /**
     * This function creates an HTML image element for displaying a badge with pronouns, color, and height
     * parameters.
     *
     * @param pronouns An array of strings representing the pronouns to be displayed on the badge.
     * @param color The color parameter is a string that specifies the color of the badge. It has a default
     * value of "orange" if no value is provided.
     * @param height The height of the image element that will be returned by the function. It is set to a
     * default value of 20 if no value is provided when the function is called.
     *
     * @return an HTMLImageElement, which is an object representing an image element in the HTML document.
     */
    public getPronounsBadge(pronouns:string[], color:string = "orange", height:number = 20):HTMLImageElement{
        const pronounsBadge:HTMLImageElement = document.createElement('img');
        pronounsBadge.src = this.shieldsURL.href + pronouns.join('%2F') + '-' + color + '.svg' + '?style=' + this.stylingForPronounsBadge + '&logo=' + this.logo + '&logoColor=' + this.logoColor;
        pronounsBadge.alt = 'pronouns: ' + pronouns.join(', ');
        pronounsBadge.height = height;
        pronounsBadge.className = 'pronouns-badge';
        return pronounsBadge;
    }
    public async getPronounsBadgeWithExamplesOnClick(pronouns:string[], color:string = "orange", height:number = 20, language:Language = Language.en):Promise<HTMLImageElement>{
        const pronounsBadge:HTMLImageElement = document.createElement('img');
        pronounsBadge.src = this.shieldsURL.href + pronouns.join('%2F') + '-' + color + '.svg' + '?style=' + this.stylingForPronounsBadge + '&logo=' + this.logo + '&logoColor=' + this.logoColor;
        pronounsBadge.alt = 'pronouns: ' + pronouns.join(', ');
        pronounsBadge.height = height;
        pronounsBadge.className = 'pronouns-badge';
        pronounsBadge.addEventListener("click", async (e) => {
            let msg:string = "";
            for(let i = 0; i < pronouns.length; i++){
                let pn0:Pronouns = new Pronouns(pronouns[i],language);
                let pnl:PronounsLookup = new PronounsLookup(pn0);
                let msgPart:string = (await pnl.getMorphemes()).pronoun_subject + ", " +  (await pnl.getMorphemes()).pronoun_object + ", " +  (await pnl.getMorphemes()).possessive_determiner + ", " +  (await pnl.getMorphemes()).possessive_determiner + ", " +  (await pnl.getMorphemes()).reflexive + "<br>";
                msg+=msgPart;
            }
            sendSnackbar(msg);
        })
        return pronounsBadge;
    }
    /**
     * This function sets the shieldsURL property of an object to a given URL.
     *
     * @param shieldsURL shieldsURL is a parameter of type URL that is passed to the function
     * setShieldsUrl(). The function sets the value of the class variable shieldsURL to the value of
     * the parameter.
     */
    public setShieldsUrl(shieldsURL:URL):void{
        this.shieldsURL = shieldsURL;
    }
    public setStylingForPronounsBadge(stylingForPronounsBadge:string):void{
        this.stylingForPronounsBadge = stylingForPronounsBadge;
    }
}
