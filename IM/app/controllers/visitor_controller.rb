class VisitorController < ApplicationController

    def create 

        @visitor = Visitor.create(visitor_params)

        respond_with @visitor
    end

    private
        def visitor_params
            params.require(:visitor).permit(:email, :username, :password, :dob)
        end

        

end
