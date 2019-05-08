class CreateScores < ActiveRecord::Migration[5.2]
  def change
    create_table :scores do |t|
      t.integer :score
      t.string :game
      t.integer :player_id

      t.timestamps
    end
  end
end
