class User < ActiveRecord::Base
  attr_reader :password
  after_initialize :ensure_session_token

  has_attached_file :profile_image, default_url: "sheep.jpg"
  validates_attachment_content_type :profile_image,
                                    content_type: /\Aimage\/.*\Z/

  validates :email, :display_name, :session_token, presence: true, uniqueness: true
  validates_format_of :email, with: /@/
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :tracks

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user.try(:valid_password?, password) ? user : nil
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    provider = auth_hash[:provider]
    uid = auth_hash[:uid]
    debugger
    user = User.find_by(provider: provider, uid: uid)

    return user if user

    User.create(
      provider: provider,
      uid: uid,
      email: auth_hash[:info][:email],
      display_name: auth_hash[:info][:name],
      password: SecureRandom::urlsafe_base64
    )
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
