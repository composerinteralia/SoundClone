#SoundClone

SoundClone is a web application for sharing and listening to music. It was
 inspired by SoundCloud and built using Ruby on Rails, React.js, and wavesurfer.js.

Explore and Listen at [sound-clone.com](http://www.sound-clone.com/)

###Welcome View:

![welcome]

###Home View:

![stream]

###Technical Details:
* SoundClone shows waveform visualizations for each track using the waveform.js library. The audio decoding required for this is unbearably slow, so I implemented a [cache](./frontend/lib/cache.js) to store the wavesurfer objects (see the [player store](./frontend/stores/player.js)). Then I modified the wavesurfer.js library to include dismount and remount methods. The dismount method destroys the canvas waveform drawing (turning off associated event listeners in the process) while preserving the decoded AudioBuffer. The remount method allows for redrawing the canvas in a newly sized parent container (or avoiding redrawing altogether).

```
dismount: function (currentlyPlaying) {
  if (!currentlyPlaying) {
    this.seekTo(0);
  }

  if (this.params.visible) {
    this.drawer.destroy();
    this.drawn = false;
  }

  this.mounted = false
},

remount: function (container, height, visible) {
  this.container = container;
  this.mediaContainer = container;

  this.params.height = height;

  if (typeof visible === "undefined") {
    this.params.visible = true;
  } else {
    this.params.visible = visible;
  }

  if (this.params.visible) {
    this.createDrawer();
    this.drawBuffer();
  }

  this.mounted = true
}
```

* I also reworked the wavesurfer.js play, pause, and drawBuffer methods to handle cases where the user presses play before the decoded AudioBuffer is ready. These modifications strike me as a temporary solution; for the future I hope to store the decoded AudioBuffers server side.

```
play: function (start, end) {

    if (!this.buffer) {
      this.tryPlay = setTimeout(function () {
        this.play(start, end);
      }.bind(this), 0);
    } else {
      ...
```

###Features
* Sign up/in with email or Facebook
* Stream shows your followers' most recent tracks
* Explore shows a random sampling of tracks
* Waveform visuals show play progress
* Playbar fixed to the bottom of the page
* Continuous track play
* Spacebar to pause
* Upload your own tracks
* Like tracks
* Follow other users

###To-Do:
* [ ] Index views for likes, followers, and followees
* [ ] Notifications
* [ ] Infinite scroll
* [ ] Search
* [ ] Multiple Sessions
* [ ] Comments
* [ ] Tags
* [ ] Playlists
* [ ] Reposts

[Original Design Docs](./docs/README.md)

[welcome]: ./docs/images/welcome.png
[stream]: ./docs/images/stream.png
