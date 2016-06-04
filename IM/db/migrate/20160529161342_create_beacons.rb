class CreateBeacons < ActiveRecord::Migration
  def change
    create_table :beacons do |t|
      t.string :name
      t.integer :uuid
      t.integer :major
      t.integer :minor
      t.integer :x_axis
      t.integer :y_axis
      # t.references :block, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
