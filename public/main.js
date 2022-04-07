const update = document.querySelector('#update-button')
const deletar = document.querySelector('#delete')

update.addEventListener('click', (_) => {
  fetch('/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Darth Vadar',
      quote: 'I find your lack of faith disturbing.',
    }),
  })
    .then((res) => {
      if (res.ok) return res.json()
    })
    .then((response) => {
      window.location.reload()
    })
  // Send PUT Request here
})

deletar.addEventListener('click', (ev) => {
  console.log(ev.target.parentElement.querySelector('.name').value)
  let nomeDeletado = ev.target.parentElement.querySelector('.name').value

  fetch('/quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: nomeDeletado,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json()
    })
    .then((data) => {
      window.location.reload()
    })
})

function apagarTudo() {
  fetch('/quotesDelAll', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: '',
    }),
  })
    .then((res) => {
      if (res.ok) return res.json()
    })
    .then((data) => {
      window.location.reload()
    })
}
