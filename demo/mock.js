var ratelimit = 2;

// rate limit
$.mockjax({
	url: 'http://ws.spotify.com/lookup/1/',
	data: {
		uri: 'spotify:album:4BMYwbOZd1i9vraiSXtSkg',
		extras: 'track',
	},
	response: function() {
		if (--ratelimit) {
			this.status = 403;
		} else {
			this.status = 200;

			this.responseText = {
				album: {
					href: 'spotify:album:4BMYwbOZd1i9vraiSXtSkg',
					released: '2013',
				}
			};
		}
	}
});

// unknown server error
$.mockjax({
	url: 'http://ws.spotify.com/lookup/1/',
	data: {
		uri: 'spotify:album:159ORixBSSemxiualv1Woj',
		extras: 'track',
	},
	response: function() {
		this.status = 503;
	}
});
