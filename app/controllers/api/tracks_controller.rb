class Api::TracksController < ApplicationController
  before_action :require_signed_in!, only: [:create, :destroy, :update]

  def create
    @track = current_user.tracks.new(track_params)

    if @track.save
      render :show
    else
      render json: @track.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @track = Track.find(params[:id])

    if @track.user_id != current_user.id
      render json: ["Not yours!"], status: :unprocessable_entity
    elsif @track.destroy
      render :show
    else
      render json: @track.errors.full_messages, status: :unprocessable_entity
    end
  end

  def index
    user = User.find(params[:user_id])
    @tracks =
      user.tracks
        .order('updated_at DESC')
        .includes(:user)
  end

  def explore
    @tracks =
      Track.all
        .where.not(user: current_user)
        .order('updated_at DESC')
        .includes(:user)

    render :index
  end

  def show
    @track = Track.find(params[:id])
  end

  def update
    @track = Track.find(params[:id])

    if @track.user_id != current_user.id
      render json: ["Not yours!"], status: :unprocessable_entity
    elsif @track.update(track_params)
      render :show
    else
      render json: @track.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def track_params
    params.require(:track).permit(:title, :description, :track_art, :audio)
  end
end
