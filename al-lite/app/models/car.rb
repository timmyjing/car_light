class Car < ApplicationRecord
  validates :vin, uniqueness: true
  validates :vin, :views, presence: true

  def increment_views
    self.views += 1
  end

end
