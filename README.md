# jQuery Spotify

A jQuery plugin for fetching data from [Spotify's metadata API](https://developer.spotify.com/technologies/web-api/).

Requires [jQuery Ajax Queue](https://github.com/hubgit/jquery-ajax-queue).

[Demonstration](http://git.macropus.org/jquery-spotify/demo/).

## Examples

    $.spotify.search('The Beatles Yello Wubmarine'); // basic search
    
    $.spotify.search('artist:The Beatles', { page: 2 }); // 2nd page of an artist search
    
    $.spotify.lookup('spotify:album:4BMYwbOZd1i9vraiSXtSkg', { extras: 'track' }); // retrieve metadata by URI
    
