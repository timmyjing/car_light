class CreateCars < ActiveRecord::Migration[5.2]
  def change
    create_table :cars do |t|
      t.string :vin, null: false
      t.integer :views, null: false

      t.timestamps
    end

    add_index :cars, :vin, unique: true
  end
end
