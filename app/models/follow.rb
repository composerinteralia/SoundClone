class Follow < ActiveRecord::Base
  validates :follower, :followee, presence: true

  belongs_to :follower, class_name: "User"
  belongs_to :followee, class_name: "User"
end
