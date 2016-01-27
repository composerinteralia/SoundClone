class Api::TracksController < ApplicationController
  # only current_user can create, destroy, update tracks!

  def create
    # will actually get user_id from current_user
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
      @user = @track.user
      render 'api/users/show'
    else
      render json: @track.errors.full_messages
    end
  end

  # all the tracks (for 'explore')
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
