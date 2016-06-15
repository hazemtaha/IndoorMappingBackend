class VisitsController < ApplicationController

	def getVistors
		respond_with Visit.where(:beacon_id => params[:beacon_id] )
		puts @a.inspect
	end

end
