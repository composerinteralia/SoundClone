class Api::TracksController < ApplicationController
  before_action :require_signed_in!, only: [:create, :destroy, :update]
  # can only create and destroy your own tracks!

  def create
    # will get user_id from current_user (wait for react auth)
    @track = currnet_user.tracks.new(track_params)

    if @track.save
      @user = @track.user
      render 'api/users/show'
    else
      render json: @track.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @track = Track.find(params[:id])
    # check if track is current user's track

    if @track.destroy
      @user = @track.user
      render 'api/users/show'
    else
      render json: @track.errors.full_messages, status: :unprocessable_entity
    end
  end

  def index
    @tracks =
      Track.all
        .where.not(user: current_user)
        .order('updated_at DESC')
        .includes(:user)
  end

  def show
    @track = Track.find(params[:id])
  end

  def update
    @track = Track.find(params[:id])
    # check if track is current user's track

    if @track.update(track_params)
      @user = @track.user
      render 'api/users/show'
    else
      render json: @track.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def track_params
    params.require(:track).permit(:title, :description)
  end
end
