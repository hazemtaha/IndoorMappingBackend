class VisitorController < ApplicationController

    def create 

        @visitor = Visitor.create(visitor_params)
        if @visitor.save
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
