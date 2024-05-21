const checkBoxList = document.querySelectorAll('.custom-checkbox')

const inputfields = document.querySelectorAll('.goal-input')

const errorLabel = document.querySelector('.error-label')

const progressBar = document.querySelector('.progress-bar')

const progressValue = document.querySelector('.progress-value')

let allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
    first : {
        name : '',
        completed : false
    },
    second : {
        name : '',
        completed : false
    },
    third : {
        name : '',
        completed : false
    }
}

const progressLabel = document.querySelector('.progress-label')

const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! you just completed all the goals, time for chill :D'
]

// checkBoxList.forEach((checkbox) => {
//     checkbox.addEventListener('click' , (e) =>{
//         checkbox.parentElement.classList.toggle('completed')
//     })
    
// })

let goalCount = Object.values(allGoals).filter((goal) => goal.completed).length

progressValue.style.width = `${goalCount*100/3}%`

progressValue.firstElementChild.innerText = `${goalCount}/3 completed`

progressLabel.innerText = allQuotes[goalCount]

checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener('click', (e) => {
        const isAllGoalAdded = [...inputfields].every((input) => {
            return input.value
        })
        if(isAllGoalAdded){
        checkbox.parentElement.classList.toggle('completed')

        const inputId = checkbox.nextElementSibling.id
        allGoals[inputId].completed = !allGoals[inputId].completed
        localStorage.setItem('allGoals' ,JSON.stringify(allGoals) )

        
        goalCount = Object.values(allGoals).filter((goal) => goal.completed).length

        progressValue.style.width = `${goalCount*100/3}%`

        progressValue.firstElementChild.innerText = `${goalCount}/3 completed`

        progressLabel.innerText = allQuotes[goalCount]

        }else{
            progressBar.classList.add('show-error')
        }
      
      })
})





inputfields.forEach((input) => {

    input.value = allGoals[input.id].name

    if(allGoals[input.id].completed){
        input.parentElement.classList.add('completed')
    }

    

    input.addEventListener('focus' , () => {
        progressBar.classList.remove('show-error')
    })

    input.addEventListener('input' , (e) => {
        if(allGoals[input.id].completed){
            input.value = allGoals[input.id].name
            return
        }
        allGoals[e.target.id] = {
            name : e.target.value,
            completed : false
        }
        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })
})