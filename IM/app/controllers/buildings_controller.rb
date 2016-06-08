class BuildingsController < ApplicationController
	def index
        respond_with Building.where(:owner_id => current_owner.id)
    end

    def show
	    respond_with Building.find(params[:id])
    end

    def destroy
    	Building.destroy(params[:id])
    	render json: Building.where(:owner_id => current_owner.id)
    end

    def update
        @building = Building.find(params[:id])
        if @building.update(building_params) 
            render json: Building.find(params[:id])
        end
    end

    def create 

        @build = Building.create(build_params)
        @build.owner_id = current_owner.id 
        # current_owner.id
        puts "----------------------------------------------------------"
        puts current_owner
        puts "----------------------------------------------------------"
        puts @build 
        puts "----------------------------------------------------------"

        if @build.save  
             render json: Building.where(:owner_id => current_owner.id)
        else 
             render json: {:errorMsg => @build.errors[:name][0]}
        end     
    end


    private
        def building_params
            params.require(:building).permit(:name, :address)
        end

        def build_params
            params.require(:building).permit(:address, :name , :thumbnail , :owner_id  )
        end

end
