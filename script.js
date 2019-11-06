;(function (){
  let searchField = document.getElementById('find-str');
  if(!searchField) return;

  let searchString = "";

  function prepareSearchElements(){
    let input = document.createElement('input');
    let button = document.createElement('button');
    let form = document.createElement('form');
    let body = document.getElementsByTagName('body');

    input.placeholder = 'Введите слово';
    button.innerHTML = 'Найти';

    searchField.append(form);
    form.append(input, button);

    form.addEventListener('submit', function(event){
      event.preventDefault();
      clearHightLights();
      searchSubstring(input, body);
    });
  }

  function searchSubstring (input, body){
    searchString = input.value;
    if(!searchString) return;

    parseTextNodes(body);
  }

  function parseTextNodes(node){
    Object.values(node).forEach(element => {
      if(element.tagName){
        parseTextNodes(element.childNodes);
      }else{
        processElement(element);
      }
    });
  }

  function processElement(element){
    if(element.textContent.indexOf(searchString) === -1) return;
    element.before(...insertHightLight(element.textContent, searchString));
    element.remove();
  }

  function insertHightLight (str, search){
    let arrElements = [];
    let span = document.createElement('span');
    span.className = "highlight";
    span.innerHTML = search;
    span.style.background = 'orange';

    str.split(search).forEach((element) => {
      if(element !== "")
        arrElements.push(document.createTextNode(element));
      arrElements.push(span.cloneNode(true));
    });
    arrElements.length--;

    return arrElements;
  }

  function clearHightLights (){
    let hightLights = document.getElementsByClassName('highlight');

    Object.values(hightLights).forEach((element) => {
      let previous = element.previousSibling;
      let next = element.nextSibling;
      let newStr = "";

      if(!previous.tagName)
        newStr += previous.textContent;
      newStr += element.innerText;
      if(!next.tagName)
        newStr += next.textContent;

      element.before(newStr);
      previous.remove();
      element.remove();
      next.remove();
    });
  }

  window.onload = function (){
    prepareSearchElements();
  };
}());
