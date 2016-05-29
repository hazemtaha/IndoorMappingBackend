class CreateOwners < ActiveRecord::Migration
  def change
    create_table :owners do |t|
      t.string :username
      t.string :email
      t.string :password
      t.string :picture

      t.timestamps null: false
    end
  end
end
