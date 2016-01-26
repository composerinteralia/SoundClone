class Api::SessionsController < ApplicationController
  def destroy
    sign_out
    render json: {message: "logout successful"}
  end
end
