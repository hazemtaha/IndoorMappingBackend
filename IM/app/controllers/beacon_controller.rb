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
    @beacons.each { |bcn|
      beacons.push({id: 'beacon'+bcn.id.to_s, uuid: bcn.uuid, major: bcn.major, minor: bcn.minor})
    }
    @beacons = beacons
    render json: { beacons: @beacons }
  end
end
