import {PronounsPageUser} from "../src/PronounsPageUser";
import {Language} from "../src";
import {PronounsUser} from "../src/PronounsUser";
import {expect, jest, test} from '@jest/globals';
import {UserNotFoundError} from "../src/Errors/UserNotFoundError";
import * as assert from "assert";

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
test("this should throw", async () => {
    const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
    const {document} = dom.window;
    PronounsUser.setupForTests(document, fetch);
    try {
        let thisUserDoesNotExist: PronounsPageUser = new PronounsPageUser("j", Language.en);
        thisUserDoesNotExist.fetchPronouns();
        expect(false);
    } catch (e){
        expect(e instanceof UserNotFoundError);
    }
})