class VisitorController < ApplicationController

    def create 

         if Visitor.create(visitor_params)
        	@visitor = Visitor.create(visitor_params)
        	render json: {visitor: @visitor}
        else
        	render json: {:errorMsg => @visitor.errors}
        end
    end

    private
        def visitor_params
            params.require(:visitor).permit(:email, :username, :encrypted_password, :dob)
        end

        

end
