import { PronounsBadge } from "./PronounsBadge";
export function getPronounsBadge(pronouns:string[], color:string = "orange"):HTMLImageElement{
    var pBadge = new PronounsBadge();
    return pBadge.getPronounsBadge(pronouns, color);
}