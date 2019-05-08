class ScoreSerializer < ActiveModel::Serializer
  attributes :id, :score, :game, :player_id
end
