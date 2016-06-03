class OwnerController < Devise::RegistrationsController
  def sign_up_params
    params.require(:owner).permit(:email, :password, :username, :picture)
  end

  def account_update_params
    params.require(:owner).permit(:email, :password,:current_password, :username, :picture)
  end
end
