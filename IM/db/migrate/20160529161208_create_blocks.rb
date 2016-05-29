class CreateBlocks < ActiveRecord::Migration
  def change
    create_table :blocks do |t|
      t.string :name
      t.integer :width
      t.integer :height
      t.integer :x_axis
      t.integer :y_axis
      t.references :floor, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
