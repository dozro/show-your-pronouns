import * as _ from 'lodash';
import { PronounsPageUser } from './PronounsPageUser';
import { Language } from './Language';
import { PronounsProvider } from './PronounsProvider';
import { getPronounsBadge } from './PronounsBadge';
var users = new Map();
export async function newUser(username:string, language:Language = Language.en, provider:PronounsProvider = PronounsProvider.pronounsPage):Promise<PronounsPageUser>{
    if(users.has(username)){
        users.get(username).setLanguage(language);
        return users.get(username);
    } else {
        users.set(username, new PronounsPageUser(username, language,provider));
        await users.get(username).fetchPronouns();
        return users.get(username);
    }
}
export async function getUser(username:string, language:Language = Language.en):Promise<PronounsPageUser>{
    return newUser(username, language, PronounsProvider.pronounsPage);
}
export async function getPronounsPageUser(username:string, language:Language = Language.en):Promise<PronounsPageUser>{
    return getUser(username,language);
}
export async function getPronounsOfUser(username:string, language:Language = Language.en):Promise<Array<String>>{
    const p:PronounsPageUser = await getUser(username, language);
    return p.getPronounsList();
}
export async function getAgeOfUser(username:string):Promise<Number>{
    const p:PronounsPageUser = await getUser(username, Language.en);
    return await p.getAge();
}
export async function getFormattedPronounsOfUser(username:string, language:Language = Language.en):Promise<String>{
    const p:PronounsPageUser = await getUser(username, language);
    return (await p.getPronounsList()).join(', ');
} 
export async function getHTMLFormattedPronounsOfUser(username:string, language:Language = Language.en):Promise<HTMLSpanElement>{
    const p:PronounsPageUser = await getUser(username, language);
    return (await p.getHTMLFormattedPronouns(true));
}
export async function getHTMLFormattedPronounsOfUserNoLink(username:string, language:Language = Language.en):Promise<HTMLSpanElement>{
    const p:PronounsPageUser = await getUser(username, language);
    return (await p.getHTMLFormattedPronouns(false));
}
export async function getPreferedNamesOfUser(username:string, language:Language = Language.en):Promise<Array<String>>{
    const p:PronounsPageUser = await getUser(username, language);
    return p.getNamesList(1);
}
export async function getAllNamesOfUser(username:string, language:Language = Language.en, minimumOpinion:number = -1):Promise<Array<String>>{
    const p:PronounsPageUser = await getUser(username, language);
    return p.getNamesList(minimumOpinion);
}
export async function getHTMLFormattedNamesOfUser(username:string, language:Language = Language.en, minimumOpinion:number = 0):Promise<HTMLElement>{
    const p:PronounsPageUser = await getUser(username, language);
    var retVal:HTMLElement = document.createElement('span');
    var counter = 0;
    for (const name of p.getNamesList(minimumOpinion)) {
        counter++;
        var nameElement:HTMLSpanElement = document.createElement('span');
        nameElement.innerHTML = String(name);
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
export async function getPronounsBadgeOfUser(username:string, language:Language = Language.en):Promise<HTMLImageElement>{
    const p:PronounsPageUser = users.get(username);
    return getPronounsBadge(await p.getPronounsList());
}
export { Language };
export { PronounsProvider };