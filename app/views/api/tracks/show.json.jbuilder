json.extract! @track, :id, :user_id, :title, :description

json.image_url asset_path(@track.track_art.url)
