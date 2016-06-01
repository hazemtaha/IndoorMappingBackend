class CreateVisits < ActiveRecord::Migration
  def change
    create_table :visits do |t|
      t.references :visitor, index: true, foreign_key: true
      t.references :beacon, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
