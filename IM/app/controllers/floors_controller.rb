class FloorsController < ApplicationController
	def index 
		respond_with Floor.all
	end

	def show
		respond_with Floor.find(params[:id])
	end

	def destroy
		puts "ay haga"
		respond_with Floor.all
		# respond_with Floor.find_by(id:params[:id]).destroy
	end 
end
