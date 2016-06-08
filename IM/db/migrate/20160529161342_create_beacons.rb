class CreateBeacons < ActiveRecord::Migration
  def change
    create_table :beacons do |t|
      t.string :name
      t.integer :uuid
      t.integer :major
      t.integer :minor
      t.integer :x
      t.integer :y
      t.references :block, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
