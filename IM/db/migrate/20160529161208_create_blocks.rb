class CreateBlocks < ActiveRecord::Migration
  def change
    create_table :blocks do |t|
      t.string :name
      t.string :path
      t.string :color
      t.references :floor, index: true, foreign_key: true
      t.timestamps null: false
    end
  end
end
