import {PronounsPageUser} from "../src/PronounsPageUser";
import {Language} from "../src";
import {PronounsUser} from "../src/PronounsUser";
import {expect, jest, test} from '@jest/globals';
import {UserNotFoundError} from "../src/Errors/UserNotFoundError";
import * as assert from "assert";

const { JSDOM } = require('jsdom');
const fetch = require('node-fetch');

test('test getOpinionOnName (1)', async () => {
    const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
    const {document} = dom.window;
    PronounsUser.setupForTests(document, fetch);
    let exampleUser: PronounsPageUser = new PronounsPageUser("example", Language.en);
    await exampleUser.fetchPronouns();
    return expect(exampleUser.getOpinionOnName("Dominique")).toBe(1);
});
test("InvalidUserTest-PronounsPage", async () => {
    const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
    const {document} = dom.window;
    PronounsUser.setupForTests(document, fetch);
    let thisUserDoesNotExist: PronounsPageUser = new PronounsPageUser("j", Language.en);
//    return expect(thisUserDoesNotExist.fetchPronouns).toThrowError(new UserNotFoundError());
})
