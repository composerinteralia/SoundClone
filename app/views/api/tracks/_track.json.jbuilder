json.extract! track, :id, :title, :description, :user_id

json.display_name track.user.display_name
json.like_count track.likes.length
json.liker_ids track.likes.pluck(:user_id)
json.image_url asset_path(track.track_art.url)
json.audio_url asset_path(track.audio.url)
