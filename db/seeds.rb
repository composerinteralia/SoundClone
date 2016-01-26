# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

colson = User.create!(
  username: 'composerinteralia',
  password: 'password'
)

mozart = User.create!(
  username: 'Wolfgang-Amadeus',
  password: 'password'
)

brahms = User.create!(
  username: 'Big-Bad-B',
  password: 'password'
)

haydn = User.create!(
  username: 'jokester25',
  password: 'password'
)
