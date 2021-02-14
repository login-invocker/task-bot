const timeEisenhowerMaanager = (listTask) => {
    
    let taskDoFist = [], taskSchedule = [], taskDelegate = [], taskDontDo = []
    listTask.forEach(task => {
        
        // taskk khủng hoảng 20%
        if(task.isImportant === true && task.isEmergency === true){
            taskDoFist.push(task)
        }
        // task mục tiêu 60% time
        else if(task.isImportant === true && task.isEmergency === false){
            taskSchedule.push(task)
        }
        // task Sinh hoạt 5%
        else if(task.isImportant === false && task.isEmergency === false){
            taskDontDo.push(task)
        }
        // task ủy quyền 5%
        else{
            taskDelegate.push(task)
        }
    })

    return [{
        taskDoFist
    },{
        taskSchedule
    },{
        taskDelegate
    },{
        taskDontDo
    }]
}