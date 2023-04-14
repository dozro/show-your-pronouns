export class PrideFlag{
    name: string;
    imgSrc: URL;
    constructor(name: string, emoji: URL){
        this.name = name;
        this.imgSrc = emoji;
    }
    public getAsImg(heightOfFlag:number = 30):HTMLImageElement{
        var retVal:HTMLImageElement = document.createElement('img');
        retVal.src = this.imgSrc.toString();
        retVal.alt = this.name + " pride flag";
        retVal.title = this.name + " pride flag";
        retVal.className = "prideFlag";
        retVal.height = heightOfFlag;
        return retVal;
    }
}