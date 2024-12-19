const scriptURL = 'https://script.google.com/macros/s/AKfycbx3FKzC_4RoYZOX20uvwsT1R35E7NiX9xHfpgrh9VK3O_oFypzXLgw-DS9z3V_LClCX/exec'

const form = document.forms['contact-form']

form.addEventListener('submit' , e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'post', body: new FormData(form)})
    .then(response => alert("Thank you! Your form is submitted successfully."))
    .then(() => { window.location.reload(); })
    .catch(error => console.error('Error!', error.message))
})