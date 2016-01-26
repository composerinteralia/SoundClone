User.destroy_all

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

Track.destroy_all

again = Track.create!(
  user: colson,
  title: "again",
  description: "Music for soprano, flute, clarinet, violin, and cello"
)
