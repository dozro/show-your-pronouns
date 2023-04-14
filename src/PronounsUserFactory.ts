import { Language } from "./Language";
import { PronounsAlejoUser } from "./PronounsAlejoUser";
import { PronounsPageUser } from "./PronounsPageUser";
import { PronounsUser } from "./PronounsUser";
export function getPronounsUser(provider: string, username: string, language:Language): PronounsUser {
    switch (provider) {
        case 'pronouns.page':
            return new PronounsPageUser(username, language);
        case 'pronouns.alejo.io':
            return new PronounsAlejoUser(username, language);
        default:
            throw new Error('Unsupported provider');
    }
}