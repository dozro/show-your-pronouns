const shieldsURL:URL = new URL('https://badges.thejulian.uk/badge/pronouns-');
export function getPronounsBadge(pronouns:string[]):HTMLImageElement{
    const pronounsBadge:HTMLImageElement = document.createElement('img');
    pronounsBadge.src = shieldsURL.href + pronouns.join('%2C');
    pronounsBadge.alt = 'pronouns: ' + pronouns.join(', ');
    return pronounsBadge;
}