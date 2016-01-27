json.extract! @user, :id, :username

json.tracks @user.tracks, partial: 'api/tracks/track', as: :track
