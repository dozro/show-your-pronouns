import {test} from '@jest/globals';
import {Pronouns} from "../src/Pronouns";
import {PronounsLookup} from "../src/PronounsLookup";
import {Language} from "../src";

const fetch = require('node-fetch');

test("test pronounsLookup", async () => {
    let p:Pronouns = new Pronouns("she", Language.en);
    PronounsLookup.setupForTests(fetch);
    let pl:PronounsLookup = new PronounsLookup(p);
    await pl.lookup();
    console.info(await pl.getExamples());
})
