let email = 'wojoya7662@lankew.com'
let pw = 'Akshatjain'
let puppeteer = require('puppeteer');
const codeFile = require('./code')
let page;
let browserwillbelaunched = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized'],
    slowMo:20
})

browserwillbelaunched
.then(function (browserInstance) {
    let newtab = browserInstance.newPage();
    return newtab;
}).then(function (newtab) {
    page = newtab;
    let pagewillbeopened = newtab.goto('https://www.hackerrank.com/auth/login')
    return pagewillbeopened;
}).then(function () {
    console.log('website opened');
}).then(function () {
    let typedEmailPromise = page.type("input[id='input-1']", email, {
        delay: 100,
    });
    return typedEmailPromise;
})
    .then(function () {
        let typePasswordPromise = page.type("input[id='input-2']", pw, {
            delay: 100,
        });
        return typePasswordPromise;
    })
    .then(function () {
        let loginPromise = page.click('button[data-analytics="LoginPassword"]', {
            delay: 100,
        });
        return loginPromise;
    }).then(function(){
      console.log("Login done");
        let algoWillBeclickedPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]' , page)
        return algoWillBeclickedPromise;
      }).catch(function(){
        let algoWillBeclickedPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]' , page)
        return algoWillBeclickedPromise;
      })
      
      .then(function(){
        console.log('Algo Section Clicked')
        let warmupwillbeclickedpromise=waitAndClick('input[value="warmup"]',page)
        return warmupwillbeclickedpromise;
      }).then(function(){
        console.log('warm up clicked')
        let allpagespromise=page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled');
        return allpagespromise
      }).then(function(allpagesarr){
        console.log(allpagesarr.length)
        let questionWillBeSolvedPromise = questionSolver(page , allpagesarr[0] , codeFile.answers[0] )
      }).catch(function(err){
        console.log(err);
      })

    //    function waitAndClick(selector , cPage){
    //      return new Promise(function(resolve  , reject){
    //        let waitForModalPromise = cPage.waitForSelector(selector, {visible: true});
    //        waitForModalPromise.then(function(){
            
    //          let clickModalPromise = cPage.evaluate(function(sel){
    //            document.querySelector(sel).click();
    //          }, selector);
    //          clickModalPromise.then(function(){
    //            resolve()
    //          }).catch(function(err){
    //            console.log(err);
    //            reject();
    //          })
    //        }).catch(function(err){
    //          console.log(err);
    //          reject()
    //        })
    //      })

    //  }

     function waitAndClick(selector, cPage) {
      return new Promise(function (resolve, reject) {
        let waitForModalPromise = cPage.waitForSelector(selector,{visible:true});
        waitForModalPromise
          .then(function () {
            let clickModalPromise = cPage.click(selector);
            return clickModalPromise;
          })
          .then(function () {
            resolve();
          })
          .catch(function (err) {
            console.log(err);
            reject();
          });
      });
    }

    function questionSolver(page , question , answer){
      return new Promise(function(){
        let questionWillBeClickedPromise =  question.click()
        questionWillBeClickedPromise.then(function(){
          return waitAndClick('.checkBoxWrapper .label-wrap',page);
        }).then(function(){
          return page.waitForSelector('.text-area.custominput')
        }).then(function(){
          return page.type('.text-area.custominput',answer,{delay:0})
        }).then(function(){
          let ctrlispresspromise=page.keyboard.down('Control');
          return ctrlispresspromise
        }).then(function(){
          let Aispresspromis=page.keyboard.press('A',{delay:20});
          return Aispresspromis
        }).then(function(){
          let Xispresspromise=page.keyboard.press('X',{delay:20});
          return Xispresspromise
        }).then(function(){
          let ctrlIsReleasedPromise = page.keyboard.up('Control')
          return ctrlIsReleasedPromise
       }).then(function () {
         let waitForEditorPromise = waitAndClick(
           ".monaco-editor",
           page
         );
        // let waitForEditorPromise=page.type('.monaco-editor'," ",{delay:100}) 
        // .monaco-editor.no-user-select.vs
         return waitForEditorPromise;
       }).then(function () {
         let ctrlonHoldPromise = page.keyboard.down('Control');
         return ctrlonHoldPromise
       }).then(function(){
         let AisPressedPromise = page.keyboard.press('A' , {delay : 20});
         return AisPressedPromise
       }).then(function(){
        let VisPressedPromise = page.keyboard.press('V' , {delay:20})
        return VisPressedPromise
     }).then(function(){
      let ctrlIsReleasedPromise = page.keyboard.up('Control')
      return ctrlIsReleasedPromise
   }).then(function(){
    return page.click('.hr-monaco__run-code' , {delay : 20})
 }).then(function(){
   resolve()
 }).catch(function(err){
   console.log(err)
 })
    
 
      })   
 }