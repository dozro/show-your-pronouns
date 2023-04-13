import {PronounsUser} from "./PronounsUser";
import {Language} from "./Language";
import {PronounsProvider} from "./PronounsProvider";
export var users = new Map();
export async function newUser(username:string, language:Language = Language.en, provider:PronounsProvider = PronounsProvider.pronounsPage):Promise<PronounsUser>{
    if(users.has(username)){
        users.get(username).setLanguage(language);
        return users.get(username);
    } else {
        users.set(username, new PronounsUser(username, language,provider));
        await users.get(username).fetchPronouns();
        return users.get(username);
    }
}