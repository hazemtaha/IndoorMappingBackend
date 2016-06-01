class Floor < ActiveRecord::Base
  belongs_to :building
  has_many :blocks, :dependent => :delete_all
end
