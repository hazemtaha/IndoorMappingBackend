class Floor < ActiveRecord::Base
  belongs_to :building
  has_many :blocks, :dependent => :delete_all
  has_many :svgs, :dependent => :delete_all

  validates :floor_num , uniqueness: { scope: :building_id, message: " should be once per build" }

  def as_json(options = {})
    super(options.merge(include: :blocks))
  end

end
