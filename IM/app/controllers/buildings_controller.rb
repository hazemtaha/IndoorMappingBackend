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
end
