var TasksService = function(){
    //Phương thức giao tiếp BACKEND qua api => lấy thông tin từ server về
    this.getAllTask = function(){
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        });
        return promise;
    }
    this.rejectTask = function(taskName, taskUpdate){
        var promise = axios({
            url:`http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        })
        return promise;
    }
    this.deleteTask = function(taskName){
        var promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        })
        return promise;
    }
    this.getTask = function(taskName){
        var promise = axios({
            url:`http://svcy.myclass.vn/api/ToDoList/GetTask?taskName=${taskName}`,
            method: 'POST'
        })
        return promise;
    }
    this.doneTask = function(taskName, taskUpdate){
        var promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        })
        return promise;
    }
}