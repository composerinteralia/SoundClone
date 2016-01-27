User.destroy_all

colson = User.create!(
  username: 'composerinteralia',
  password: 'password'
)

guest = User.create!(
  username: 'secret-guest-account',
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

broken_consortini = Track.create!(
  user: colson,
  title: "broken consortini",
  description: "A sextet written for Cygnus Ensemble"
)

eine_kleine = Track.create!(
  user: mozart,
  title: "eine kleine nacht musik"
)

guest_track1 = Track.create!(
  user: guest,
  title: "My first track!",
  description: "Just a little something I put together one rainy evening"
)

guest_track2 = Track.create!(
  user: guest,
  title: "Exordium",
  dexcription: "My first composition for orchestra!"
)
