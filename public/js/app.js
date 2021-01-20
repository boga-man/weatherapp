const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const forecastPlaceholder = document.querySelector('p#forecast')
const LocationPlaceholder = document.querySelector('p#place')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const address = search.value
    forecastPlaceholder.textContent = "Loading..."

    fetch('/weather?address='+address).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                forecastPlaceholder.innerHTML = data.error
                LocationPlaceholder.innerHTML = ''
                return
            }
            // console.log(data)
            forecastPlaceholder.innerHTML = data.forecast 
            LocationPlaceholder.innerHTML = data.place
        })
    })

    console.log(address)
})