class BlocksController < ApplicationController

	def index
		respond_with Block.all
	end

end

