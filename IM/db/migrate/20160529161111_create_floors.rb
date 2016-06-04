class CreateFloors < ActiveRecord::Migration
  def change
    create_table :floors do |t|
      t.integer :floor_num
      t.integer :width
      t.integer :height
      t.references :building, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
