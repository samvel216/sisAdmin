import {closeMobileMenu, openBurgerBtn} from './funk/menu';
const sectionServiseEl = document.querySelector(".sectionServise");
const sectionСomparisonEl = document.querySelector(".sectionСomparison");
const sectionHeroEl = document.querySelector(".sectionHero");
const sectionExperienceEl = document.querySelector(".sectionExperience");
const sectionContactEl = document.querySelector('.sectionContact');
const mainEl = document.querySelector(".main");
const headerMenuButtonEl = document.querySelector(".headerMenuButton");
const mobileHeaderCloseButtonEl = document.querySelector(".mobile-header-close-button");
const contactScrolBtnEl =document.querySelector('.contactScrolBtn');
console.log(headerMenuButtonEl);
console.log(mobileHeaderCloseButtonEl);
mobileHeaderCloseButtonEl.addEventListener('click', closeMobileMenu);
headerMenuButtonEl.addEventListener('click', openBurgerBtn);


console.log(window.location.pathname);
// объект соответствия между путями URL и соответствующими обработчиками
const routes = {
    '/': homeHandler,
    '/about': aboutHandler,
    '/contact': contactHandler,
  };
  
  // функция, которая будет обрабатывать изменения адресной строки
  const router = () => {
    // получаем текущий путь URL
    const path = window.location.pathname;
    
    // получаем соответствующий обработчик для текущего пути URL
    const handler = routes[path];
    
    // если обработчик найден, вызываем его
    if (handler) {
      handler();
    }
  };
  
  // функции-обработчики для каждой страницы
  function homeHandler() {

  }
  
  function aboutHandler() {
    // код для отображения страницы "О нас"
    sectionServiseEl.style.display = "none";
    sectionСomparisonEl.style.display = "none";
    sectionHeroEl.style.display = "none";
    sectionContactEl.style.display = 'block';
    
    contactScrolBtnEl.addEventListener('click', function() {
      document.querySelector('.footer').scrollIntoView({behavior: 'smooth'});
    })
  
    sectionExperienceEl.insertAdjacentHTML("beforeend", markup);

  }
  
  function contactHandler() {
    // код для отображения страницы "Контакты"
  }
  
  // вызываем функцию роутинга для первоначальной загрузки страницы
  router();
  
  // обработчик события изменения адресной строки
  window.addEventListener('popstate', router);
  
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);
    async function formSend(event) {
      event.preventDefault();
      let error = formValidate(form);

       let formData = new FormData(form);
 

      if (error === 0 ) {
        console.log(formData);
        document.querySelector(".backLinkLocate").style.display = "block";
        let response = await fetch('sendmail.php', {
          method: 'POST',
          body: formData
        })
        if(response.ok) {
          let result = await response.json();
          alert(result.message);
          form.reset();
        } else {
          alert("Ошибка");
        }
      } else {
        alert('Заполните обязательные поля');
        console.log(error)
      }
    }
      function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('.req');
        for(let i = 0; i < formReq.length; i += 1) {
          const input = formReq[i];
          formRemoveError(input);

          if(input.classList.contains('formEmail')) {
          if(validateEmail(input)) {
            formAddError(input);
            error += 1;
          }  else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
            formAddError(input);
            error += 1;
          } else {
            if (input.value === '') {
              formAddError(input);
              error += 1;
            }
          }        
          }
         if(input.classList.contains('formTelephone')) {
          if(ValidatePhone(input)) {
            formAddError(input);
            error += 1;
          } else if (checkNumberInput(input.value)){
            formAddError(input);
            error += 1;
            } else {
              if (input.value === '' && input.value.length === 10) {
                formAddError(input);
                error += 1;
            }
          }
         }
     
        }
        return error; 
      }
      function formAddError(input) {
        input.parentElement.classList.add('error');
        input.classList.add('error');
      }
      function formRemoveError(input) {
        input.parentElement.classList.remove('error');
        input.classList.remove('error');
      }
      function validateEmail(value) {
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;  
        return EMAIL_REGEXP.test(value);
      }
      function ValidatePhone(value) {    
         const regExpr = /^[\d\+][\d\(\)\ -]{4,14}\d$/;         
         return   regExpr.test(value);
      }
      function checkNumberInput(inputString) {
        const regex = /\D/; // создаем регулярное выражение для проверки наличия НЕцифр
        return regex.test(inputString); // возвращаем true, если в строке только цифры, иначе - false
      }
  })

  