class VisitorController < ApplicationController

    def create 

        @visitor = Visitor.create(visitor_params)

        render :json {visitor: @visitor}
    end

    private
        def visitor_params
            params.require(:visitor).permit(:email, :username, :password, :dob)
        end

        

end
