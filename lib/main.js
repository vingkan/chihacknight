window.userKey = sessionStorage.getItem('user-key') || null;
window.breakoutSelection = null;

window.selectBreakout = function(){
	if(window.breakoutSelection){
		var fb_url = 'http://firedates.firebaseio.com/chihacknight/breakouts/' + window.breakoutSelection + '/responders';
		var fb =  new Firebase(fb_url);
		if(window.userKey){
			var found = false;
			fb.once('value', function(s){
				var r = s.val();
				for(var i in r){
					if(i === window.userKey){
						found = true;
						var ref = new Firebase('http://firedates.firebaseio.com/chihacknight/breakouts/' + window.breakoutSelection + '/responders/' + window.userKey);
						ref.remove();
					}
				}
			});
			if(!found){
				fb.child(userKey).set("Attendee");
			}
		}
		else{
			var response = fb.push("Attendee");
			window.userKey = response.key();
			sessionStorage.setItem('user-key', window.userKey);
		}
	}
}