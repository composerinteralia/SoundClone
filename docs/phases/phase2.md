### Phase 2: Track model, JSON API, and CRUD actions (3 days)

## Rails
### Models
* Track

### Controllers
* Api::TracksController (create, destroy, index, show, update)

### Views
* tracks/index.json.jbuilder
* tracks/show.json.jbuilder

## Flux
### Views (React Components)
* TracksIndex
  - TracksIndexItem
* Explore
  - TrackThumbnail
* TrackForm
* TrackDetail

### Stores
* track

### Actions
* ApiActions.receiveAllTracks -> triggered by ApiUtil
* ApiActions.receiveSingleTrack
* ApiActions.deleteTrack
* TrackActions.fetchAllTracks -> triggers ApiUtil
* TrackActions.fetchSingleTrack
* TrackActions.createTrack
* TrackActions.editTrack
* TrackActions.destroyTrack

### ApiUtil
* ApiUtil.fetchAllTracks
* ApiUtil.fetchSingleTrack
* ApiUtil.createTrack
* ApiUtil.editTrack
* ApiUtil.destroyTrack

## Gems/Libraries
* Flux Dispatcher (npm)
