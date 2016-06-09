class BlocksController < ApplicationController

	def show
    	respond_with Block.find(params[:id])
    end

	def index
		respond_with Block.all
	end

	def update
		@block = Block.find(params[:id])
        if @block.update(block_params)
            render json: Block.where(floor_id: @block.floor_id)
        end

	end
	def save_blocks
		params[:blocks].each { |block|
			Block.create(name: block[:name], path: block[:path], floor_id: params[:floor_id])
		}
		render json: {success: 1}
	end
	private
        def block_params
            params.require(:block).permit(:name)
        end


end
