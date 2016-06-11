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

ActiveRecord::Schema.define(version: 20160529162156) do

  create_table "beacons", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.integer  "uuid",       limit: 4
    t.integer  "major",      limit: 4
    t.integer  "minor",      limit: 4
    t.integer  "x",          limit: 4
    t.integer  "y",          limit: 4
    t.integer  "block_id",   limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "beacons", ["block_id"], name: "index_beacons_on_block_id", using: :btree

  create_table "blocks", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.string   "path",       limit: 255
    t.integer  "floor_id",   limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "blocks", ["floor_id"], name: "index_blocks_on_floor_id", using: :btree

  create_table "buildings", force: :cascade do |t|
    t.string   "address",    limit: 255
    t.string   "name",       limit: 255
    t.string   "thumbnail",  limit: 255
    t.integer  "owner_id",   limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "buildings", ["owner_id"], name: "index_buildings_on_owner_id", using: :btree

  create_table "floors", force: :cascade do |t|
    t.integer  "floor_num",   limit: 4
    t.integer  "width",       limit: 4
    t.integer  "height",      limit: 4
    t.integer  "building_id", limit: 4
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  add_index "floors", ["building_id"], name: "index_floors_on_building_id", using: :btree

  create_table "owners", force: :cascade do |t|
    t.string   "username",               limit: 255, default: "", null: false
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "picture",                limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "owners", ["email"], name: "index_owners_on_email", unique: true, using: :btree
  add_index "owners", ["reset_password_token"], name: "index_owners_on_reset_password_token", unique: true, using: :btree

  create_table "visitors", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.string   "username",               limit: 255
    t.date     "dob"
    t.string   "phone_type",             limit: 255
  end

  add_index "visitors", ["email"], name: "index_visitors_on_email", unique: true, using: :btree
  add_index "visitors", ["reset_password_token"], name: "index_visitors_on_reset_password_token", unique: true, using: :btree

  create_table "visits", force: :cascade do |t|
    t.integer  "visitor_id", limit: 4
    t.integer  "beacon_id",  limit: 4
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  add_index "visits", ["beacon_id"], name: "index_visits_on_beacon_id", using: :btree
  add_index "visits", ["visitor_id"], name: "index_visits_on_visitor_id", using: :btree

  add_foreign_key "beacons", "blocks"
  add_foreign_key "blocks", "floors"
  add_foreign_key "buildings", "owners"
  add_foreign_key "floors", "buildings"
  add_foreign_key "visits", "beacons"
  add_foreign_key "visits", "visitors"
end
