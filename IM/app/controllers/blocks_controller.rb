class BlocksController < ApplicationController

	def show
    	respond_with Block.find(params[:id])
    end	

	def index
		respond_with Block.all
	end

end

