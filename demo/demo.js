$(function() {
	$(document).items('http://schema.org/MusicAlbum').each(function() {
		var node = $(this);

		var albumName = node.microdata('name');
		var artistName = node.microdata('byArtist').microdata('name');
		var query = { artist: artistName, album: albumName };

		var status = $('<span/>').appendTo(node);

		var handleProgress = function(jqXHR, textStatus, item) {
			var text;

			switch (jqXHR.status) {
				case 403:
					status.text('Rate-limited, retrying in ' + Math.ceil(item.delay.rate/1000) + ' seconds');
					break;

				default:
					status.text('Server error, retrying in ' + Math.ceil(item.delay.server/1000) + ' seconds');
					break;
			}
		};

		var handleFail = function(jqXHR, textStatus) {
			if (typeof console == 'function') {
				console.log(jqXHR, textStatus);
			}

			status.remove();
		}

		var request = $.spotify.search('album', query).done(function(data) {
			if (data.albums.length) {
				status.text('Fetching…');

				var request = $.spotify.lookup(data.albums[0], { extras: 'track' }).done(function(data) {
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