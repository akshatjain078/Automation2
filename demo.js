let puppeteer=require('puppeteer');
let browserwillbelaunched=puppeteer.launch({
    headless:false,
    defaultViewport:null,
    rgs:['--start-maximized']
})

browserwillbelaunched.then(function(browserInstance){
    let newtab=browserInstance.newPage();
    return newtab;
}).then(function(newtab){
    let pagewillbeopened=newtab.goto('https://www.pepcoding.com/')
    return pagewillbeopened;
}).then(function(webpage){
    console.log('website opened');
})