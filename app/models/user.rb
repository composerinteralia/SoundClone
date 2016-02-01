class User < ActiveRecord::Base
  attr_reader :password
  after_initialize :ensure_session_token

  has_attached_file :profile_image, default_url: "sheep.jpg"
  validates_attachment_content_type :profile_image,
                                    content_type: /\Aimage\/.*\Z/

  validates :username, :session_token, presence: true, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :tracks

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user.try(:valid_password?, password) ? user : nil
  end

  def self.generate_session_token
    token = SecureRandom.urlsafe_base64
    while (self.exists?(session_token: token))
      token = SecureRandom.urlsafe_base64
    end
    token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = self.class.generate_session_token
    self.save!
    session_token
  end

  private
  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
end
