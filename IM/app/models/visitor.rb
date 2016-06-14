class Visitor < ActiveRecord::Base
  has_many :beacons, through: :visits
#before_save :encrypt_password

def encrypt_password
	if encrypted_password.present?
		puts encrypted_password
    	self.encrypted_password= Digest::SHA1.hexdigest(encrypted_password)
  	end
end 

def self.authenticate(email, password)
  @visitor = Visitor.find_by_email(email)
  if @visitor 
  	puts @visitor.encrypted_password
  	 if @visitor.encrypted_password == password
    return @visitor
  else
  	#puts Digest::SHA1.hexdigest(password)
    return nil
  end
end
end
end
