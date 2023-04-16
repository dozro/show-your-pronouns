import {PronounsPageUser} from "../src/PronounsPageUser";
import {Language} from "../src";
import {PronounsUser} from "../src/PronounsUser";
//import fetch from 'node-fetch';

const { JSDOM } = require('jsdom');
const fetch = require('node-fetch');

test('positive Test with user example as example', async () => {
    const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
    const {document} = dom.window;
    PronounsUser.setupForTests(document, fetch);
    let exampleUser: PronounsPageUser = new PronounsPageUser("example", Language.en);
    await exampleUser.fetchPronouns();
    expect(exampleUser.getOpinionOnName("Dominique")).toBe(1);
});