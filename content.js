// content.js
//alert("Hello from your Chrome extension!")
petbreak = function(){
	//console.log('petbreak!');
	if (window.location.href.match(/twitter.com\/home/i) && petbreakEnabled){
		var petTweets = [];
		articles = document.querySelectorAll('article:not(.not_pets), article:not(.pets)');
		articles.forEach(
			function(item){
				if(item.innerHTML.match(/trump|corona|covid/i) || !item.innerHTML.match(/\b(cat(s)?|dog(go|gy|gie)?(s)?|kitt(y|ies|en(s)?)|pup(per|po)?(s)?|pet(s)?)\b/i)){
					item.classList.add("not_pets");
					tweetContainer = item.parentNode.parentNode;
					tweetContainer.setAttribute("style","display:none");
					//now get rid of thread message
					threadMessage = tweetContainer.nextSibling;
					if (threadMessage && threadMessage.innerHTML.match(/Show this thread|Show more replies/)){
						threadMessage.setAttribute("style","display:none");
					}	
				}else{
					item.classList.add("pets");
					petTweets.push(item);
				}
			}
		);	
		var masterContainerHeight = 1000;
		petTweets.forEach(
			function(petTweet){
				masterContainerHeight+=petTweet.offsetHeight;
			}
		);
		masterContainer.setAttribute("style", "position:relative; min-height:" + masterContainerHeight + "px;");
	}
};

var masterContainer = null;
var observer = new MutationObserver(petbreak);
var petbreakEnabled = false;

setInterval(function(){
	chrome.storage.local.get(['petbreakEnabled'], function(result) {
		console.log('petbreakEnabled: ' + result.petbreakEnabled);
		if (result.petbreakEnabled) {
			petbreakEnabled=result.petbreakEnabled;
			if (petbreakEnabled){
				if (window.location.href.match(/\btwitter.com/i) && document.querySelector('section')){
					masterContainer = document.querySelector('section').children[1].children[0];
					petbreak();
					if (masterContainer){
						observer.observe(masterContainer, {childList: true});
					}
				}
			}
		} else if (document.querySelector('article.not_pets, article.pets')){
			window.location.reload(false);
		}
	});
	
},3000);