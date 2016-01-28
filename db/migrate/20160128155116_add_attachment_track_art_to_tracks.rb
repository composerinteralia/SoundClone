class AddAttachmentTrackArtToTracks < ActiveRecord::Migration
  def self.up
    change_table :tracks do |t|
      t.attachment :track_art
    end
  end

  def self.down
    remove_attachment :tracks, :track_art
  end
end
