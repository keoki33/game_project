class ScoresController < ApplicationController

   def index
    @scores = Score.all.sort
    @test = @scores.sort_by(&:score).reverse
    render json: @test.to_json
  end

  def show
    @score = Score.find_by(id: params[:id])
    render json: @score.to_json
  end

  def new
    @score = Score.new
  end

  def create
    @score = Score.create(score: params[:score], game: params[:game], player_id: params[:player_id])
      render json: @score.to_json
  end

#   def edit
#     @score = Score.find(params[:id])
#   end

#   def update
#     @score = Score.find(params[:id])

#     @score.update(score_params)

#     if @score.save
#       redirect_to @score
#     else
#       render :edit
#     end
#   end

  def destroy
    @score = Score.find_by(name: params[:name])
    @score.destroy
  end

end
