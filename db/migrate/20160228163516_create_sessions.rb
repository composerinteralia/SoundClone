class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.integer :user_id, null: false
      t.string :token, null: false

      t.timestamps null: false
    end
    add_index :sessions, :user_id
    add_index :sessions, :token, unique: true
  end
end
