import {expect, test, beforeEach} from '@jest/globals';
import {Pronouns} from "../src/Pronouns";
import {PronounsLookup} from "../src/PronounsLookup";
import {Language} from "../src";
import {PronounsPagePronounsLookupMorphemes} from "../src/Interfaces/PronounsPagePronounsLookupMorphemes";
import {response} from "express";
import {LanguageNotYetSupportedError} from "../src/Errors/LanguageNotYetSupportedError";

const fetch = require('node-fetch');

let p:Pronouns;
let pl:PronounsLookup;
PronounsLookup.setupForTests(fetch);
beforeEach(() => {
   p = new Pronouns("she", Language.en);
   pl = new PronounsLookup(p);
})

test("test getMorphemes", () => {
    return pl.getMorphemes().then((re:PronounsPagePronounsLookupMorphemes) => {
        expect(re.pronoun_object).toBe("her");
        expect(re.pronoun_subject).toBe("she");
    });
})
test("germanTest Morphemes", async () => {
    let p_de:Pronouns = new Pronouns("ey", Language.de);
    let pl_de:PronounsLookup = new PronounsLookup(p_de);
//    return expect(pl_de.getMorphemes).toThrowError(new LanguageNotYetSupportedError);
})
