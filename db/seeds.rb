User.destroy_all

colson = User.create!(
  username: 'composerinteralia',
  password: '1qaz2WSX3edc',
  profile_image: File.open("app/assets/images/daniel.jpg")
)

rachel = User.create!(
  username: 'Piu Mosso',
  password: '1qaz2WSX3edc',
  profile_image: File.open("app/assets/images/rachel.jpg")
)

guest = User.create!(
  username: 'Best Guest',
  password: 'password'
)

ella = User.create!(
  username: "Ella Bella",
  password: "1qaz2WSX3edc",
  profile_image: File.open("app/assets/images/ella.jpg")
)

mozart = User.create!(
  username: 'Wolfgang-Amadeus',
  password: '1qaz2WSX3edc'
  # profile_image: File.open("app/assets/images/")
)

brahms = User.create!(
  username: 'Big-Bad-B',
  password: '1qaz2WSX3edc'
  # profile_image: File.open("app/assets/images/")
)

haydn = User.create!(
  username: 'jokester25',
  password: '1qaz2WSX3edc'
  # profile_image: File.open("app/assets/images/")
)

Track.destroy_all

Track.create!(
  user: ella,
  title: "Track"
)

Track.create!(
  user: rachel,
  title: "Track"
)

eine_kleine = Track.create!(
  user: mozart,
  title: "eine kleine nacht musik"
)

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

vitulatory_strains = Track.create!(
  user: colson,
  title: "vitulatory strains",
  audio: File.open("app/assets/audios/vitulatory_strains.mp3"),
  track_art: File.open("app/assets/images/sheep.jpg")
)

guest_track1 = Track.create!(
  user: guest,
  title: "My first track!",
  description: "Just a little something I put together one rainy evening"
)

guest_track2 = Track.create!(
  user: guest,
  title: "Exordium",
  description: "My first composition for orchestra!"
)
