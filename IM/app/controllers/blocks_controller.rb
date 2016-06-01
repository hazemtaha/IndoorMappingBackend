class BlocksController < ApplicationController
end

def index
	respond_with Block.all
end