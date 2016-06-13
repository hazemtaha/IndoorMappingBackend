class Visitor < ActiveRecord::Base
  has_many :beacons, through: :visits
before_save :encrypt_password

def encrypt_password
	if encrypted_password.present?
    	self.salt = BCrypt::Engine.generate_salt
    	self.encrypted_password= BCrypt::Engine.hash_secret(encrypted_password, salt)
  	end
end 
end
