class BeaconController < ApplicationController
  def save_beacons
    params[:beacons].each { |beacon|
      block_id = Block.find_by(name: beacon[:block]).id
      Beacon.create(name: beacon[:name], uuid: beacon[:uuid], major: beacon[:major], minor: beacon[:minor], x: beacon[:x], y: beacon[:y], block_id: block_id)
    }
    render json: {success: 1}
  end
  def create
    beacon = params[:beacon]
    Beacon.create(name: beacon[:name], uuid: beacon[:uuid], major: beacon[:major], minor: beacon[:minor], x: beacon[:x], y: beacon[:y], block_id: beacon[:block])
    render json: {success: 1}
  end
end
