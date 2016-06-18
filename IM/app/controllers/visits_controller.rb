class VisitsController < ApplicationController

	def getVistors
		@blocks = params[:blocks]
		@blockVisits = {}
		@blocks.each { |key, block|
			@blockVisits[key] = { visits: 0 }
			block.each { |beaconId|
				@visits = Visit.where(beacon_id: beaconId).count
				@blockVisits[key][:visits] += @visits
			} 
		}
		render json: { visits: @blockVisits }
	end

end
