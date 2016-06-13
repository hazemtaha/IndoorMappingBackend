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

    private
        def visitor_params
            params.require(:visitor).permit(:email, :username, :encrypted_password, :dob)
        end

        

end
