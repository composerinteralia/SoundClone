json.extract! @user, :id, :username, :fname, :lname, :bio

json.profile_image_url asset_path(@user.profile_image.url)
