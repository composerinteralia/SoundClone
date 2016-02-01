json.extract! track, :id, :title, :description, :user_id

json.username track.user.username
json.image_url asset_path(track.track_art.url)
json.audio_url asset_path(track.audio.url)
