class Api::LikesController < ApplicationController
  def create
    @track = Track.find(params[:track_id])
    like = current_user.likes.new(track: @track)

    if like.save
      # what to render?
      render 'api/tracks/show'
    else
      render json: like.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    like = current_user.likes.find_by(track_id: params[:track_id])

    if like.destroy
      # not sure yet
      @user = current_user
      render 'api/users/show'
    else
      render json: like.errors.full_messages, status: :unprocessable_entity
    end
  end
end
