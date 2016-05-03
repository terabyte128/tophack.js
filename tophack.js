Notification.requestPermission();

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

console.log("### TopHack v0.1 ###");

// define a new observer
var obs = new MutationObserver(function(mutations, observer) {
  // look through all mutations that just occured
  for(var i = 0; i < mutations.length; i++) {
    // look through all added nodes of this mutation
    for(var j = 0; j < mutations[i].addedNodes.length; j++) {
      var change = mutations[i].addedNodes[j];

      // for some reason we have to wait a bit for questions to load
      setTimeout(function() {
        try {
          var n = new Notification('New Top Hat Question', {
            'body': change.querySelector('.thm_panel_body > .question_details_tab > #question_body > div > div > .question_container > table > tbody > tr > .question_description_content > div > p').textContent
          });
        } catch(e) {
          console.log(e);
        }
      }, 500);
    }
  }
});


// this doesn't immediately work, so persist until it does
function startObserve() {
  try {
    // have the observer observe the panel for children to appear
    obs.observe($(".panels").get(2), {
      childList: true
    });
    console.log("#### TopHack loading complete. ####")
  } catch(e) {
    console.log("#### TopHack observer hook failed, trying again in 2 seconds. ####");
    console.log(e);
    setTimeout(startObserve, 2000);
  }
}

startObserve();
