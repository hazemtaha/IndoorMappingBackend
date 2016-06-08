class FloorsController < ApplicationController
	def index 
		respond_with Floor.all
	end

	def show
		respond_with Floor.find(params[:id])
	end

	def create 
		@floor = Floor.create(floor_params)
		if @floor.save	
			render json: Floor.where(:building_id => params[:floor][:building_id])
		else 
	  		render json: {:errorMsg => @floor.errors[:floor_num][0]}
		end 	
	end 

	def destroy
		Floor.destroy(params[:id])
		render json: Floor.where(:building_id => params[:building_id])
	end 


	private
	  def floor_params
	    params.require(:floor).permit(:floor_num, :width , :height , :building_id)
	  end


end
