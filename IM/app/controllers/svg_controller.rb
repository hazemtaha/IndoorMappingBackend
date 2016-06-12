class SvgController < ApplicationController
  def create
    @svg = Svg.find_by(floor_id: params[:floor_id])
    if @svg == nil
      @svg = Svg.create(floor_id: params[:floor_id], svg_code: params[:svg])
    else
      @svg.svg_code = params[:svg]
      @svg.save
    end
    render json: {svg_id: @svg.id}
  end
  def show
    @svg = Svg.find_by(floor_id: params[:floor_id])
    respond_with @svg
  end
  def import
    @floor_id = Beacon.find_by(uuid: params[:uuid]).block.floor.id
    respond_with Svg.find_by(floor_id: @floor_id)
  end
end
