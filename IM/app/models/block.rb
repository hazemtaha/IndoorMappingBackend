class Block < ActiveRecord::Base
  belongs_to :floor
  has_many :beacons, :dependent => :delete_all
end
