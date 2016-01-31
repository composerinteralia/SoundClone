class Track < ActiveRecord::Base
  has_attached_file :track_art, default_url: "sheep.jpg"
  validates_attachment_content_type :track_art,
                                    content_type: /\Aimage\/.*\Z/

  # Later no default url - just validate presence, and only allow certain types of audio
  has_attached_file :audio, default_url: "etude1.wav"
  validates_attachment_content_type :audio,
                                    content_type: /\Aaudio\/.*\Z/

  validates :user, :title, presence: true
  validates :title, uniqueness: { scope: :user }

  belongs_to :user
end
