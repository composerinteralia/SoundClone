json.extract! @user, :id, :display_name, :fname, :lname

json.profile_image_url asset_path(@user.profile_image.url)
