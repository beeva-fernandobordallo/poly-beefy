'use strict';

PFE.utils = {};

/* LOCAL STORAGE UTILITIES */

PFE.utils.localStorageAvailable = function() {
	if (typeof window.localStorage === 'object') {
		try {
			window.localStorage.setItem('test', 'data');
			window.localStorage.removeItem('test');
			return true;
		} catch (e) {
			// Local Storage not available. Create a mem cache node in namespace
			PFE.memCache = {};
			return false;
		}
	}
	return false;
}

PFE.utils.saveLocalStore = function(key, data) {
	window.localStorage.setItem(key, data);
}

PFE.utils.getLocalStore = function (key) {
	var item = window.localStorage.getItem(key);
	if(item){
		return JSON.parse(item).data;
	}
	return null;
}

PFE.utils.removeLocalStore = function (key) {
	// Abstract
}

PFE.utils.clearLocalStore = function () {
	// Abstract
}

PFE.utils.buildDataString = function (data) {
	var obj = {
		meta: Date.now(),
		data: data
	};
	return JSON.stringify(obj);
}


/* AUTHORIZATION UTILITIES */

PFE.utils.authLink = function(state, user, token, msg) {
	if(state === 'failure'){
		// Authentication failed - Handle
		// TODO
		console.log(msg);
		return;
	}

	if(PFE.isLocalStorage){
		PFE.utils.saveLocalStore('userInfo', PFE.utils.buildDataString(user));
		PFE.utils.saveLocalStore('accessToken', PFE.utils.buildDataString(token));
	} else {
		PFE.memCache.userInfo = user;
		PFE.memCache.accessToken = token;
	}
	PFE.app.user = user;
	PFE.app.token = token;
}

PFE.utils.checkOldSession = function () {
	if(PFE.isLocalStorage){
		PFE.app.user = PFE.utils.getLocalStore('userInfo');
		PFE.app.token = PFE.utils.getLocalStore('accessToken');
	}
}