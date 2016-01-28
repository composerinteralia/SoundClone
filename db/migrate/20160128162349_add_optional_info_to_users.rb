class AddOptionalInfoToUsers < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.column :fname, :string
      t.column :lname, :string
      t.column :bio, :text
    end
  end
end
