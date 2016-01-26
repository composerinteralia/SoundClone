class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.text :description

      t.timestamps null: false
    end
    add_index :tracks, :user_id
    add_index :tracks, [:title, :user_id], unique: true
  end
end
