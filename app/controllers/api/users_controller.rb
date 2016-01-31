class Api::UsersController < ApplicationController
  before_action :require_signed_in!, only: [:update]

  def show
    @user = User.find(params[:id])
  end

  def update
    @user = current_user

    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
