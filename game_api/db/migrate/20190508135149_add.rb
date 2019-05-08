class Add < ActiveRecord::Migration[5.2]
  def change

    add_column :scores, :name, :string
  end
end
