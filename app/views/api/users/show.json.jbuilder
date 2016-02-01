json.extract! @user, :id, :username, :fname, :lname, :bio

json.tracks @user.tracks.order('updated_at DESC'), partial: 'api/tracks/track', as: :track

json.profile_image_url asset_path(@user.profile_image.url)
