class FloorsController < ApplicationController
	def index 
	end

	def show
    	respond_with Block.find(params[:id])
    end
end
