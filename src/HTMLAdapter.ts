import { PronounsUser } from './PronounsUser';
import { Language } from './Language';
import { PronounsProvider } from './PronounsProvider';
import { getPronounsBadge } from './PronounsBadge-HTMLAdapter';
import { newUser, users } from './UserMng';
import { PronounsPagePrideFlags } from './PronounsPagePrideFlags';
import "./style/preferredNames.scss";

/**
 * This function returns a Promise that resolves to a PronounsUser object with the specified username
 * and language.
 *
 * @param username The username parameter is a string that represents the username of the user whose
 * pronouns are being retrieved.
 * @param language The `language` parameter is an optional parameter of type `Language` that specifies
 * the language in which the user wants to receive the pronouns. If no language is specified, the
 * default language is English (`Language.en`).
 *
 * @return a Promise that resolves to a PronounsUser object. The PronounsUser object is created using
 * the newUser function, which takes in a username, language, and a PronounsProvider.pronounsPage
 * parameter.
 */
export async function getUser(username:string, language:Language = Language.en):Promise<PronounsUser>{
    return newUser(username, language, PronounsProvider.pronounsPage);
}
/**
 * This function returns a PronounsUser object for a given username and language.
 *
 * @param username The username parameter is a string that represents the username of the user whose
 * pronouns page is being requested.
 * @param language The `language` parameter is an optional parameter of type `Language` that specifies
 * the language in which the pronouns should be returned. If no language is specified, the default
 * language is English (`Language.en`).
 *
 * @return a Promise that resolves to a PronounsUser object.
 */
export async function getPronounsPageUser(username:string, language:Language = Language.en):Promise<PronounsUser>{
    return getUser(username,language);
}
/**
 * This TypeScript function retrieves the pronouns of a user in a specified language.
 *
 * @param username The username parameter is a string that represents the username of the user whose
 * pronouns we want to retrieve.
 * @param language The `language` parameter is an optional parameter of type `Language` that specifies
 * the language in which the pronouns should be returned. If no language is specified, the default
 * language is English (`Language.en`).
 *
 * @return The function `getPronounsOfUser` returns a promise that resolves to an array of strings
 * representing the pronouns of the user with the given `username` and `language`.
 */
export async function getPronounsOfUser(username:string, language:Language = Language.en):Promise<Array<String>>{
    const p:PronounsUser = await getUser(username, language);
    return p.getPronounsList(0);
}
/**
 * This TypeScript function retrieves the age of a user by their username using an external getUser
 * function.
 *
 * @param username The username parameter is a string that represents the username of the user whose
 * age we want to retrieve.
 *
 * @return the age of a user as a number, which is obtained by calling the `getAge()` method of a
 * `PronounsUser` object retrieved by calling the `getUser()` function with a username and language as
 * parameters.
 */
export async function getAgeOfUser(username:string):Promise<Number>{
    const p:PronounsUser = await getUser(username, Language.en);
    return await p.getAge();
}
/**
 * This TypeScript function retrieves and formats the pronouns of a user in a specified language.
 *
 * @param username The username is a string parameter that represents the username of the user whose
 * pronouns we want to retrieve.
 * @param language The `language` parameter is an optional parameter of type `Language` that specifies
 * the language in which the pronouns should be returned. If no language is specified, the default
 * language is English (`Language.en`).
 * @param minimumOpinion The `minimumOpinion` parameter is an optional parameter of type `number` that
 * specifies the minimum opinion of a pronoun that should be returned. If no minimum opinion is
 * specified, the default minimum opinion is 0.
 *
 * @return a Promise that resolves to a string representing the formatted pronouns of a user. The
 * formatted pronouns are obtained by calling the `getPronounsList()` method of a `PronounsUser`
 * object, which is retrieved by calling the `getUser()` function with the provided `username` and
 * `language` parameters. The pronouns are joined together with commas and returned as
 */
export async function getFormattedPronounsOfUser(username:string, language:Language = Language.en, minimumOpinion:number = 0):Promise<String>{
    const p:PronounsUser = await getUser(username, language);
    return (await p.getPronounsList(minimumOpinion)).join(', ');
}
/**
 * This function retrieves a user's pronouns and returns them in HTML format.
 *
 * @param username The username of the user whose pronouns you want to retrieve and format in HTML.
 * @param language The `language` parameter is an optional parameter of type `Language` that specifies
 * the language in which the pronouns should be returned. If no language is specified, the default
 * language is English (`Language.en`).
 *
 * @return a Promise that resolves to an HTMLSpanElement.
 */
export async function getHTMLFormattedPronounsOfUser(username:string, language:Language = Language.en):Promise<HTMLSpanElement>{
    const p:PronounsUser = await getUser(username, language);
    return (await p.getHTMLFormattedPronouns(true));
}
/**
 * This function retrieves the HTML-formatted pronouns of a user without a link.
 *
 * @param username The username of the user whose pronouns you want to retrieve and format.
 * @param language The `language` parameter is a `Language` enum type that specifies the language in
 * which the pronouns should be retrieved. It has a default value of `Language.en`, which means English
 * language.
 *
 * @return A Promise that resolves to an HTMLSpanElement representing the formatted pronouns of a user
 * without a link.
 */
export async function getHTMLFormattedPronounsOfUserNoLink(username:string, language:Language = Language.en):Promise<HTMLSpanElement>{
    const p:PronounsUser = await getUser(username, language);
    return (await p.getHTMLFormattedPronouns(false));
}
/**
 * This TypeScript function retrieves the preferred names of a user in a specified language.
 *
 * @param username The username parameter is a string that represents the username of the user whose
 * preferred names are being retrieved.
 * @param language The `language` parameter is a `Language` enum type that specifies the language in
 * which the user prefers to receive their pronouns. It has a default value of `Language.en`, which
 * means English.
 *
 * @return an array of strings which contains the preferred names of a user in a specific language. The
 * function uses the `getUser` function to retrieve the `PronounsUser` object for the given `username`
 * and `language`. Then, it calls the `getNamesList` method of the `PronounsUser` object with a
 * parameter of 1 to get an array of
 */
export async function getPreferedNamesOfUser(username:string, language:Language = Language.en, minimumOpinion:number = 1):Promise<Array<String>>{
    const p:PronounsUser = await getUser(username, language);
    return p.getNamesList(minimumOpinion);
}
/**
 * This TypeScript function retrieves a list of names associated with a user, based on a minimum
 * opinion threshold.
 *
 * @param username The username of the user whose names are to be retrieved.
 * @param language The `language` parameter is an optional parameter of type `Language` that specifies
 * the language in which the user's pronouns are to be retrieved. If no language is specified, the
 * default language is English (`Language.en`).
 * @param minimumOpinion The minimumOpinion parameter is an optional parameter that specifies the
 * minimum opinion score required for a name to be included in the returned list. If a name has an
 * opinion score lower than the minimumOpinion value, it will not be included in the list. If no value
 * is provided for minimumOpinion
 *
 * @return a Promise that resolves to an array of strings. The array contains all the names of a user,
 * based on their pronoun preferences, that meet a minimum opinion threshold.
 */
export async function getAllNamesOfUser(username:string, language:Language = Language.en, minimumOpinion:number = -1):Promise<Array<String>>{
    const p:PronounsUser = await getUser(username, language);
    return p.getNamesList(minimumOpinion);
}
/**
 * This TypeScript function takes a username, language, and minimum opinion as parameters, retrieves a
 * list of names associated with the user, and returns an HTML element displaying the names with
 * formatting based on the user's opinion.
 *
 * @param username The username of the PronounsUser whose names we want to format and display.
 * @param language The language parameter is an optional parameter that specifies the language in which
 * the user's pronouns and names should be retrieved. If not specified, it defaults to English
 * (Language.en).
 * @param minimumOpinion The minimumOpinion parameter is a number that represents the minimum opinion
 * score a name must have in order to be included in the list of names returned by the function. The
 * default value is 0, which means that all names will be included regardless of their opinion score.
 *
 * @return an HTML element (specifically, a `span` element) that contains a formatted list of names
 * associated with a user, based on their pronoun preferences and opinions on those names. The
 * formatting includes bold and colored text to indicate the user's opinion on each name.
 */
export async function getHTMLFormattedNamesOfUser(username:string, language:Language = Language.en, minimumOpinion:number = 0):Promise<HTMLElement>{
    const p:PronounsUser = await getUser(username, language);
    var retVal:HTMLElement = document.createElement('span');
    var counter = 0;
    for (const name of p.getNamesList(minimumOpinion)) {
        counter++;
        var nameElement:HTMLSpanElement = document.createElement('span');
        nameElement.innerHTML = String(name);
        if(p.getOpinionOnName(name) == 1){
            nameElement.className = "pronouns-preferred-names-preffered";
        } else if(p.getOpinionOnName(name) == 0){
            nameElement.className = "pronouns-preferred-names-okay";
        } else if(p.getOpinionOnName(name) == -1){
            nameElement.className = "pronouns-preferred-names-no";
        }
        retVal.append(nameElement);
        if(counter < p.getNamesList(minimumOpinion).length){
            const spacer = document.createTextNode(", ");
            retVal.appendChild(spacer);
        }
    }
    return retVal;
}
/**
 * This TypeScript function retrieves a user's pronouns and returns an HTML image element of their
 * pronoun badge.
 *
 * @param username The username of the user whose pronouns badge you want to retrieve.
 * @param language The `language` parameter is an optional parameter of type `Language` that specifies
 * the language in which the pronouns should be retrieved. If no language is specified, the default
 * language is English (`Language.en`).
 *
 * @return a Promise that resolves to an HTMLImageElement.
 */
export async function getPronounsBadgeOfUser(username:string, language:Language = Language.en):Promise<HTMLImageElement>{
    const p:PronounsUser = await getUser(username, language);
    p.setLanguage(language);
    return getPronounsBadge(await p.getPronounsList(1));
}
/**
 * This TypeScript function retrieves the pride flags of a user and returns them as an HTML span
 * element.
 *
 * @param username The username of the user whose pride flags you want to retrieve.
 * @param language The `language` parameter is an optional parameter of type `Language` that specifies
 * the language in which the user's pronouns and pride flags should be displayed. If no language is
 * specified, the default language is English (`Language.en`).
 * @param heightOfFlags `heightOfFlags` is a number that determines the height (in pixels) of the pride
 * flags that will be displayed. By default, it is set to 30 pixels.
 *
 * @return a Promise that resolves to an HTMLSpanElement containing one or more pride flags associated
 * with the user's pronouns.
 */
export async function getPrideFlagsOfUser(username:string, language:Language = Language.en, heightOfFlags:number = 30):Promise<HTMLSpanElement>{
    const p:PronounsUser = await getUser(username, language);
    p.setLanguage(language);
    var retVal:HTMLSpanElement = document.createElement('span');
    for (const flag of p.getPrideFlags()) {
        retVal.appendChild(new PronounsPagePrideFlags(flag).getAsImg());
    }
    retVal.classList.add('prideFlags');
    return retVal;
}
