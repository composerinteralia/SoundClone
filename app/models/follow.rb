class Follow < ActiveRecord::Base
  validates :follower, :followee, presence: true
  validates :follower, uniqueness: { scope: :followee }

  belongs_to :follower, class_name: "User"
  belongs_to :followee, class_name: "User"
end
