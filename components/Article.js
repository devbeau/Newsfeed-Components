import { gsap } from 'gsap';
import { dataFunc } from '../modules/articledata';
let data = dataFunc(); // gets data from dataFunc

  // Step 1: Write a component called 'articleMaker' to create an article.
  // Your component is a function that takes an article object as its only argument,
  // and returns a DOM node looking like the one below:
    
    // createNewElement function takes element, className, and textcontent
    // and uses optional parameters to assign them to the element
    function createNewElement(htmlElement, className = 0, textContent = 0){
      className = className || 0;
      textContent = textContent || 0;
      let newElement = document.createElement(htmlElement);
      //ternary conditions for optional parameters
      className !== 0 ? newElement.classList.add(className) : newElement;//useless statement
      textContent !== 0 ? newElement.textContent = textContent : textContent = null;
      return newElement;
    }

    // creates new elements and assigns them className and text-content
    function instantiateElements(articleObj){
      let article = createNewElement('div', 'article');
      let header = createNewElement('h2', 0 ,articleObj.title);
      let date = createNewElement('p', "date", articleObj.date);
      let pgraphOne = createNewElement('p', 0, articleObj.firstParagraph);
      let pgraphTwo = createNewElement('p', 0, articleObj.secondParagraph);
      let pgraphThree = createNewElement('p', 0, articleObj.thirdParagraph);
      let expandBtn = createNewElement('span', 'expandButton', 'Click to Open');
      let readBtn = createNewElement('span', 'readButton', 'Mark as Read');
      return [article, header, date, pgraphOne, pgraphTwo, pgraphThree, expandBtn, readBtn];
    }
    
    // creates the dom structure of the component
    function structureChildren (parent, elementsArray){
      parent.appendChild(elementsArray[1]);
      parent.appendChild(elementsArray[2]);
      parent.appendChild(elementsArray[3]);
      parent.appendChild(elementsArray[4]);
      parent.appendChild(elementsArray[5]);
      parent.appendChild(elementsArray[6]);
      parent.appendChild(elementsArray[7]);
      return parent;
    }

    //open and close articles animations
    function openArticle(parentArticle){
    gsap.to(parentArticle, {
      duration: 0.25,
      height: "auto",
    })
    }
    function closeArticle(parentArticle){
      gsap.to(parentArticle, {
        duration: 0.25,
        height: "50px",
      })
    }
      
    // add open and close functionality to the expand button
    function addBtnToggle(expandBtn){
      expandBtn.addEventListener('click', (event) => {
        let parNode = event.target.parentNode;
        console.log("Expand Button, parent Node", expandBtn.parentNode);
        
        if  (parNode.classList.contains('article-open')){
          closeArticle(parNode);
          expandBtn.textContent = 'Click to Open';
        } 
        else {
          openArticle(parNode);
          expandBtn.textContent = 'Click to Close';
        }
        parNode.classList.toggle('article-open');
        console.log("expandBtn -> event", event);
      });
      }

    // removes articles after clicking the read button
    function addBtnRead(readBtn){
      readBtn.addEventListener('click', (event) => {
        let parNode = event.target.parentNode;
        console.log(parNode);
        parNode.remove();
        console.log("readBtn -> event", event);
      });
    }


    function articleMaker(articleObj){
    
      let elementsArray = instantiateElements(articleObj); //array for structuring
      let [article, header, date, pgraphOne, // Variable
          pgraphTwo, pgraphThree, expandBtn, // Declaration
          readBtn] = elementsArray;  // Deconstruction for other
                                     // functions
      
      // sanity logs
      console.log("articleMaker -> article", article);
      console.log("articleMaker -> header", header);
      console.log("articleMaker -> date", date);
      console.log("articleMaker -> pgraphOne", pgraphOne);
      console.log("articleMaker -> pgraphTwo", pgraphTwo);
      console.log("articleMaker -> pgraphThree", pgraphThree);
      console.log("articleMaker -> expandBtn", expandBtn);
      console.log("articleMaker -> readBtn", readBtn);
     
      structureChildren(article, elementsArray);  // appends the elements into the structure
      addBtnToggle(expandBtn);  // toggle the article with a click
      addBtnRead(readBtn); // delete articles once read

      console.log("Article just before return", article);
      return article; //returns parent div for appending to html
    }

    //Attaches article to end of articles container
    function appendArticleToPage(article){
      let container = document.querySelector('.articles');
      const newArticle = articleMaker(article);
      container.appendChild(newArticle);
    }

    // data.forEach((article) =>{
    //   appendArticleToPage(article);
    // });

    // will create and append an article with only the article data
    function constructArticle(articleData){
      if (!Array.isArray(articleData)){
        appendArticleToPage(articleData);
      }
      else {
        articleData.forEach((article)=>{
        appendArticleToPage(article);
        });
      }
    }

    function createNewInput(htmlElement, name = 0, type = 0){
      name = name || 0;
      type = type || 0;
      let newElement = document.createElement(htmlElement);
      //ternary conditions for optional parameters
      name !== 0 ? newElement.setAttribute('name', name) : newElement;//useless statement
      type !== 0 ? newElement.setAttribute('type', type) : newElement.setAttribute('type', null);
      return newElement;
    }

    function makeForm(){
      let form = createNewElement('form','article-form');
      let inputTitle = createNewInput('input','title','text');
      let inputDate = createNewInput('input','date','text');
      let inputParaOne = createNewInput('input','p1','text');
      let inputParaTwo = createNewInput('input','p2','text');
      let inputParaThree = createNewInput('input','p3','text');
      let button = createNewElement('button', 'form-button', 'text');

      form.appendChild(inputTitle);
      form.appendChild(inputDate);
      form.appendChild(inputParaOne);
      form.appendChild(inputParaTwo);
      form.appendChild(inputParaThree);
      form.appendChild(button);
      
      form.style.display = 'flex';
      form.style.width = '50%';
      form.style.flexDirection = 'column';
      form.style.alignItems = 'center';
      form.id = 'articleForm';
      let container = document.querySelector('.articles');

      button.addEventListener('click', (event) =>{
        let article = fromForm();
        console.log("article!!!", article);
        constructArticle(article);
        event.preventDefault();
      });


      container.appendChild(form);
    }
   
    function fromForm(){
      let form = document.forms.articleForm;
      console.log(form.elements);
      let articleObj = {
        title: `${form.elements[0].value}`,
        date:    `${form.elements[1].value}`,
        firstParagraph: `${form.elements[2].value}`,
        secondParagraph: `${form.elements[3].value}`,
        thirdParagraph: `${form.elements[4].value}`,
      }
      console.log("!!!", articleObj)
      return articleObj
    }

    constructArticle(data); // execute component construction
    makeForm();