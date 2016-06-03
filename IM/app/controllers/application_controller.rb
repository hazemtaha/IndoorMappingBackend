require "application_responder"

class ApplicationController < ActionController::Base
  self.responder = ApplicationResponder
  respond_to :html

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  respond_to :json

  before_action :configure_permitted_parameters, if: :devise_controller?

  def angular
    render 'layouts/application'
  end

  private
  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :username
  end

  protect_from_forgery

after_filter :set_csrf_cookie_for_ng

# functions of tokens

def set_csrf_cookie_for_ng
  cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
end
protected

  # In Rails 4.2 and above
  def verified_request?
    super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
  end

end
