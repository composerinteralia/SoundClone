User.destroy_all

colson = User.create!(
  email: "composerinteralia@example.com",
  password: "password",
  display_name: "composerinteralia",
  fname: "Daniel",
  lname: "Colson",
  profile_image: File.open("app/assets/images/daniel.jpg")
)

rachel = User.create!(
  email: "kim@example.com",
  password: "1qaz2WSX3edc",
  display_name: "Più Mosso",
  fname: "Rachel",
  lname: "Kim",
  profile_image: File.open("app/assets/images/piano-outside.jpg")
)

ella = User.create!(
  email: "woof@example.com",
  password: "1qaz2WSX3edc",
  display_name: "Ella Bella",
  fname: "Ella",
  lname: "Kim",
  profile_image: File.open("app/assets/images/ellabella.jpg")
)

mozart = User.create!(
  email: "amadeus@example.com",
  password: "1qaz2WSX3edc",
  display_name: "Papapapapapageno",
  fname: "Wolfgang",
  lname: "Mozart",
  profile_image: File.open("app/assets/images/YoungMozart.jpg")
)

brahms = User.create!(
  email: "counterpoint321@example.com",
  password: "1qaz2WSX3edc",
  display_name: "Big-Bad-B",
  fname: "Johannes",
  lname: "Brahms",
  profile_image: File.open("app/assets/images/brahms.png")
)

beethoven = User.create!(
  email: "joy@example.com",
  password: "1qaz2WSX3edc",
  display_name: "ImmortalBeloved",
  fname: "Ludwig",
  lname: "van Beethoven",
  profile_image: File.open("app/assets/images/Beethoven.jpg")
)

Track.destroy_all

eine_kleine = Track.create!(
  user: mozart,
  title: "Eine kleine nacht Musik",
  track_art: File.open("app/assets/images/tuba-store.jpg"),
  audio: File.open("app/assets/audios/stag-roar.mp3"),
)

again = Track.create!(
  user: colson,
  title: "again",
  description: "Music for soprano, flute, clarinet, violin, and cello",
  audio: File.open("app/assets/audios/again.mp3")
)

piano = Track.create!(
  user: rachel,
  title: "Piano Roll",
  description: "Just a little something I put together one rainy evening"
)

broken_consortini = Track.create!(
  user: colson,
  title: "broken consortini",
  description: "A sextet written for Cygnus Ensemble",
  audio: File.open("app/assets/audios/broken-consortini.mp3"),
  track_art: File.open("app/assets/images/banjo.jpg")
)

ferne = Track.create!(
  user: beethoven,
  title: "An die ferne Geliebte",
  track_art: File.open("app/assets/images/ballet.jpg")
)

electronic = Track.create!(
  user: ella,
  title: "Woof woof",
  audio: File.open("app/assets/audios/revision.wav"),
  track_art: File.open("app/assets/images/organ.jpg")
)

vitulatory_strains = Track.create!(
  user: colson,
  title: "vitulatory strains",
  audio: File.open("app/assets/audios/vitulatory_strains.mp3"),
  track_art: File.open("app/assets/images/arches.jpg")
)

etude = Track.create!(
  user: rachel,
  title: "Electronic Etude",
  audio: File.open("app/assets/audios/etude1.wav"),
  track_art: File.open("app/assets/images/mic.jpg")
)
