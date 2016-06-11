class BlocksController < ApplicationController

	def show
    	respond_with Block.find(params[:id])
    end

	def index
		respond_with Block.all
	end
	def create
		block = params[:block]
		@block = Block.create(name: block[:name], path: block[:path], floor_id: params[:floor_id])
		render json: {block_id: @block.id}
	end
	def update
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
