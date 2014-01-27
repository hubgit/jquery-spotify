/*
 * jQuery Spotify v0.1
 * https://github.com/hubgit/jquery-spotify
 *
 * Copyright 2014 Alf Eaton
 * Released under the MIT license
 * http://git.macropus.org/mit-license/
 *
 * Date: 2014-01-19
 */
 (function($) {
 	$.spotify = {
 		search: function(type, query, params) {
 			if (typeof query === 'object') {
 				query = $.map(query, function(value, key) {
 					return key + ':' + value;
 				}).join(' ');
 			}

 			var data = $.extend({ q: query }, params);

 			return $.spotify.get('search/1/' + type + '.json', data);
 		},

 		lookup: function(uri, params) {
 			if (typeof uri === 'object') {
 				uri = uri.href;
 			}

 			var data = $.extend({ uri: uri }, params);

 			return $.spotify.get('lookup/1/', data, { priority: true });
 		},

 		get: function(path, data, options) {
 			options = $.extend({ tries: 3 }, options);

 			var params = {
 				url: 'http://ws.spotify.com/' + path,
 				data: data,
 				dataType: 'json',
 				cache: true,
 			};

 			return $.ajaxQueue(params, options);
 		},

 		link: function(url, text) {
 			var options = {
 				href: url,
 				text: text,
 				title: 'Listen in Spotify',
 			};

 			return $('<a/>', options).addClass('open-in-spotify');
 		}
 	};
 })(jQuery);
