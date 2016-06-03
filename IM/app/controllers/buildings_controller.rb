class BuildingsController < ApplicationController
	def index
    	respond_with Building.all
    end

    def show
	    respond_with Building.find(params[:id])
    end

    def destroy
    	Building.destroy(params[:id])
    	render json: Building.all
    end

    def update
        @building = Building.find(params[:id])
        if @building.update(building_params) 
            render json: Building.find(params[:id])
        end
    end

    def create 
        @build = Building.create(build_params)
        if @build.save  
             render json: Building.all
        else 
             render json: {:errorMsg => @build.errors[:name][0]}
        end     
    end


    private
        def building_params
            params.require(:building).permit(:name, :address)
        end

        def build_params
            params.require(:building).permit(:address, :name , :thumbnail , 1)
        end

end
