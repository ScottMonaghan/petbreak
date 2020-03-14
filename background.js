var petbreakEnabled=false
chrome.storage.local.get(['petbreakEnabled'], function(result) {
		if (result.key) {petbreakEnabled=result.key;}
	});

function checkForValidUrl(tabId, changeInfo, tab) {
  if (tab.url.match(/\btwitter.com/i)) 
    chrome.pageAction.show(tabId);
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);

chrome.pageAction.onClicked.addListener(function(tab){
	petbreakEnabled = !petbreakEnabled;
	chrome.storage.local.set({'petbreakEnabled': petbreakEnabled});
	console.log('petbreakEnabled:' + petbreakEnabled);
});