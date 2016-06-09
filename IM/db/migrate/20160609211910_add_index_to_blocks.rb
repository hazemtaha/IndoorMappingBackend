class AddIndexToBlocks < ActiveRecord::Migration
  def change
    add_index :blocks, :name, unique: true
  end
end
