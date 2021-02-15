const timeEisenhowerManager = (listTask) => {
    
    let taskDoFist = [], taskSchedule = [], taskDelegate = [], taskDontDo = []
    listTask.forEach(task => {
        
        // task khủng hoảng 20%
        if(task.isImportant === true && task.isEmergency === true){
            taskDoFist.push({
              title:task.title
            })
        }
        // task mục tiêu 60% time
        else if(task.isImportant === true && task.isEmergency === false){
            taskSchedule.push({
              title:task.title
            })
        }
        // task Sinh hoạt 5%
        else if(task.isImportant === false && task.isEmergency === false){
            taskDontDo.push({
              title: task.title
            })
        }
        // task ủy quyền 5%
        else{
            taskDelegate.push({
              title:task.title
            })
        }
    })
    
    const timeDoFist = taskDoFist.length > 0 
    ? 20/taskDoFist.length
    : 0
    const timeTaskSchedule = taskSchedule.length > 0
    ? 60/taskSchedule.length
    : 0
    const timeTaskDekegate = taskDelegate.length > 0
    ? 5/taskDelegate.length
    : 0
    const timeTaskDontDo = taskDontDo.length > 0 
    ? 5/taskDontDo.length
    : 0

    // map
    const taskDoFistMap = taskDoFist.map((task) => {
      task.timePercent = timeDoFist
      return task
    })
    const taskScheduleMap = taskSchedule.map((task) => {
      task.timePercent = timeTaskSchedule
      return task
    })
    const taskDelegateMap = taskDelegate.map((task) => {
      task.timePercent = timeTaskDekegate
      return task
    })
    const taskDontDoMap = taskDontDo.map((task) => {
      task.timePercent = timeTaskDontDo
      return task
    })
    return [...taskDoFistMap, ...taskScheduleMap, ...taskDelegateMap, ...taskDontDoMap]

// ex: data result
// [
//   {
//     "title": "Lên cty làm này",
//     "timePercent": 20
//   },
//   {
//     "title": "Tiếng anh chuyên ngành",
//     "timePercent": 20
//   },
//   {
//     "title": "học Tiếng anh nha",
//     "timePercent": 20
//   },
// ]
}

module.exports = {
  timeEisenhowerManager
}