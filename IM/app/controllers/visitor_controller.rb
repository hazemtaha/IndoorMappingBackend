class VisitorController < ApplicationController

    def create 

        @visitor = Visitor.new(visitor_params)
        if Visitor.exists?(:email => @visitor.email , :username => @visitor.username)
        	render json: {:errorMsg => "Email or Username already exists"}
        else      	
        	@visitor.save
        	render json: {visitor: @visitor}
        end
    end

    def login

    	@loggedVisitor = Visitor.new(login_params)
    	#puts @loggedVisitor.encrypted_password
    	@visitor = Visitor.authenticate(@loggedVisitor.email, @loggedVisitor.encrypted_password)
    	#puts @visitor
    	if @visitor 
    		render json: {:visitor => @visitor}
    	else
    		render json: {:errorMsg => "Invalid email or password"}
    	end
    end
    private
        def visitor_params
            params.require(:visitor).permit(:email, :username, :encrypted_password, :dob)
        end

        def login_params
        	params.require(:visitor).permit(:email, :encrypted_password)
        end
end
