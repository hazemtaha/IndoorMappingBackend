class CreateSvgs < ActiveRecord::Migration
  def change
    create_table :svgs do |t|
      t.references :floor, index: true, foreign_key: true
      t.text :svg_code

      t.timestamps null: false
    end
  end
end
