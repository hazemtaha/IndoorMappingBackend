class BeaconController < ApplicationController
  skip_before_action :verify_authenticity_token

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
      beacons.push({id: bcn.name, uuid: bcn.uuid, major: bcn.major, minor: bcn.minor, x: bcn.x, y: bcn.y, lon: bcn.lon, lat: bcn.lat })
    }
    @beacons = beacons
    render json: { beacons: @beacons }
  end

  def callibrate
    @beacon = Beacon.find_by(uuid: params[:uuid])
    @beacon.update_attributes ({ lat: params[:lat], lon: params[:lon] })
    render json: { beacon: @beacon }
  end
end
