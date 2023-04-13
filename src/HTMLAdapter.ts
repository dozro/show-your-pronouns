import { PronounsUser } from './PronounsUser';
import { Language } from './Language';
import { PronounsProvider } from './PronounsProvider';
import { getPronounsBadge } from './PronounsBadge-HTMLAdapter';
import { newUser, users } from './UserMng';

export async function getUser(username:string, language:Language = Language.en):Promise<PronounsUser>{
    return newUser(username, language, PronounsProvider.pronounsPage);
}
export async function getPronounsPageUser(username:string, language:Language = Language.en):Promise<PronounsUser>{
    return getUser(username,language);
}
export async function getPronounsOfUser(username:string, language:Language = Language.en):Promise<Array<String>>{
    const p:PronounsUser = await getUser(username, language);
    return p.getPronounsList();
}
export async function getAgeOfUser(username:string):Promise<Number>{
    const p:PronounsUser = await getUser(username, Language.en);
    return await p.getAge();
}
export async function getFormattedPronounsOfUser(username:string, language:Language = Language.en):Promise<String>{
    const p:PronounsUser = await getUser(username, language);
    return (await p.getPronounsList()).join(', ');
} 
export async function getHTMLFormattedPronounsOfUser(username:string, language:Language = Language.en):Promise<HTMLSpanElement>{
    const p:PronounsUser = await getUser(username, language);
    return (await p.getHTMLFormattedPronouns(true));
}
export async function getHTMLFormattedPronounsOfUserNoLink(username:string, language:Language = Language.en):Promise<HTMLSpanElement>{
    const p:PronounsUser = await getUser(username, language);
    return (await p.getHTMLFormattedPronouns(false));
}
export async function getPreferedNamesOfUser(username:string, language:Language = Language.en):Promise<Array<String>>{
    const p:PronounsUser = await getUser(username, language);
    return p.getNamesList(1);
}
export async function getAllNamesOfUser(username:string, language:Language = Language.en, minimumOpinion:number = -1):Promise<Array<String>>{
    const p:PronounsUser = await getUser(username, language);
    return p.getNamesList(minimumOpinion);
}
export async function getHTMLFormattedNamesOfUser(username:string, language:Language = Language.en, minimumOpinion:number = 0):Promise<HTMLElement>{
    const p:PronounsUser = await getUser(username, language);
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
    const p:PronounsUser = users.get(username);
    p.setLanguage(language);
    return getPronounsBadge(await p.getPronounsList(1));
}