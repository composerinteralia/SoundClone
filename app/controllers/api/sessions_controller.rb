class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:email],
      params[:password]
    )

    if @user.nil?
      render json: ["Wrong email/password combo!"], status: 401
    else
      sign_in(@user)
      render "api/users/show"
    end
  end

  def destroy
    sign_out
    render json: {}
  end

  def omniauth_facebook
    @user = User.find_or_create_by_auth_hash(auth_hash)
    sign_in(@user)
    redirect_to root_url + '#/'
  end

  def show
    if current_user
      @user = current_user
      render "api/users/show"
    else
      render json: {}
    end
  end

  private
  def auth_hash
    request.env['omniauth.auth']
  end
end
