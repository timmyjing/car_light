class CarsController < ActionController::API

  def index
    cars = Car.where(vin: params[:vin])
    render json: cars
  end

  def create
    car = Car.new(vin: params[:vin], views: 1)
    if car.save
      render json: car
    else
      render json: car.errors.full_messages, status: 422
    end
  end

  def update
    car = Car.find_by(vin: params[:vin])
    car.increment_views
    if car.save
      render json: car
    else
      render json: car.errors.full_messages, status: 404
    end
  end
  
end