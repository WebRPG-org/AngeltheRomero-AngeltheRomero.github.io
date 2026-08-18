let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "September",
    artist: "Earth, Wind & Fire",
    image: "Earth, Wind & Fire Album Cover.png",
    path: "September - Earth, Wind & Fire.mp3"
  },
  {
    name: "Kokomo",
    artist: "The Beach Boys",
    image: "Kokomo by the Beach Boys.jpg",
    path: "Kokomo - The Beach Boys.mp3"
  },

  {
    name: "You Make Me Feel Like Dancing",
    artist: "Leo Sayer",
    image: "Leo Sayer Album Cover.jpg",
    path: "Leo Sayer - You Make Me Feel Like Dancing (Official HD Music Video) - Leo Sayer.mp3"
  },

  {
    name: "Talking In Your Sleep",
    artist: "The Romantics",
    image: "",
    path: "The Romantics - Talking In Your Sleep - Top Squad.mp3"
  },

  {
    name: "Shout, Pts. 1 & 2",
    artist: "The Isley Brothers",
    image: "",
    path: "The Isley Brothers - Shout, Pts. 1 & 2 (Official Audio) - TheIsleyBrothersVEVO.mp3"
  },

  {
    name: "Teenage Dream",
    artist: "T. Rex",
    image: "T-REX Album Cover.jpg",
    path: "Teenage Dream - T. Rex.mp3"
  },

  {
    name: "Am I dreaming",
    artist: "Metro Boomin",
    image: "",
    path: "Am I Dreaming - Metro Boomin.mp3"
  },

  {
    name: "",
    artist: "",
    image: "",
    path: ""
  },

  {
    name: "Another Winter",
    artist: "Anamanaguchi",
    image: "SPVTWTG Album Cover.jpg",
    path: "Another Winter - Anamanaguchi.mp3"
  },
  {
    name: "Cheap Shop",
    artist: "Anamanaguchi",
    image: "SPVTWTG Album Cover.jpg",
    path: "Cheap Shop - Anamanaguchi.mp3"
  },
  {
    name: "Vegetable Rock",
    artist: "Anamanaguchi",
    image: "SPVTWTG Album Cover.jpg",
    path: "Vegetable Rock - Anamanaguchi.mp3"
  },

  {
    name: "Soul Outsider",
    artist: "Brandon Yates",
    image: "Soul Outsider Album.png",
    path: "Death Battle： Soul Outsider - Brandon Yates.mp3"
  },

  {
    name: "Millennial Monsters",
    artist: "Brandon Yates (feat. Jason Paige)",
    image: "Millennial Monsters Album Cover.jpg",
    path: "Death Battle Millennial Monsters (feat. Jason Paige) - Brandon Yates.mp3"
  },

  {
    name: "Death In Bloom",
    artist: "Brandon Yates (feat. Casey Lee Williams & Mirea Sheltzs)",
    image: "",
    path: "Death Battle： Death In Bloom (feat. Casey Lee Williams & Mirea Sheltzs) - Brandon Yates.mp3"
  },

  {
    name: "Bounce Bounce Revolution",
    artist: "BinCell",
    image: "Bounce Bounce Revolution Cover.jpg",
    path: "Bounce Bounce Revolution - BinCell.mp3"
  },

  {
    name: "Nangokufu desu ga, Nani ka",
    artist: "Satoru Kosaki",
    image: "Lucky Star Album.jpg",
    path: "Nangokufu desu ga, Nani ka - Satoru Kosaki.mp3"
  },

  {
    name: "Fun Fun Fun dayo, Lucky Star",
    artist: "Satoru Kosaki",
    image: "Lucky Star Album.jpg",
    path: "Fun Fun Fun dayo, Lucky Star - Satoru Kousaki.mp3"
  },

  {
    name: "Seisyun Complex",
    artist: "Kessoku Band",
    image: "Kessoku Band Cover.jpg",
    path: "seisyun complex - kessoku band.mp3"
  },

  {
    name: "ダンシング・ヒーロー（Eat You Up）",
    artist: "Yoko Oginome",
    image: "",
    path: "ダンシング・ヒーロー（Eat You Up） - Yoko Oginome.mp3"
  },

];

function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}