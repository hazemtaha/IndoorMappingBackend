class Owner < ActiveRecord::Base
  has_many :buildings, :dependent => :delete_all
end
