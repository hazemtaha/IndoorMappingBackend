class Building < ActiveRecord::Base
  belongs_to :owner
  has_many :floors, :dependent => :delete_all

  def as_json(options = {})
    super(options.merge(include: :floors))
  end
  
end
