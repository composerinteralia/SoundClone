# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160128155116) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "tracks", force: :cascade do |t|
    t.integer  "user_id",                null: false
    t.string   "title",                  null: false
    t.text     "description"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "track_art_file_name"
    t.string   "track_art_content_type"
    t.integer  "track_art_file_size"
    t.datetime "track_art_updated_at"
  end

  add_index "tracks", ["title", "user_id"], name: "index_tracks_on_title_and_user_id", unique: true, using: :btree
  add_index "tracks", ["user_id"], name: "index_tracks_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",                   null: false
    t.string   "password_digest",            null: false
    t.string   "session_token",              null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.string   "profile_image_file_name"
    t.string   "profile_image_content_type"
    t.integer  "profile_image_file_size"
    t.datetime "profile_image_updated_at"
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
