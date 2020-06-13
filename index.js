var album_list = [
    {
        "id" : "1",
        "name": "Love Yourself",
        "year" : "2013",
        "album_songs" : [
            {
                "song_id" : "1",
                "song_name" : "Euphoria",
                "song_src" : "assets/audio/last_week_tonight.mp3",
                "song_duration" : "10 : 56"
            },
            {
                "song_id" : "2",
                "song_name" : "Serendipity",
                "song_src" : "assets/audio/sherlock_holmes.mp3",
                "song_duration" : "8 : 09"
            }
        ]
    },
    {
        "id" : "2",
        "name": "Some Night",
        "year" : "2018",
        "album_songs" : [
            {
                "song_id" : "1",
                "song_name" : "Grand Romantic",
                "song_src" : "assets/audio/spiderman_homecoming.mp3",
                "song_duration" : "3 : 49"
            },
            {
                "song_id" : "2",
                "song_name" : "Uptown Special",
                "song_src" : "assets/audio/the_office_theme.mp3",
                "song_duration" : "1 : 20"
            }
        ]
    }
];

albumListStr = "";

album_list.forEach(function(o){
    albumListStr += '<div class="discography-songs">';
    albumListStr += '<div class="mobile-display-flex">';
    albumListStr += '<span class="song-name fs-17-ipad-pot">' + o.name + '</span>';
    albumListStr += '<div class="margin-top-10 container width-618 display-inline-block">';
    albumListStr += '<div class="float-left">';
    albumListStr += '<span class="margin-left-18"> = </span>';
    albumListStr += '<span class="margin-left-18 song-year fs-17-ipad-pot">' + o.year + '</span>';
    albumListStr += '</div>';
    albumListStr += '<div class="float-right">';
    albumListStr += '<button type="button" class="btn btn-primary buy-listen-buttons" id="album_' + o.id + '">Buy</button>';
    albumListStr += '<button type="button" onclick="listen_album('+ o.id +')" class="btn btn-primary margin-left-4 buy-listen-buttons" id="album_' + o.id + '">Listen</button>'
    albumListStr += '</div>';
    albumListStr += '</div>';
    albumListStr += '</div>';
    albumListStr += '</div>';
});

document.getElementById('album_list_div').innerHTML = albumListStr;

function listen_album(id){
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    var played_album = album_list.filter(function(o){
        return o.id == id;
    })[0];
    document.getElementById('album_songs').innerHTML = "";
    document.getElementById('playing_album').style.display = "block";
    document.getElementById('playing_album').innerHTML = played_album.name;
    document.getElementById('album_name').style.display = "block";
    document.getElementById('album_name').innerHTML = played_album.name;
    played_album.album_songs.forEach(function(s){
        var albumSongsList = "";
        albumSongsList += '<div class="container display-inline-block width-690 margin-bottom-18">';
        albumSongsList += '<div class="float-left">';
        albumSongsList += '<i class="fa fa-play-circle" aria-hidden="true" id="song_played' + s.song_id + '" data-song-name="' + s.song_name + '" data-song-src="' + s.song_src + '"></i>';
        albumSongsList += '<span class="font-size-smaller margin-left-12 fs-17-ipad-pot" id="active_song_name' + s.song_id + '">' + s.song_name +'</span>'
        albumSongsList += '</div>';
        albumSongsList += '<div class="float-right">';
        albumSongsList += '<span class="font-size-smaller fs-17-ipad-pot">' + s.song_duration + '</span>';
        albumSongsList += '</div>';
        albumSongsList += '</div>';
        document.getElementById('album_songs').insertAdjacentHTML('beforeend',albumSongsList);
        document.getElementById("song_played" + s.song_id).onclick =  function(){ myFunction(s.song_id)};
    });
}

function myFunction(song_id){
    document.getElementById("playing_song").style.display = "block";
    var play_button = document.getElementById("song_played" + song_id);
    var song_name = play_button.getAttribute('data-song-name');
    var song_src = play_button.getAttribute('data-song-src')
    document.getElementById("playing_song").innerHTML = song_name;
    if(document.getElementsByClassName("active-playing-song")[0] !== undefined){
        document.getElementsByClassName("active-playing-song")[0].classList.remove("active-playing-song");
    }
    document.getElementById("active_song_name" + song_id).classList.add("active-playing-song");
    var audio = document.getElementById('audio_player');
    audio.src = song_src;
    audio.load();
    audio.play();
}

