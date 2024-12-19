const scriptURL = 'https://script.google.com/macros/s/AKfycbyYbiegehwZ2IOWRnyHeR37ZrUBTIZAC07QAXpGHzLdSPfmseryIs6Pb-ezt5OVzScT/exec'

const form = document.forms['contact-form']

form.addEventListener('submit' , e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'post', body: new FormData(form)})
    .then(response => alert("Thank you! Your form is submitted successfully."))
    .then(() => { window.location.reload(); })
    .catch(error => console.error('Error!', error.message))
})