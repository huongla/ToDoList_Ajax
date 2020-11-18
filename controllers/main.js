
document.getElementById('newTask').onfocus = function(){
    document.getElementById('newTask').placeholder = '';
    document.getElementById('newTask').value = '';
    document.querySelector('#newTask').style.color = '#fff';
}

var tService = new TasksService();


//show all task from backend
var get_aTask = function(){
    var promise = tService.getAllTask();
    promise.then(function (result) {
        // console.log(result.data);
        var contentToDo = '';
        var contentDone = '';
        for (var i = 0; i < result.data.length; i++) {
            var t = result.data[i];
            console.log(t);
                var taskObj = new Task();
                taskObj.taskName = t.taskName;
                taskObj.status = t.status;
            if (!t.status) {
                contentToDo += `<li>
                    <span id="tName">${taskObj.taskName}</span>
                    <div class="buttons">
                        <button class="remove">
                            <i class="fa fa-trash-alt" onclick="delTask('${taskObj.taskName}')"></i>
                        </button>
                        <button class="complete">
                            <i class="far fa-check-circle" onclick="checkDone('${taskObj.taskName}')"></i>
                            <i class="fas fa-check-circle"></i>
                      </button>
                    </div>
                </li>`
            }else{
                contentDone += `<li>
                    <span id="tName">${taskObj.taskName}</span>
                    <div class="buttons">
                        <button class="remove">
                            <i class="fa fa-trash-alt" onclick="delTask('${taskObj.taskName}')"></i>
                        </button>
                        <button class="complete">
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-check-circle" onclick="rejectDone('${taskObj.taskName}')"></i>
                      </button>
                    </div>
                </li>`
            }
        }
        document.getElementById('todo').innerHTML = contentToDo;
        document.getElementById('completed').innerHTML = contentDone;
    }).catch(function (err) {
        console.log(err.response.data);
    })
}

get_aTask();

//add a task from frontend
document.getElementById('addItem').onclick = function () {
    var validate = new Validation();
    var t = new Task();
    t.taskName = document.getElementById('newTask').value;
    t.status = false;

    var valid = true;
    valid &= validate.checkNull(t.taskName, '#newTask');
    if(!valid){
        return;
    }
    
    axios({
        url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
        method: 'POST',
        data: t
    }).then(function (result) {
        console.log("Kết quả",result.data);
        document.getElementById('newTask').value = '';
        get_aTask();
    }).catch(function (err) {
        document.querySelector('#newTask').value = 'TASK NAME IS ALREADY EXITS';
        document.querySelector('#newTask').style.color = '#2bfe72';
        console.log("Kết quả", err.response.data);
       
    })
}

//delete a task on div "todo"
var delTask = function (taskName) {
    //Gọi api từ backend => trả về promise
    var promise = tService.deleteTask(taskName);

    promise.then(function (result) {
        console.log(result.data);
        get_aTask();
    }).catch(function (err) {
        console.log(err.response.date);
    });
}

var checkDone = function (taskName) {
    var taskUpdate = new Task();
    taskUpdate.taskName = taskName;
    taskUpdate.status = true;

    var promise = tService.doneTask(taskName, taskUpdate);
    promise.then(function (result) {
        console.log(result.data);
        get_aTask();
    }).catch(function (err) {
        console.log(err.response.data);
    })
}

var rejectDone = function(taskName){
    var taskUpdate = new Task();
    taskUpdate.taskName = taskName;
    taskUpdate.status = false;

    var promise = tService.rejectTask(taskName, taskUpdate);
    promise.then(function (result) {
        console.log(result.data);
        get_aTask();
    }).catch(function (err) {
        console.log(err.response.data);
    })
}




