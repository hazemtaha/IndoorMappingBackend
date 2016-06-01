class Floor < ActiveRecord::Base
  belongs_to :building
  has_many :blocks, :dependent => :delete_all

  def as_json(options = {})
    super(options.merge(include: :blocks))
  end
  
end
