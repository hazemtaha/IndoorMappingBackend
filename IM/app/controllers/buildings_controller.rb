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

    private
        def building_params
            params.require(:building).permit(:name, :address)
        end

end
