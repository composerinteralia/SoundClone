User.destroy_all

me = User.create!(
  email: "composerinteralia@example.com",
  password: "password",
  display_name: "composerinteralia",
  fname: "Daniel",
  lname: "Colson",
  profile_image: "https://s3.amazonaws.com/soundclone-dev/seed-images/daniel.jpg"
)

rachel = User.create!(
  email: "kim@example.com",
  password: "1qaz2WSX3edc",
  display_name: "♥ Rachel ♥",
  fname: "Rachel",
  lname: "Kim",
  profile_image: "https://s3.amazonaws.com/soundclone-dev/seed-images/piano-outside.jpg"
)

ella = User.create!(
  email: "woof@example.com",
  password: "1qaz2WSX3edc",
  display_name: "Ella Bella",
  fname: "Ella",
  lname: "Kim",
  profile_image: "https://s3.amazonaws.com/soundclone-dev/seed-images/ellabella.jpg"
)

mozart = User.create!(
  email: "amadeus@example.com",
  password: "1qaz2WSX3edc",
  display_name: "Papapapapapageno",
  fname: "Wolfgang A.",
  lname: "Mozart",
  profile_image: "https://s3.amazonaws.com/soundclone-dev/seed-images/YoungMozart.jpg"
)

brahms = User.create!(
  email: "counterpoint321@example.com",
  password: "1qaz2WSX3edc",
  display_name: "The Third B",
  fname: "Johannes",
  lname: "Brahms",
  profile_image: "https://s3.amazonaws.com/soundclone-dev/seed-images/brahms.png"
)

beethoven = User.create!(
  email: "joy@example.com",
  password: "1qaz2WSX3edc",
  display_name: "Ludwig van Beethoven",
  fname: "Dun",
  lname: "dun dun duuuuuuun",
  profile_image: "https://s3.amazonaws.com/soundclone-dev/seed-images/Beethoven.jpg"
)

bach = User.create!(
  email: "54321@example.com",
  password: "1qaz2WSX3edc",
  display_name: "Maestro Contrapunctus",
  fname: "J. S.",
  lname: "Bach",
  profile_image: "https://s3.amazonaws.com/soundclone-dev/seed-images/bach.jpg"
)

babbitt = User.create!(
  email: "mbb12@example.com",
  password: "1qaz2WSX3edc",
  display_name: "MBB",
  fname: "Milton",
  lname: "Babbitt",
  profile_image: "https://s3.amazonaws.com/soundclone-dev/seed-images/babbitt.jpg"
)

mark = User.create!(
  email: "mgc@example.com",
  password: "1qaz2WSX3edc",
  display_name: "Son of the Coal Man",
  fname: "Mark",
  lname: "C"
)

Track.destroy_all

consortini = Track.create!(
  user: me,
  title: "Broken Consortini",
  description: "A sextet written for Cygnus Ensemble",
  track_art: "https://s3.amazonaws.com/soundclone-dev/seed-images/banjo.jpg",
  audio: "https://s3.amazonaws.com/soundclone-dev/seed-audio/broken-consortini.mp3"
)

fugue = Track.create!(
  user: bach,
  title: "Fugue",
  description: "Some of my best work in C# minor",
  track_art: "https://s3.amazonaws.com/soundclone-dev/seed-images/glasses.jpg",
  audio: "https://s3.amazonaws.com/soundclone-dev/seed-audio/bach-fugue4.mp3"
)

cantata = Track.create!(
  user: mark,
  title: "Cantata",
  description: "A sacred work for choir",
  audio: "https://s3.amazonaws.com/soundclone-dev/seed-audio/buxtehude.mp3"
)

 andante = Track.create!(
  user: rachel,
  title: "Andante",
  description: "A slow movement written by C.P.E Bach",
  track_art: "https://s3.amazonaws.com/soundclone-dev/seed-images/twig.jpg",
  audio: "https://s3.amazonaws.com/soundclone-dev/seed-audio/cpe-bach-andante.mp3"
)

 allegro = Track.create!(
  user: ella,
  title: "Allegro",
  description: "A fast movement written by C.P.E. Bach",
  track_art: "https://s3.amazonaws.com/soundclone-dev/seed-images/harp.jpg",
  audio: "https://s3.amazonaws.com/soundclone-dev/seed-audio/cpe-bach-allegro.mp3"
)

crowded = Track.create!(
  user: babbitt,
  title: "Crowded Air",
  track_art: "https://s3.amazonaws.com/soundclone-dev/seed-images/mixer.jpg",
  audio: "https://s3.amazonaws.com/soundclone-dev/seed-audio/crowded-air.mp3"
)

duality = Track.create!(
  user: me,
  title: "Duality",
  description: "Written in two sections - the first is slow, the second fast",
  track_art: "https://s3.amazonaws.com/soundclone-dev/seed-images/tuba-store.jpg",
  audio: "https://s3.amazonaws.com/soundclone-dev/seed-audio/duality.mp3"
)

 jc = Track.create!(
  user: mozart,
  title: "Symphony No. 9000",
  description: "One of my favorite movements by JC Bach",
  audio: "https://s3.amazonaws.com/soundclone-dev/seed-audio/jc-bach-allegro.mp3"
)

 prelude = Track.create!(
  user: bach,
  title: "Prelude in C major",
  description: "Don't you just love this key?",
  track_art: "https://s3.amazonaws.com/soundclone-dev/seed-images/ballet.jpg",
  audio: "https://s3.amazonaws.com/soundclone-dev/seed-audio/bach-prelude1.mp3"
)

pantun = Track.create!(
  user: babbitt,
  title: "Pantun",
  track_art: "https://s3.amazonaws.com/soundclone-dev/seed-images/mic.jpg",
  audio: "https://s3.amazonaws.com/soundclone-dev/seed-audio/pantun.mp3"
)

sonata_3 = Track.create!(
  user: beethoven,
  title: "Piano Sonata, III",
  description: "For solo piano",
  track_art: "https://s3.amazonaws.com/soundclone-dev/seed-images/tower.jpg",
  audio: "https://s3.amazonaws.com/soundclone-dev/seed-audio/rachel-beethoven3.mp3"
)

 bach2 = Track.create!(
  user: rachel,
  title: "Fugue",
  description: "Listen to all that fantastic counterpoint!",
  track_art: "https://s3.amazonaws.com/soundclone-dev/seed-images/organ.jpg",
  audio: "https://s3.amazonaws.com/soundclone-dev/seed-audio/rachel-bach2.mp3"
)

 rhapsodie = Track.create!(
  user: brahms,
  title: "Rhapsodie in Eb",
  description: "The saddest of keys",
  track_art: "https://s3.amazonaws.com/soundclone-dev/seed-images/broken-keys.jpg",
  audio: "https://s3.amazonaws.com/soundclone-dev/seed-audio/rachel-brahms3.mp3"
)

sonata_2 = Track.create!(
  user: beethoven,
  title: "Sonata, II",
  description: "For solo piano",
  track_art: "https://s3.amazonaws.com/soundclone-dev/seed-images/road.jpg",
  audio: "https://s3.amazonaws.com/soundclone-dev/seed-audio/rachel-beethoven2.mp3"
)

 intermezzo_2 = Track.create!(
  user: brahms,
  title: "Intermezzo in E minor",
  track_art: "https://s3.amazonaws.com/soundclone-dev/seed-images/broken-keys.jpg",
  audio: "https://s3.amazonaws.com/soundclone-dev/seed-audio/rachel-brahms2.mp3"
)

 stamitz = Track.create!(
  user: ella,
  title: "Minuetto",
  description: "Grrrrrr woof",
  track_art: "https://s3.amazonaws.com/soundclone-dev/seed-images/dog2.jpg",
  audio: "https://s3.amazonaws.com/soundclone-dev/seed-audio/stamitz-minuetto.mp3"
)

 trio = Track.create!(
  user: me,
  title: "String Trio",
  description: "For violin, viola, and cello",
  track_art: "https://s3.amazonaws.com/soundclone-dev/seed-images/arches.jpg",
  audio: "https://s3.amazonaws.com/soundclone-dev/seed-audio/string-trio.mp3"
)

 bach_1 = Track.create!(
  user: rachel,
  title: "Prelude",
  track_art: "https://s3.amazonaws.com/soundclone-dev/seed-images/organ.jpg",
  audio: "https://s3.amazonaws.com/soundclone-dev/seed-audio/rachel-bach-1.mp3"
)

 intermezzo_1 = Track.create!(
  user: brahms,
  title: "Intermezzo in B minor",
  description: "The saddest of keys",
  track_art: "https://s3.amazonaws.com/soundclone-dev/seed-images/broken-keys.jpg",
  audio: "https://s3.amazonaws.com/soundclone-dev/seed-audio/rachel-brahms1.mp3"
)

sonata_1 = Track.create!(
  user: beethoven,
  title: "Sonata, I",
  description: "For solo piano",
  track_art: "https://s3.amazonaws.com/soundclone-dev/seed-images/records.jpg",
  audio: "https://s3.amazonaws.com/soundclone-dev/seed-audio/rachel-beethoven1.mp3"
)

presto = Track.create!(
  user: ella,
  title: "Presto",
  description: "Woof woof woof!",
  track_art: "https://s3.amazonaws.com/soundclone-dev/seed-images/dog.jpg",
  audio: "https://s3.amazonaws.com/soundclone-dev/seed-audio/stamitz-presto.mp3"
)

 duet = Track.create!(
  user: me,
  title: "Duet in Three",
  description: "Music for horn and vibes/marimba",
  track_art: "https://s3.amazonaws.com/soundclone-dev/seed-images/alone.jpg",
  audio: "https://s3.amazonaws.com/soundclone-dev/seed-audio/duet.mp3"
)

 phonemena = Track.create!(
  user: babbitt,
  title: "Phonemena",
  description: "I used phonemes to articulate particular aspects of the musical structure",
  track_art: "https://s3.amazonaws.com/soundclone-dev/seed-images/mixer.jpg",
  audio: "https://s3.amazonaws.com/soundclone-dev/seed-audio/phonemena.mp3"
)

 prestissimo = Track.create!(
  user: mozart,
  title: "Prestissimo",
  description: "One of stamitz's finest compositions",
  track_art: "https://s3.amazonaws.com/soundclone-dev/seed-images/dogs.jpg",
  audio: "https://s3.amazonaws.com/soundclone-dev/seed-audio/stamitz-prestissimo.mp3"
)

Follow.destroy_all

Follow.create!(
  follower: me,
  followee: mozart
)

Follow.create!(
  follower: me,
  followee: babbitt
)

Follow.create!(
  follower: me,
  followee: ella
)

Follow.create!(
  follower: me,
  followee: beethoven
)

Follow.create!(
  follower: me,
  followee: brahms
)

Like.destroy_all

Like.create!(
  user: me,
  track: phonemena
)

Like.create!(
  user: me,
  track: presto
)

Like.create!(
  user: me,
  track: stamitz
)

Like.create!(
  user: me,
  track: jc
)

Like.create!(
  user: me,
  track: fugue
)

Like.create!(
  user: me,
  track: andante
)

Like.create!(
  user: me,
  track: prelude
)

Like.create!(
  user: me,
  track: intermezzo_2
)

Like.create!(
  user: mozart,
  track: prestissimo
)

Like.create!(
  user: mark,
  track: phonemena
)

Like.create!(
  user: bach,
  track: phonemena
)

Like.create!(
  user: brahms,
  track: phonemena
)
