class Track < ActiveRecord::Base
  has_attached_file :track_art, default_url: "sheep-logo.jpg"
  validates_attachment_content_type :track_art,
                                    content_type: /\Aimage\/.*\Z/

  validates :user, :title, presence: true
  validates :title, uniqueness: { scope: :user_id }

  belongs_to :user
end
