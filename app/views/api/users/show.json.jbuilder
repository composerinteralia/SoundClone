json.extract! @user, :id, :username

json.tracks @user.tracks.order('updated_at DESC'), partial: 'api/tracks/track', as: :track
