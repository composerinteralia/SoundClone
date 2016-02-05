class Api::FollowsController < ApplicationController
  before_action :require_signed_in!

  def create
    follow = current_user.follows.new(followee_id: params[:user_id])

    if follow.save
      @user = follow.followee
      render 'api/users/show'
    else
      render json: follow.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    follow = current_user.follows.find_by(followee: params[:user_id])

    if follow
      follow.destroy
      @user = follow.followee
      render 'api/users/show'
    else
      render json: ["Follow does not exits"], status: :unprocessable_entity
    end
  end

end
