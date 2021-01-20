const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const forecastPlaceholder = document.querySelector('p#forecast')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const address = search.value

    fetch('http://localhost:3000/weather?address='+address).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                return console.log(data.error)
            }
            // console.log(data)
            forecastPlaceholder.innerHTML = data.forecast
        })
    })

    console.log(address)
})