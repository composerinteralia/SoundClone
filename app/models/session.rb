class Session < ActiveRecord::Base
  before_validation :set_token

  validates :user, :token, presence: true

  belongs_to :user

  def self.generate_token
    token = SecureRandom.urlsafe_base64
    while (self.exists?(token: token))
      token = SecureRandom.urlsafe_base64
    end
    token
  end

  def set_token
    self.token = self.class.generate_token
  end

end
