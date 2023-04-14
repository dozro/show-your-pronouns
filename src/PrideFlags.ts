export class PrideFlag{
    name: string;
    imgSrc: URL;
    constructor(name: string, emoji: URL){
        this.name = name;
        this.imgSrc = emoji;
    }
    /**
     * This TypeScript function creates an HTML image element with specified height and attributes for
     * a pride flag.
     * 
     * @param heightOfFlag The height of the pride flag image in pixels. The default value is 30 pixels
     * if no value is provided when calling the function.
     * 
     * @return an HTMLImageElement.
     */
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