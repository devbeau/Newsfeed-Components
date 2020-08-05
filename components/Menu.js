// This is the data we will be using, study it but don't change anything, yet.
import { gsap } from 'gsap';

let menuItems = [
  'Students',
  'Faculty',
  "What's New",
  'Tech Trends',
  'Music',
  'Log Out'
];
  // Step 1: Write a component called 'menuMaker' to create a menu like the markup below:

  // <div class="menu">
  //   <ul>
  //     {each menu item as an <li>}
  //   </ul>
  // </div>

  function menuMaker(menuArr){
    // createNewElement function takes element, className, and textcontent
    // and uses optional parameters to assign them to the element
    function createNewElement(htmlElement, className = 0, textContent = 0){
      className = className || 0;
      textContent = textContent || 0;
      let newElement = document.createElement(htmlElement);
      // Ternary conditions handle optional parameters
      className !== 0 ? newElement.classList.add(className) : newElement;
      textContent !== 0 ? newElement.textContent = textContent : textContent = null;
      return newElement;
    }

    // instantiates our html elements
    let menu = createNewElement('div', 'menu');
    let listContainer = createNewElement('ul', 0 , 0);
    let listArr = menuArr.map((item) => { // loop over array
      return createNewElement('li',0, item); // for li items
    });

    console.log("menuMaker -> menu", menu)
    console.log("menuMaker -> listContainer", listContainer)
    console.log("menuMaker -> listArr", listArr)
    
    // append children to menu
    menu.appendChild(listContainer);
    listArr.forEach(item => listContainer.appendChild(item));

    // add event listener to menu button
    // slide in and out animation for menu
    let menuBtn = document.querySelector('.menu-button');
    menuBtn.addEventListener('click', (event) => {
      if (menu.style.width === '0px'){ // checks if menu is closed
        gsap.to(menu, {             //  gsap slide-out animation
          duration: 0.25,           //
          width: '350px',           //
          ease: "Power2.out",       //
        })
   
      } else{
        gsap.to(menu, {             //  gsap slide-out animation
          duration: 0.2,           //
          width: '0',           //
          ease: "Power2.in",       //
        
      })}
      menu.classList.toggle('menu--open');
      console.log("menuMaker  -> event", event);
      event.stopPropagation();
     });
    
    console.log("Menu just before return", menu)
    return menu;
  }

  let header = document.querySelector('.header');
  const newMenu = menuMaker(menuItems);
  header.appendChild(newMenu);
  
  console.log("newMenu", newMenu);

  let menuBtn = document.querySelector('.menu-button');
  let menu = document.querySelector('.menu');
  // click anywhere but the menu to close the menu
  document.addEventListener('click', (event) => {
    if (!(menu.contains(event.target)) || event.target.contains(menuBtn)){
    gsap.to(menu, {             //  gsap slide-in animation
      duration: 0.2,           //
      width: '0',           //
      ease: "Power2.in",       //
      
    })}
    menu.classList.toggle('menu--open');
    console.log("menuMaker  -> event", event);
    event.stopPropagation();
  });




  // The 'menuMaker' takes an array of menu items as its only argument.

  // Step 2: Inside the function, iterate over the array creating a list item <li> element for each item in the array.
  // Add those items to the <ul>

  // Step 3: Still inside your function, select from the DOM the menu button (the element with a class of 'menu-button').

  // Step 4: Add a click event listener to the menu button. When clicked it should toggle the class 'menu--open' on div.menu (your div with a 'menu' class).

  // Step 5: Don't forget to return your div.menu.

  // Step 6: Use 'menuMaker' to create a menu using the 'menuItems' array, and append the returned menu to the header.

