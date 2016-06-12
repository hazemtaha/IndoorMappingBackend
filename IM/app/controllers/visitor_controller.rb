class VisitorController < ApplicationController

	def index
        respond_with Visitor.where(:id => current.id)
    end


    def create 

        @visit = Visitor.create(visit_params)
        @visit.id = current.id 

        if @visit.save  
             render json: Visitor.where(:id => current.id)
        else 
             render json: {:errorMsg => @visit.errors[:name][0]}
        end     
    end

    private
        def visitor_params
            params.require(:visitor).permit(:email, :username, :password, :dob)
        end

        

end
