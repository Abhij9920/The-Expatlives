const scriptURL = 'https://script.google.com/macros/s/AKfycbwICrcXPm-7kVoKRbMK8OBVi4RfbsOAkGWsYzhlwdC79ZfiX-3hpcoHQ6LKwr5CTL6n4Q/exec'

const form = document.forms['contact-form']

form.addEventListener('submit' , e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'post', body: new FormData(form)})
    .then(response => alert("Thank you! Your form is submitted successfully."))
    .then(() => { window.location.reload(); })
    .catch(error => console.error('Error!', error.message))
})