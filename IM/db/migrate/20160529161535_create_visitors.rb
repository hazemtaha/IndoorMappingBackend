class CreateVisitors < ActiveRecord::Migration
  def change
    create_table(:visitors) do |t|

      t.string :encrypted_password, null: false, default: ""
      t.string :password_confirmation, null: false, default: ""
	    t.string :email,              null: false, default: ""
      t.timestamps null: false
      t.string :username
      t.date :dob
      t.string :phone_type
    end
    add_index :visitors, :email,                unique: true
    add_index :visitors, :username,                unique: true
  end
end
