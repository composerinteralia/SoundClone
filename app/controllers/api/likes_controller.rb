class Api::LikesController < ApplicationController
  before_action :require_signed_in!

  def create
    like = current_user.likes.new(track_id: params[:track_id])

    if like.save
      @track = like.track
      render 'api/tracks/show'
    else
      render json: like.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    like = current_user.likes.find_by(track: params[:track_id])

    if like.destroy
      @track = like.track
      render 'api/tracks/show'
    else
      render json: like.errors.full_messages, status: :unprocessable_entity
    end
  end
end
