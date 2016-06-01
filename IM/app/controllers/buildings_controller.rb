class BuildingsController < ApplicationController
	def index
    	respond_with Building.all
    end
end
