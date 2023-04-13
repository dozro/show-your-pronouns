export class PronounsBadge{
    private shieldsURL:URL;
    private stylingForPronounsBadge:string;
    constructor(shieldsURL:URL = new URL('https://badges.thejulian.uk/badge/pronouns-'), stylingForPronounsBadge:string = "for-the-badge"){
        this.shieldsURL = shieldsURL;
        this.stylingForPronounsBadge = stylingForPronounsBadge;
    }
    public getPronounsBadge(pronouns:string[], color:string = "orange"):HTMLImageElement{
        const pronounsBadge:HTMLImageElement = document.createElement('img');
        pronounsBadge.src = this.shieldsURL.href + pronouns.join('%2F') + '-' + color + '.svg' + '?style=' + this.stylingForPronounsBadge;
        pronounsBadge.alt = 'pronouns: ' + pronouns.join(', ');
        return pronounsBadge;
    }
    public setShieldsUrl(shieldsURL:URL):void{
        this.shieldsURL = shieldsURL;
    }
    public setStylingForPronounsBadge(stylingForPronounsBadge:string):void{
        this.stylingForPronounsBadge = stylingForPronounsBadge;
    }
}
