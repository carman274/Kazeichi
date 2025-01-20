// Author : Kitt-N 
// Kazeichi have license for publish
// Tab Script
function showTab(tabId) {
  document.querySelectorAll("div[id]").forEach((tab) => {
    tab.classList.add("hidden");
  });
  document.getElementById(tabId).classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  showTab("Profile");
});

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (e) => {
    const targetTab = e.target.getAttribute("data-tab");
    if (targetTab) {
      showTab(targetTab);
    }
  });
});

function changeActiveTab(activeButton) {
  const buttons = document.querySelectorAll("button[data-tab]");
  buttons.forEach((button) => {
    button.classList.remove("bg-[#B29784]");
  });
  activeButton.classList.add("bg-[#B29784]");
}

const thumbnails = Array.from(document.querySelectorAll("#thumbnail-list img"));
const mainImage = document.getElementById("General-Gallery");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const thumbnailList = document.getElementById("thumbnail-list");

let activeIndex = 2; // Starting at the 3rd image
let offset = 0; // Control scrolling

const THUMBNAIL_WIDTH = 88; // Width of each thumbnail including spacing
const MAX_VISIBLE_THUMBNAILS = 5;

// Function to update the main image
function updateMainImage(index) {
  mainImage.src = thumbnails[index].src;
  thumbnails.forEach((thumbnail, i) => {
    thumbnail.classList.toggle("brown", i === index);  // Adds "brown" class if i === index
  });
}
// Function to scroll the thumbnail list
function scrollThumbnails(direction) {
  const totalThumbnails = thumbnails.length;
  offset += direction;

  if (offset < 0) offset = totalThumbnails - MAX_VISIBLE_THUMBNAILS;
  if (offset > totalThumbnails - MAX_VISIBLE_THUMBNAILS) offset = 0;

  const translateX = -offset * THUMBNAIL_WIDTH;
  thumbnailList.style.transform = `translateX(${translateX}px)`;
}

// Click event for previous button
prevButton.addEventListener("click", () => {
  activeIndex = (activeIndex - 1 + thumbnails.length) % thumbnails.length;
  scrollThumbnails(-1);
  updateMainImage(activeIndex);
});

// Click event for next button
nextButton.addEventListener("click", () => {
  activeIndex = (activeIndex + 1) % thumbnails.length;
  scrollThumbnails(1);
  updateMainImage(activeIndex);
});

// Click event for thumbnail images
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    activeIndex = index;
    updateMainImage(activeIndex);
  });
});

// Initial setup
updateMainImage(activeIndex);

// Author : Kitt-N 