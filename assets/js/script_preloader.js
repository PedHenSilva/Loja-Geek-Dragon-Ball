let elem_preloader = document.getElementById("preloader");
let elem_loader = document.getElementById("loader");
console.log("Testando... Ok");


setTimeout(function() {
  elem_preloader.classList.remove("preloader");
  elem_loader.classList.remove("loader");

  }, 1250);
