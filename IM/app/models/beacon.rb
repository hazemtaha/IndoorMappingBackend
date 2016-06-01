class Beacon < ActiveRecord::Base
  belongs_to :block
  has_many :visitors, through: :visits
end
