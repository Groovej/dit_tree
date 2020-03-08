class DirectoriesController < ApplicationController
  before_action :find_directory!, only: [:update, :destroy]

  def index
    render 'shared'
  end

  def show
    render 'shared'
  end

  def data
    render json: { data: Directory.all.select(:id, :name, :mpath).limit(100) }
  end

  def create
    directory = Directory.create(create_params)
    render json: {
      directory: JSON.parse(directory.to_json).only("id", "name", "mpath")
    }
  end

  def update
    @directory.update(update_params)
    render json: { directory: @directory }
  end

  def destroy
    @directory.destroy
    render json: { directory: @directory }
  end

  private

  def find_directory!
    @directory = Directory.find(params[:id])
  end

  def create_params
    params.require(:directory).permit(:name, :parent_id)
  end

  def update_params
    params.require(:directory).permit(:name)
  end
end
