class CreateBuildings < ActiveRecord::Migration
  def change
    create_table :buildings do |t|
      t.string :address
      t.string :name
      t.string :thumbnail
      t.references :owner, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
