const puppy = require("puppeteer");
const fs = require("fs");

let finalData = [];
let playersUrls = [];
async function main(){
    let browser = await puppy.launch({
        headless: false;
        defaultViewport: false,
        args: ["--start-maximized"]
    });

    let tabs = await browser.pages();
    let tab = tabs[0];
    await tab.goto("https://www.cricbuzz.com/cricket-series/3130/indian-premier-league-2020/squads");
    
    let teams = await tab.$$(".cb-col.cb-col-100.cb-series-brdr.cb-stats-lft-ancr");
    for(let i = 0; i < teams.length; i++){
        let teamName = await tab.evaluate(function(ele){
            return ele.textContent;
        }, teams[i]);
        finalData.push({"teamName": teamName, "players": []});
        await teams[i].click();
        // await tab.waitForNavigation({waitUntil: "networkidle2"}); --> asynchronous setTimeout

        await new Promise(function(resolve, reject){ //--> Synchronous setTimeout()
            setTimeout(resolve, 2000);
        })
        await getPlayers(tab);
    }
    for(let playersUrl of playersUrls ){
        await getPlayerInfo(playersUrl, i);
    }
    fs.writeFileSync("players.json", JSON.stringify(finalData));
    
    
    
}

async function getPlayers(tab){
    
    let playersNameDiv = await tab.$$(".cb-font-16.text-hvr-underline");

    let players = await tab.$$(".cb-col.cb-col-50");
    for(let i = 0; i < players.length; i++){
        let urls = await tab.evaluate(function(ele){
            return ele.getAttribute("href");
        },player[i]);
        playersUrls.push("https://www.cricbuzz.com" + url);
        let playersName = await tab.evaluate(function(ele){
            return ele.textContent;
        }, playersNameDiv[i]);
        finalData[idx]["players"][i]["playerName"] = playersName);

    }
    
    // console.log(playersUrls);
    

}

async function getPlayerInfo(url, tab){
    await tab.goto(url);
}
main();