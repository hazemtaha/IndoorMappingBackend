class Visitor < ActiveRecord::Base
  has_many :beacons, through: :visits
end
