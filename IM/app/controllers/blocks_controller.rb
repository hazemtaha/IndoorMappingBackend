class BlocksController < ApplicationController

	def show
    	respond_with Block.find(params[:id])
    end	

	def index
		respond_with Block.all
	end

	def  update
		puts 'inside web servie####################### \n #############\n ########'
		@block = Block.find(params[:id])
        if @block.update(block_params) 
            render json: Block.where(floor_id: @block.floor_id)
        end

	end

	private
        def block_params
            params.require(:block).permit(:name)
        end


end

