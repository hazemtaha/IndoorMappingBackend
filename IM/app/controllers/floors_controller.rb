class FloorsController < ApplicationController
	def destroy
		respond_with Floor.all
	end 
end
