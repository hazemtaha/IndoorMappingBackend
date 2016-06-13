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
    @beacons = Beacon.all
    beacons = []
    Beacon.all.each { |bcn|
      bcn.id = bcn.id.to_s
      beacons.push(bcn)
    }
    @beacons = beacons
    render json: { beacons: @beacons }
  end
end
