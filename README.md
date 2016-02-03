## SoundClone

[Explore!](https://www.sound-clone.com/)

## Minimum Viable Product

SoundClone is a web application inspired by SoundCloud, built using Ruby on Rails
and React.js. SoundClone allows users to:

- [x] Create an account
- [x] Log in and Log out
- [x] Upload audio to create new tracks
- [x] Create, play, update, and delete tracks
- [ ] See the number of plays for each track
- [ ] Follow other users
- [ ] View, play, and like other users' tracks
- [ ] Organize tracks into playlists

## Design Docs
* [View Wireframes](./docs/views.md)
* [DB schema](./docs/schema.md)

## Implementation Timeline

### Phase 1: User Authentication and Flux Architecture (1.5 days)

I will begin by implementing user signup and authentication (with BCrypt). Then
I will set up Flux, the React Router, and a React view for showing basic
user info.

[Details](./docs/phases/phase1.md)

### Phase 2: Track model, JSON API, and CRUD actions (3 days)

In phase 2 I will set up a full JSON API for tracks, implement a track store,
and create a set of actions corresponding to the needed CRUD functionality. Once
users are able to upload tracks, I will add a TracksIndex view to show
a user's tracks on their profile page. I will also create a TrackDetail view and
an Explore view (for now a paginated index of all the tracks). At the end
of this phase it will be possible to create, view (but not yet play), update,
and delete tracks.

[Details](./docs/phases/phase2.md)

### Phase 3: Track player and play count (1 day)

In this phase I will take advantage of the HTML5 audio element to play tracks.
I will build a player (complete with a play/pause button and a progress bar)
that will stay visible at the bottom of the page as the user navigates through
the app. I will also add a play count to the track show page, including
both total plays and plays in the past week. At the end of this phase the core
functionality of the app should be complete.

[Details](./docs/phases/phase3.md)

### Phase 4: Follows and Likes (1.5 day)

Phase 4 introduces two new features: users can follow other users, and they can
like tracks. An index of tracks by followees will appear in a Stream view.
I will create index views for followers, followees, and liked tracks.

[Details](./docs/phases/phase4.md)

### Phase 5: Playlists (1 days)

Here I will implement a playlist, allowing users to play a continuous stream of
selected tracks. Playlists will belong to a user and will have many tracks.
I will create a PlaylistsIndex view (a child route of the profile page),
as well as a PlaylistDetail view.

[Details](./docs/phases/phase5.md)

### Phase 6: Complete Stream and Explore components (.5 day)

In this phase I will update Stream to load and play tracks continuously, and
update Explore to index tracks by date added, most liked, or most played.

### Bonus Features (TBD)

- [ ] Track comments
- [ ] Track tags
- [ ] Search for users and tracks
- [ ] Notifications for likes, follows, and plays
- [x] OmniAuth
- [ ] Multiple sessions
