$(function() {
	$(document).items('http://schema.org/MusicAlbum').each(function() {
		var node = $(this);

		var albumName = node.microdata('name');
		var artistName = node.microdata('byArtist').microdata('name');
		var query = 'artist:' + artistName + ' album:' + albumName;

		var status = $('<span/>').appendTo(node);

		var handleProgress = function(text) {
			status.text(text);
		};

		var handleFail = function(text) {
			if (typeof console == 'function') {
				console.log(text);
			}

			status.remove();
		}

		var request = $.spotify.search('album', query).done(function(data) {
			if (data.albums.length) {
				status.text('Fetching…');

				var request = $.spotify.lookup(data.albums[0].href, { extras: 'track' }).done(function(data) {
					status.remove();
					$.spotify.link(data.album.href, '(' + data.album.released + ')').appendTo(node);
				});

				request.progress(handleProgress).fail(handleFail);
			} else {
				status.remove();
			}
		});

		request.progress(handleProgress).fail(handleFail);

	});
})