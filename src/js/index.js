import '../styles/select.scss'
import '../styles/styles.scss'

function select() {
  let selectHeader = document.querySelectorAll('.select-header')
  let selectItem = document.querySelectorAll('.select-body__item')
  let selectBodyes = document.querySelectorAll('.select-body')

  selectHeader.forEach(item => {
    item.addEventListener('click', selectToggle)
  })


  selectItem.forEach(item => {
    item.addEventListener('click', selectChoose)
  })


  function selectToggle() {
    this.nextElementSibling.classList.toggle('select-body_active')
  }

  function selectChoose() {
    let text = this.innerText;
    let currentText = this.closest('.select').querySelector('.select-header__current')
    let currentBody = this.closest('.select').querySelector('.select-body')

    currentText.innerText = text
    currentText.classList.remove('grey')
    currentBody.classList.remove('select-body_active')
  }


  document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('select-header') || e.target.classList.contains('select-body') || e.target.classList.contains('select-header__current') || e.target.classList.contains('select-header__icon')) {
      selectBodyes.forEach(item => {

        if (e.target.closest('.select').querySelector('.select-body') !== item) {
          item.classList.remove('select-body_active')
        } else {
          let icon = item.previousElementSibling.querySelector('.select-header__icon')
          icon.classList.toggle('select-header__icon_active')
        }

      })
    } else {
      selectBodyes.forEach(item => {
        item.classList.remove('select-body_active')
        let icon = item.previousElementSibling.querySelector('.select-header__icon')
        icon.classList.remove('select-header__icon_active')
      })
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {

  select()


  const check = document.getElementById('check')
  const temperatureBlock = document.querySelector('.cargo-temperature')
  console.log(check)

  check.addEventListener('click', (e) => {
    if (e.target.checked) {
      temperatureBlock.classList.remove('dn')
    } else {
      temperatureBlock.classList.add('dn')
    }
  })


  const adrInputs = document.querySelectorAll('.time-wrapper__input')

  adrInputs.forEach(input => {
    input.addEventListener('focus', (e) => {
      e.target.nextElementSibling.innerText = 'ВЫБРАНО'
    })

    input.addEventListener('blur', (e) => {
      e.target.nextElementSibling.innerText = 'НЕ ВЫБРАНО'
    })
  })

})
