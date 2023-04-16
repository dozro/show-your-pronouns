import {PrideFlag} from "../src/PrideFlags";
const { JSDOM } = require('jsdom');

test('test PrideFlags at the example of the Transgender Pride-Flag', () => {
    const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
    const { document } = dom.window;
    var tF:PrideFlag = new PrideFlag("trans",new URL("https://pronouns.page/flags/Transgender.png"));
    tF.setupForTests(document);
    expect(tF.getAsImg().src).toBe("https://pronouns.page/flags/Transgender.png");
    expect(tF.getAsImg().className).toBe("prideFlag");
});