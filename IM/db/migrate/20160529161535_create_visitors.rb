class CreateVisitors < ActiveRecord::Migration
  def change
    create_table :visitors do |t|
      t.string :username
      t.string :email
      t.string :password
      t.date :dob
      t.string :phone_type

      t.timestamps null: false
    end
  end
end
