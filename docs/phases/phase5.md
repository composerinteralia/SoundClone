### Phase 5: Playlists (1 days)

## Rails
### Models
* Playlist
* PlaylistTrack

### Controllers
* Api::PlaylistsController (create, destroy, index, show, update)

### Views
* playlists/index.json.jbuilder
* playlists/show.json.jbuilder

## Flux
### Views (React Components)
* PlaylistsIndex
  - PlaylistsIndexItem
* PlaylistDetail

### Stores
* Playlist

### Actions
* ApiActions.receiveAllPlaylists -> triggered by ApiUtil
* ApiActions.receiveSinglePlaylist
* ApiActions.deletePlaylist
* PlaylistActions.fetchAllPlaylists -> triggers ApiUtil
* PlaylistActions.fetchSinglePlaylist
* PlaylistActions.createPlaylist
* PlaylistActions.updatePlaylist
* PlaylistActions.destroyPlaylist

### ApiUtil
* ApiUtil.fetchAllPlaylists
* ApiUtil.fetchSinglePlaylist
* ApiUtil.createPlaylist
* ApiUtil.updatePlaylist
* ApiUtil.destroyPlaylist

## Gems/Libraries
