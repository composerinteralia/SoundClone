class User < ActiveRecord::Base
  attr_reader :password

  has_attached_file :profile_image, default_url: "sheep.jpg"
  validates_attachment_content_type :profile_image,
                                    content_type: /\Aimage\/.*\Z/

  validates :email, :display_name, presence: true, uniqueness: true
  validates_format_of :email, with: /@/
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :tracks
  has_many :likes, dependent: :destroy

  has_many :liked_tracks, through: :likes, source: :track

  has_many :follows, foreign_key: :follower_id, dependent: :destroy
  has_many :followees, through: :follows
  has_many :followee_tracks, through: :followees, source: :tracks

  has_many :followings, class_name: "Follow", foreign_key: :followee_id, dependent: :destroy
  has_many :followers, through: :followings

  has_many :sessions, dependent: :destroy

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user.try(:valid_password?, password) ? user : nil
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    provider = auth_hash[:provider]
    uid = auth_hash[:uid]

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

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
end
