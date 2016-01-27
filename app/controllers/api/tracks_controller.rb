class Api::TracksController < ApplicationController
  # only loggin in users can create, destroy, update
  # can only c, d, u your own tracks!

  def create
    @track = Track.new(track_params)
    if @track.save
      @user = @track.user

      render 'api/users/show'
    else
      render json: @track.errors.full_messages
    end
  end

  def destroy
    @track = Track.find(params[:id])

    if @track.destroy
      render json: { message: "Track successfully destroyed" }
    else
      render json: @track.errors.full_messages
    end
  end

  # Index should be, for now, a specific user's tracks
  def index
    @tracks = Track.all
  end

  def show
    @track = Track.find(params[:id])
  end

  def update
    @track = Track.find(params[:id])

    if @track.update(track_params)
      @user = @track.user

      render 'api/users/show'
    else
      render json: @track.errors.full_messages
    end
  end

  private
  def track_params
    params.require(:track).permit(:user_id, :title, :description)
  end
end
