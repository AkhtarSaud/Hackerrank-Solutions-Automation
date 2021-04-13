const puppy = require("puppeteer");
// let fs=require("fs");

const id = "libope2873@astarmax.com";
const pass = "akhtar2000";
let dataToType = "fuwefukjfh";
let tab;
let moderators = [
    "nocidi6371",
    "ralariv999",
    "yasekin473",
    "sibaje3329",

]

async function main(){  ///puppy ka hr method promise return krta h to usko resolve krne k lie await use krte h aur await bs async function m h use hota h
    let browser=await puppy.launch({
        headless:false,
        defaultViewport:false , // ye sirf puppy m krna hota h sel m jaroorat nh padti
        args:["--start-maximized"]
    });
    let tabs=await browser.pages();  //sare tabs ko array m store kr leta h  
    tab=tabs[0];  // by default 1 h tab khulta h aur hme usi ko store kr lengr tab m
    await tab.goto("https://www.hackerrank.com/auth/login")  // default tab p hackerrank chlao
    await tab.type("#input-1",id);   //type id
    await tab.type("#input-2",pass);  // type password
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled")  //click log in button
    await tab.waitForNavigation({waitUntil:"networkidle2"});  //waiting for that tab to get stable when network is sitting idle
    await tab.click(".username.text-ellipsis");  //clicking dropdown
    await tab.click("a[data-analytics=NavBarProfileDropDownAdministration]"); //click on administration
    await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav li",{visible:true});
    let admninistrationButtons=await tab.$$(".nav-tabs.nav.admin-tabbed-nav li");  //challenge and contest wala tabs
    // await tab.waitForSelector(admninistrationButtons[1]);
    await admninistrationButtons[1].click();  //manage  challenge p click kr dia
    await tab.waitForSelector(".btn.btn-green.backbone.pull-right");
    let createChallenegButton=await tab.$(".btn.btn-green.backbone.pull-right",{visible:true});// click on create challenge
    let createChallengeUrl=await tab.evaluate(function(ele){
        return ele.getAttribute("href");
    },createChallenegButton);
    for(let i=0;i<5;i++){
    await createChallenge("https://www.hackerrank.com"+createChallengeUrl);
    }

    // await browser.close();
}

async function createChallenge(url){
    await tab.goto(url);
    await tab.waitForSelector("#name",{visible:true});
    await tab.type("#name",dataToType);
    await tab.type("#preview",dataToType);
    await tab.waitForSelector(".CodeMirror textarea",{visible:true});
    let fourBoxes=await tab.$$(".CodeMirror textarea");
    for(let i=0;i<fourBoxes.length;i++){
        await fourBoxes[i].type(dataToType);
    }
    await tab.waitForSelector("#tags_tag",{visible:true});
    await tab.type("#tags_tag",dataToType);
    await tab.keyboard.press("Enter");
    await tab.click(".save-challenge.btn.btn-green");
    await tab.waitForSelector('li[data-tab="moderators"]');
    await tab.click('li[data-tab="moderators"]');
    await tab.waitForSelector("#moderator",{visible:true});
    for(let i=0;i<moderators.length;i++){
        await tab.waitForSelector("#moderator");
        await tab.type("#moderator", moderators[i]);
        await tab.keyboard.press("Enter");
    }

    await tab.click(".save-challenge.btn.btn-green");

}

main();