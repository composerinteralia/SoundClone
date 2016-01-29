class Api::UsersController < ApplicationController
  before_action :require_signed_in!

  def show
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def create
    # @user = User.new(user_params)
    # if @user.save
    #   sign_in(@user)
    #   redirect_to root_url
    # else
    #   flash.now[:errors] = @user.errors.full_messages
    #   render :new
    # end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
