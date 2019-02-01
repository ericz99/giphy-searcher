/**
 *
 *  GIPHY-SEARCHER
 *
 *  What it does: Allow user to search gifs & stickers
 *
 *  TODO: MAKE LOADING STATE WHEN FETCHING IMAGES
 *  TODO: IF REQUEST LIMIT EXCEED => ALERT USER WITH AN MESSAGE
 *
 */

// predefined vars
const API_KEY = "mOALXCqjcvItEYM5NLEYjJNvw1GuwRGL"; // <======= INSERT YOUR API_KEY FROM YOUR https://developers.giphy.com/dashboard/
const BASE_URL = "//api.giphy.com/v1/gifs";
const SEARCH_ENDPOINT = "search";
const LIMIT = "1";
const RATING = "G";
const LANG = "en";

// dom
const queryElem = document.querySelector(".query");
const resultElem = document.querySelector(".flex-container");
const btnGroup = document.querySelector(".btnGroup");
const nextElem = document.querySelector("#nextBtn");
const saveElem = document.querySelector("#saveBtn");
const galleryBtnElem = document.querySelector("#gallery");
const searchBtnElem = document.querySelector("#search");
const galleryElem = document.querySelector(".gallery");
const mainContentElem = document.querySelector("#main-content");

let storage;
let uniq;

const giphyAPI = {
  offset: 0,
  search: function() {
    return new Promise((resolve, reject) => {
      fetch(
        `https:${BASE_URL}/${SEARCH_ENDPOINT}?api_key=${API_KEY}&q=${
          queryElem.value
        }&limit=${LIMIT}&offset=${this.offset}&rating=${RATING}&lang=${LANG}`
      )
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
};

queryElem.addEventListener("keyup", e => {
  e.preventDefault();
  if (e.keyCode === 13) {
    giphyAPI
      .search()
      .then(res => {
        const data = res.data[0].images.fixed_height.url;

        console.log(res);

        // display picture now
        resultElem.innerHTML = `<div><img src=${data} alt="giphyapi" /></div>`;
      })
      .catch(err => {
        console.log(err);
      });
  }
});

nextElem.addEventListener("click", e => {
  e.preventDefault();
  if (e.target && resultElem.childNodes.length !== 0) {
    // change offset value everytime we click next

    giphyAPI.offset = Math.floor(Math.random() * 25);

    // make another request
    giphyAPI
      .search()
      .then(res => {
        const data = res.data[0].images.fixed_height.url;

        // display picture now
        resultElem.innerHTML = `<div><img src=${data} alt="giphyapi" /></div>`;
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    window.alert("no image please search for an image");
  }
});

saveElem.addEventListener("click", e => {
  e.preventDefault();

  const image =
    resultElem.childNodes.length !== 0
      ? resultElem.childNodes[0].firstChild.getAttribute("src")
      : null;

  if (e.target && image !== null) {
    // check if local storage images key it not null
    if (localStorage.getItem("images") === null) {
      storage = [];
    } else {
      storage = JSON.parse(localStorage.getItem("images"));
    }

    // push image in storage
    storage.push(image);
    // store only unique items
    uniq = [...new Set(storage)];
    // then set it into localstorage
    localStorage.setItem("images", JSON.stringify(uniq));

    window.alert("stored image");
  } else {
    window.alert("no image, please search for an image");
  }
});

galleryBtnElem.addEventListener("click", e => {
  e.preventDefault();

  if (e.target) {
    // set this nav active
    galleryBtnElem.classList.add("active");
    // unset this the other nav to nothing
    searchBtnElem.classList.remove("active");
    // display none on the main-content
    mainContentElem.style.display = "none";
    // set gallery container = block;
    galleryElem.style.display = "flex";

    if (localStorage.getItem("images") === null) {
      storage = [];
    } else {
      storage = JSON.parse(localStorage.getItem("images"));
    }

    let output;

    storage.forEach(image => {
      output += `<div>
        <img src=${image} alt="blank_image" />
      </div>`;
    });

    galleryElem.innerHTML = output;
  }
});

searchBtnElem.addEventListener("click", e => {
  e.preventDefault();

  if (e.target) {
    // set this nav active
    galleryBtnElem.classList.remove("active");
    // unset this the other nav to nothing
    searchBtnElem.classList.add("active");
    // display block on the main-content
    mainContentElem.style.display = "block";
    // set gallery container = none;
    galleryElem.style.display = "none";
  }
});
