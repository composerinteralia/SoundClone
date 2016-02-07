class Track < ActiveRecord::Base
  has_attached_file :track_art, default_url: "sheep.jpg"
  validates_attachment_content_type :track_art,
                                    content_type: /\Aimage\/.*\Z/

  has_attached_file :audio
  validates_attachment_content_type :audio,
                                    content_type: /\Aaudio\/.*\Z/

  validates :user, :title, presence: true
  validates :title, uniqueness: { scope: :user }

  belongs_to :user
  has_many :likes, dependent: :destroy
  has_many :likers, through: :likes, source: :user
end
