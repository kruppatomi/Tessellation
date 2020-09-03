var dwButton =  document.querySelector(".download-button")
  dwButton.addEventListener("click", function(){
    document.querySelector(".modal-bg").classList.add("bg-activate");
  })

var closeButton = document.querySelector(".modal-close");
    closeButton.addEventListener("click", function(){
        document.querySelector(".modal-bg").classList.remove("bg-activate");
    });