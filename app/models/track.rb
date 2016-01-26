class Track < ActiveRecord::Base
  validates :user, :title, presence: true
  validates :title, uniqueness: { scope: :user_id }

  belongs_to :user
end
