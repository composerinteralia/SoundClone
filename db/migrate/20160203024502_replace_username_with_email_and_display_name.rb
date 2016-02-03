class ReplaceUsernameWithEmailAndDisplayName < ActiveRecord::Migration
  def change
    rename_column :users, :username, :email
    add_column :users, :display_name, :string, null: false
  end
end
