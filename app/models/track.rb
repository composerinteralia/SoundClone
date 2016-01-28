class Track < ActiveRecord::Base
  has_attached_file :track_art, default_url: "sheep-logo.jpg"
  validates_attachment_content_type :track_art,
                                    content_type: /\Aimage\/.*\Z/

  # Later no default url - just validate presence, and only allow certain types of audio
  has_attached_file :audio, default_url: "audio/cpe_solfeggio.mp3"
  validates_attachment_content_type :track_art,
                                    content_type: /\Aaudio\/.*\Z/

  validates :user, :title, presence: true
  validates :title, uniqueness: { scope: :user_id }

  belongs_to :user
end
