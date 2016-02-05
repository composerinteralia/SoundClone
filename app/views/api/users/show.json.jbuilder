json.extract! @user, :id, :display_name, :fname, :lname

json.profile_image_url asset_path(@user.profile_image.url)

json.liked_track_ids @user.likes.pluck(:track_id)

json.follower_ids @user.followings.pluck(:follower_id)
