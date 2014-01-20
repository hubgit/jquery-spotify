$(function() {
	$(document).items('http://schema.org/MusicAlbum').each(function() {
		var node = $(this);

		var albumName = node.microdata('name');
		var artistName = node.microdata('byArtist').microdata('name');
		var query = 'artist:' + artistName + ' album:' + albumName;

		var status = $('<span/>').appendTo(node);

		var request = $.spotify.search('album', query).done(function(data) {
			if (data.albums.length) {
				status.text('Fetching…');

				var request = $.spotify.lookup(data.albums[0].href, { extras: 'track' }).done(function(data) {
					status.remove();
					$.spotify.link(data.album.href, '(' + data.album.released + ')').appendTo(node);
				});

				request.progress(status.text).fail(status.text);
			} else {
				status.remove();
			}
		});

		request.progress(status.text).fail(status.text);

	});
})