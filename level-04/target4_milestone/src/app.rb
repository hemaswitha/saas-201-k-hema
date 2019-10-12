require 'sinatra'
# Your Myapp


class MyApp

def get_todos
    @@id ||=0
    @@todos ||= {}
  end
  
  def add_todo(todo,date)
    @@id+=1
    get_todos()[@@id]=[todo,date]
  end
  
  def get_todo(id)
    get_todos()[id]
  end
  
  def update_todo(id,title)
    get_todos()[id][0] = title
  end
  
  def delete_todo(id)
    get_todos().delete(id)
  end
  
end

  todo_list=MyApp.new
  
  delete "/todos/:id" do
    @id = params[:id].to_i
    todo_list.delete_todo(@id)
    redirect "/todos"
  end
  
  
  put "/todos/:id" do
    @id = params[:id].to_i
    todo_list.update_todo(@id,params[:title])
    redirect "/todos"
  end
  
  
  get "/todos/:id" do
    @id = params[:id].to_i
    @todo =todo_list. get_todo(@id)
    erb :todo
  end
  

  get "/todos" do
    @todos =todo_list.get_todos()
    erb :todos
  end
  
  post "/todos" do
    if params[:title].strip!=""
    todo_list.add_todo(params[:title],params[:date])
    end
    redirect "/todos"
  end