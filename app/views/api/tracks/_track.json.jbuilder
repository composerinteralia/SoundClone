json.extract! track, :id, :title

json.image_url asset_path(track.track_art.url)
json.audio_url asset_path(track.audio.url)
