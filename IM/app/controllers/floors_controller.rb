class FloorsController < ApplicationController
	def index 
	end

	def show
    	respond_with Floor.find(params[:id])
    end

	def destroy
		respond_with Floor.all
	end 
end
