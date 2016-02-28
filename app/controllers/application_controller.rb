class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :signed_in?

  private
  def current_user
    @current_user ||= Session.find_by_token(session[:session_token]).try(:user)
  end

  def signed_in?
    !!current_user
  end

  def signed_out?
    !current_user
  end

  def sign_in(user)
    @current_user = user
    new_session = user.sessions.create
    session[:session_token] = new_session.token
  end

  def sign_out
    Session.find_by_token(session[:session_token]).destroy
    session[:session_token] = nil
  end

  def require_signed_in!
    render json: ["No way!"], status: 422 unless signed_in?
  end
end
