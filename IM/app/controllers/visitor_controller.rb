class VisitorController < Devise::RegistrationsController
  def sign_up_params
	#aaa    
	params.require(:visitor).permit(:email, :password, :username, :dob , :created_at)
  end

  def account_update_params
    params.require(:visitor).permit(:email, :password,:current_password, :username)
  end
end
