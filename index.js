const puppeteer = require('puppeteer'); //module imported
const codeObj = require('./Code') //Importing the file codes.js to use in your program
const loginLink = 'https://www.hackerrank.com/auth/login' //hackerrank login link
const email = 'negiranjit250@gmail.com'
const password = '12345678'



let browserOpen = puppeteer.launch({  //browser open work
    headless: false, //for visibility of browser
    args: ['--start-maximized'],//for chromium browser full size
    defaultViewport: null

})

let page //to access it everywhere

//promise fulfilled
browserOpen.then(function (browserObj) {
    let browserOpenPromise = browserObj.newPage() //to open new page
    return browserOpenPromise;
}).then(function (newTab) { //hackerrank tab will open in that new page
    page = newTab
    let hackerrankOpenPromise = newTab.goto(loginLink)
    return hackerrankOpenPromise
}).then(function () {
    let emailIsEntered = page.type("input[id='input-1']", email, { delay: 50 }) //email will be typed at hackerrank email which is targetted by its id
    return emailIsEntered
}).then(function () {
    let passwordIsEntered = page.type("input[type='password']", password, { delay: 50 })//password will be typed at hackerrank password which is targetted by its type
    return passwordIsEntered
}).then(function () { //Login Button will be targetted
    let loginButtonClicked = page.click('button[data-analytics="LoginPassword"]', { delay: 50 })
    return loginButtonClicked
}).then(function () { //Algorithm section target
    let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]', page)
    return clickOnAlgoPromise
}).then(function () { //To get to sub-domain Warmup
    let getToWarmUp = waitAndClick('input[value="warmup"]', page)
    return getToWarmUp
}).then(function () { //Wait for 3 Seconds for the page to reload
    let waitFor3Seconds = page.waitForTimeout(3000)
    return waitFor3Seconds
}).then(function () { //To get the all questions 
    let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', { delay: 50 })//$$ for document.query selector all
    return allChallengesPromise
}).then(function (questionArr) {
    // console.log("Number of questions ",questionArr.length)
    let questionWillBeSolved = questionSolver(page, questionArr[0], codeObj.answer[0]) //Answer to the question
    return questionWillBeSolved
})



//Algorithm Section,SubDomain
//To get to the new page it sometimes takes time loading so we cannot target it using its elements until it is fully loaded,
//this function will wait until its elements are fully available
function waitAndClick(selector, cPage) {
    return new Promise(function (resolve, reject) {
        let waitForModelPromise = cPage.waitForSelector(selector) //selctor available our promise will be fulfilled
        waitForModelPromise.then(function () {
            let clickModal = cPage.click(selector)
            return clickModal
        }).then(function () { //If everything is passed then resolve
            resolve()
        }).catch(function (err) { //If not passed then catch
            reject()
        })
    })
}

function questionSolver(page, question, answer) {
    return new Promise(function (resolve, reject) {
        let questionWillBeClicked = question.click()
        questionWillBeClicked.then(function () {
            let EditorInFocusPromise = waitAndClick('.monaco-editor.no-user-select.vs', page) //Targetting the Editor Area
            return EditorInFocusPromise //Cannot write in the editor area because it autocloses the tagso will write in Test against custom input
        }).then(function () { //Target the area- Test against custom input
            return waitAndClick('.checkbox-input', page) //Wait for the page to reload
        }).then(function () {
            return page.waitForSelector('textarea.custominput', page) //After clicking the checkbox wait for custom area
        }).then(function () {
            return page.type('textarea.custominput', answer, { delay: 10 })  //Answer will be typed
        }).then(function () {
            let ctrlIsPressed = page.keyboard.down('Control') //Ctrl is pressed
            return ctrlIsPressed
        }).then(function () {
            let AisPressed = page.keyboard.press('A', { delay: 100 }) //A is pressed (ctrl + A) Select All
            return AisPressed
        }).then(function () {
            let XisPressed = page.keyboard.press('X', { delay: 100 }) //X is pressed code will be cut
            return XisPressed
        }).then(function () {
            let ctrlisUnpressed = page.keyboard.up('Control') //Ctrl will be unpressed
            return ctrlisUnpressed
        }).then(function () {
            let maineditorinfocus = waitAndClick('.monaco-editor.no-user-select.vs', page) //Focus will be shifted to Editor
            return maineditorinfocus
        }).then(function () {
            let ctrlIsPressed = page.keyboard.down('Control') //Ctrl is pressed
            return ctrlIsPressed
        }).then(function(){
            let AisPressed = page.keyboard.press('A', { delay: 100 }) //A is pressed (ctrl + A) Select All
            return AisPressed
        }).then(function(){
            let VisPressed = page.keyboard.press('V', { delay: 100 }) //V is pressed (ctrl + V) Paste
            return VisPressed
        }).then(function(){
            let ctrlisUnpressed = page.keyboard.up('Control') //Ctrl will be unpressed
            return ctrlisUnpressed
        }).then(function(){
            return page.click('.hr-monaco__run-code',{ delay : 50})
        }).then(function(){
            resolve()
        }).catch(function(err){
                reject();
        })
    })

}
