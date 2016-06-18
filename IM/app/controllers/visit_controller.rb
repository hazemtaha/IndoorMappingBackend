class VisitController < ApplicationController
  def create
    @beacon_id = Beacon.find_by(uuid: params[:uuid]).id
    Visit.create(visitor_id: params[:visitor_id], beacon_id: @beacon_id)
  end
end
