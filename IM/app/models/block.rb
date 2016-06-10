class Block < ActiveRecord::Base
  belongs_to :floor
  has_many :beacons, :dependent => :delete_all

  def as_json(options = {})
    super(options.merge(include: :beacons))
  end

end
