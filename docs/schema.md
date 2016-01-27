# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
image_url       | string    |
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## follows
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
follower_id | integer   | not null, foreign key (references users), indexed, unique [followee_id]
followee_id | integer   | not null, foreign key (references users), indexed

## tracks
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
title       | string    | not null, indexed, unique [user_id]
description | text      |
image_url   | string    |
audio_url   | string    | not null
public      | boolean   | not null, default: true

## plays
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
track_id    | integer   | not null, foreign key (references tracks), indexed
(timestamps)|           |

## likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed, unique [track_id]
track_id    | integer   | not null, foreign key (references tracks), indexed

## playlists
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed, unique [title]
title       | string    | not null
description | text      |

## playlist_tracks
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
playlist_id | integer   | not null, foreign key (references playlists), indexed
track_id    | integer   | not null, foreign key (references tracks), indexed
ord         | integer   | not null

## Time permitting...

## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
track_id    | integer   | not null, foreign key (references tracks), indexed
body        | text      | not null

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
track_id    | integer   | not null, foreign key (references tracks), indexed, unique [tag_id]
tag_id      | integer   | not null, foreign key (references tags), indexed
