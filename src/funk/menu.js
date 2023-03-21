const baseHeaderContainer = document.querySelector(".base-header-container");
const mobileMenu = document.querySelector(".modalHeaderContainer");

const openBurgerBtn = () => {
    mobileMenu.classList.toggle("is-active");
  }
  
  const closeMobileMenu = () => {
    mobileMenu.classList.toggle("is-active");
  }
const openBurgerBt1n = (event) => {
    event.preventDefault();
    mobileMenu.classList.add("is-active"); 
    let yOffset = window.pageYOffset;
    console.log(yOffset);
    if (yOffset > 30) {
        window.scrollBy(
            {top: -yOffset}
        );
        mobileMenu.style.transform = "translateY(0%)";
    } else {
        mobileMenu.style.transform = "translateY(0%)";
    }
}
export {closeMobileMenu, openBurgerBtn};