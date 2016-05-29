class Building < ActiveRecord::Base
  belongs_to :owner
  has_many :floors, :dependent => :delete_all
end
