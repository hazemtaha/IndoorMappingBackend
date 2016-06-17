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
      beacons.push({id: bcn.name, uuid: bcn.uuid, major: bcn.major, minor: bcn.minor, x: bcn.x, y: bcn.y})
    }
    @beacons = beacons
    render json: { beacons: @beacons }
  end

  def callibrate
    @beacon = Bacon.find_by(uuid: params[:uuid])
    @beacon.update_attributes ({ lat: params[:lat], lon: params[:lon] })
  end
end
