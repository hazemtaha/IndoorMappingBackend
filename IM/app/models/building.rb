class Building < ActiveRecord::Base
  belongs_to :owner
  has_many :floors, :dependent => :delete_all
  mount_uploader :thumbnail, ImageUploader

  def as_json(options = {})
    super(options.merge(include: :floors))
  end
  
end
