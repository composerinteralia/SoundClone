json.extract! @track, :id, :title, :description, :user_id

json.image_url asset_path(@track.track_art.url)
