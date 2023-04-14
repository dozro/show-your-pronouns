import {PrideFlag} from './PrideFlags';
export class PronounsPagePrideFlags extends PrideFlag{
    private static prideFlagRoot: string = 'https://pronouns.page/flags/';
    constructor(name: string){
        super(name, new URL(PronounsPagePrideFlags.prideFlagRoot + name + '.png'));
    }
}