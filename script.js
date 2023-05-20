let upload_image = document.querySelector(".upload_image");
let selectedImage = document.querySelector("#selectedImage");
let choose_image = document.querySelector(".choose_image");

let image_holder = document.querySelector(".image_holder");
let image = document.querySelector("#image");

let slider = document.querySelectorAll(".slider");
let show_value = document.querySelectorAll(".show_value");

let list_features = document.querySelectorAll("ul li");

let features = document.querySelector(".features");
let fbutton = document.querySelectorAll(".fbutton");

let clearAll = document.querySelector("#clearAll");
let remove_image = document.querySelector("#remove_image");

let canvas = document.querySelector("#image_canvas");
const context = canvas.getContext("2d");

let File_Name;
let Edited = false;

/*handle choose image event*/
upload_image.addEventListener("click", function () {
  selectedImage.click();
});

/*choose image event*/
selectedImage.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();
    File_Name = file.name;

    choose_image.style.display = "none";
    image_holder.style.display = "block";

    reader.addEventListener("load", function () {
      image.setAttribute("src", this.result);
    });

    reader.readAsDataURL(file);
    remove_image.style.display = "block";
  }

  if (Edited == false) {
    Edited = true;
  }
});

/*function call when slider value change*/
for (let i = 0; i <= slider.length - 1; i++) {
  slider[i].addEventListener("input", editImage);
}

function editImage() {
  let bright = document.querySelector("#brightness");
  let cont = document.querySelector("#contrast");
  let blur = document.querySelector("#blur");
  let grey = document.querySelector("#greyScale");
  let hue = document.querySelector("#hue");
  let saturation = document.querySelector("#saturation");
  let invert = document.querySelector("#invert");
  let opacity = document.querySelector("#opacity");
  let sepia = document.querySelector("#sepia");

  let brightValShow = document.querySelector("#brightVal");
  let contValShow = document.querySelector("#contVal");
  let blurValShow = document.querySelector("#blurVal");
  let greyValShow = document.querySelector("#greyVal");
  let hueValShow = document.querySelector("#hueVal");
  let saturationValShow = document.querySelector("#saturationVal");
  let invertValShow = document.querySelector("#invertVal");
  let opacityValShow = document.querySelector("#opacityVal");
  let sepiaValShow = document.querySelector("#sepiaVal");

  let brightVal = bright.value;
  let contVal = cont.value;
  let greyVal = grey.value;
  let blurVal = blur.value;
  let hueVal = hue.value;
  let satuVal = saturation.value;
  let invertVal = invert.value;
  let opacityVal = opacity.value;
  let sepiaVal = sepia.value;

  brightValShow.innerHTML = brightVal;
  contValShow.innerHTML = contVal;
  blurValShow.innerHTML = blurVal;
  greyValShow.innerHTML = greyVal;
  hueValShow.innerHTML = hueVal;
  saturationValShow.innerHTML = satuVal;
  invertValShow.innerHTML = invertVal;
  opacityValShow.innerHTML = opacityVal;
  sepiaValShow.innerHTML = sepiaVal;

  image.style.filter =
    "grayscale(" +
    greyVal +
    "%) hue-rotate(" +
    hueVal +
    "deg) brightness(" +
    brightVal +
    "%) blur(" +
    blurVal +
    "px) saturate(" +
    satuVal +
    ") contrast(" +
    contVal +
    "%) invert(" +
    invertVal +
    "%) sepia(" +
    sepiaVal +
    "%) opacity(" +
    opacityVal +
    "%)";
  context.filter =
    "grayscale(" +
    greyVal +
    "%) hue-rotate(" +
    hueVal +
    "deg) brightness(" +
    brightVal +
    "%) blur(" +
    blurVal +
    "px) saturate(" +
    satuVal +
    ") contrast(" +
    contVal +
    "%) invert(" +
    invertVal +
    "%) sepia(" +
    sepiaVal +
    "%) opacity(" +
    opacityVal +
    "%)";

  clearAll.style.transform = "translateY(0px)";
}

/*button's response when clicked*/
list_features.forEach((list_fbutton, index) => {
  list_fbutton.addEventListener("click", function () {
    if (image.getAttribute("src") == "") {
      alert("Please Upload Your Image");
    } else {
      features.style.transform = "translateY(310px)";
      download.style.transform = "translateY(270px)";

      if (Edited == true) {
        canvas.height = image.naturalHeight;
        canvas.width = image.naturalWidth;

        for (let i = 0; i <= 8; i++) {
          if (index != i) {
            list_features[i].classList.remove("active_fbutton");
            fbutton[i].classList.remove("active_controller");
          } else {
            this.classList.add("active_fbutton");
            fbutton[i].classList.add("active_controller");
          }
        }
      } else {
        alert("Edit Your Image First");
      }
    }
  });
});

/*download image btn click*/
function Download_btn() {
  image.getAttribute("src") != "";
  if (Edited == true) {
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    var jpegUrl = canvas.toDataURL("image/jpg");

    const link = document.createElement("a");
    document.body.appendChild(link);

    link.setAttribute("href", jpegUrl);
    link.setAttribute("download", File_Name);
    link.click();
    document.body.removeChild(link);
  }
}

/*clear or reset range value*/
clearAll.addEventListener("click", function () {
  clearAllRangeValue();
});

function clearAllRangeValue() {
  image.style.filter = "none";
  context.filter = "none";

  for (let i = 0; i <= slider.length - 1; i++) {
    if (i == 0) {
      slider[i].value = "100";
    } else if (i == 1) {
      slider[i].value = "100";
    } else if (i == 2) {
      slider[i].value = "100";
    } else {
      slider[i].value = "0";
    }
  }
  /* reset button go down after click*/
  editImage();
  clearAll.style.transform = "translateY(150px)";
}

/*remove image btn click*/
remove_image.addEventListener("click", function () {
  image.src = "";
  this.style.display = "none";
  choose_image.style.display = "block";
  image_holder.style.display = "none";
  features.style.transform = "translateY(400px)";
  download.style.transform = "translateY(350px)";
  clearAllRangeValue();
});
