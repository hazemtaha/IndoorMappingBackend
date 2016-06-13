class BeaconController < ApplicationController

  def create
    beacon = params[:beacon]
    @beacon = Beacon.create(name: beacon[:name], uuid: beacon[:uuid], major: beacon[:major], minor: beacon[:minor], x: beacon[:x], y: beacon[:y], block_id: beacon[:block])
    render json: {beacon_id: @beacon.id}
  end
  def destroy
    respond_with Beacon.destroy(params[:id])
  end

  def all
    render json: { beacons: Beacon.all.map(&:to_s).to_json } 
  end
end
