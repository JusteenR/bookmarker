// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);//build output, appending
// Listen to which option is picked to display the bookmarks
document.getElementById('date').addEventListener('click', check);
document.getElementById('date2').addEventListener('click', check2);
document.getElementById('ascending').addEventListener('click', check3);
document.getElementById('descending').addEventListener('click', check4);


// Global variable, determines the type of sorting
var option = 0;


// Organize bookmarks with the most recently added at the top
function check(){
  option = 1;
  fetchBookmarks();
}

// Organize bookmarks with the least recently added at the top
function check2(){
  option = 2;
  fetchBookmarks();
}

// Organize bookmarks in alphabetical order
function check3(){
  option = 3;
  fetchBookmarks();
}

// Organize bookmarks in reverse alphabetical order
function check4(){
  option = 4;
  fetchBookmarks();
}

// Save Bookmark
function saveBookmark(e){
  // Get form values
  var siteName =document.getElementById('siteName').value;
  var siteUrl =document.getElementById('siteUrl').value;
  var d = new Date();

  if (!validate(siteName, siteUrl) || !duplicates(siteName, siteUrl)){
    //Clear form
    document.getElementById("myForm").reset();
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl,
    time: d
  }

  /*
    // Local Storage Test
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
  */

  // Test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null){
    // Init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById('myForm').reset();

  // Re-fetch bookmarks
  fetchBookmarks();

  // Prevent form from submitting
  e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through the bookmarks
  for(var i =0;i < bookmarks.length;i++){
    if(bookmarks[i].url == url){
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks(){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // Organizes the bookmarks
  switch(option){
    case 1:
      document.getElementById("date").addEventListener("click", sortByDate1(bookmarks));
      break;
    case 2:
      document.getElementById("date2").addEventListener("click", sortByDate1(bookmarks));
      bookmarks.reverse();
      break;
    case 3:
      document.getElementById("ascending").addEventListener("click", sortByName(bookmarks));
      break;
    case 4:
      document.getElementById("descending").addEventListener("click", sortByName(bookmarks));
      bookmarks.reverse();
      break;
  }

  // Get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  // Build output
  bookmarksResults.innerHTML = '';
  // Loop through local storage and output each bookmark entry
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    //build output, appending
    bookmarksResults.innerHTML += '<div class="card mt-3 p-3" id="output">' + '<h3>' + name.toUpperCase() + '\xa0\xa0'
    //Build link buttons
    + '<span>  <a class="btn btn-warning" target="_blank" href="'+url+'">Visit</a> '
    + '  <a class="btn btn-danger" href="#" onclick="deleteBookmark(\''+url+'\')">Delete</a> </span>'
    + '</h3>' + '</div>' + '</div>';
  }
}

// Validate Form
function validate(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}

function duplicates(siteName, siteUrl) {
  // Get from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //Loop through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (siteUrl == bookmarks[i].url) {
      alert('URL Already Exists');
      return false;
    }
    else if (bookmarks[i].name == siteName){
      alert('Website Name Already Exists');
      return false;
    }
  }
  return true;
}﻿



// QuickSort
function sortByDate1(bookmarks1){
  if (localStorage.getItem('bookmarks') === null){
    return;
  }
  var bookmarks2 = [];
  for (var i = 0; i < bookmarks1.length; i++ ){
    bookmarks2.push(bookmarks1[i].time);
  }
  // sortByDate(bookmarks1, bookmarks2, 0, bookmarks1.length - 1);
  return quickSort(bookmarks1, bookmarks2, 0, bookmarks1.length - 1);
}

//Compares the dates
function compareDate(a, b){
  if (a > b) {
    return 1;
  }
  else if (a < b){
    return -1;
  }
  return 0;
}


function quickSort(arr, arr2, left, right){
   var len = arr.length,
   pivot,
   partitionIndex;


  if(left < right){
    pivot = right;
    partitionIndex = partition(arr, arr2, pivot, left, right);

   //sort left and right
   quickSort(arr, arr2, left, partitionIndex - 1);
   quickSort(arr, arr2, partitionIndex + 1, right);
  }

  return arr2;
}

function partition(arr, arr2, pivot, left, right){
   var pivotValue = arr2[pivot],
       partitionIndex = left;

   for(var i = left; i < right; i++){
    if(arr2[i] > pivotValue){
      exch(arr2, i, partitionIndex);
      exch(arr, i, partitionIndex);
      partitionIndex++;
    }
  }
  // Sort both arrays
  exch(arr, right, partitionIndex);
  exch(arr2, right, partitionIndex);
  return partitionIndex;
}


// exchange a[i] and a[j]
function exch(bookmarks, i, j) {
    var swap = bookmarks[i];
    bookmarks[i] = bookmarks[j];
    bookmarks[j] = swap;
  }

//Sort by name
function sortByName(bookmarks){
  bookmarks.sort(compareName);
}

//Compare Names
function compareName(a, b){
  if (a.name.toUpperCase() < b.name.toUpperCase()){
    return -1;
  }
  else if (b.name.toUpperCase() < a.name.toUpperCase()){
    return 1;
  }
  else {
    return 0;
  }
}
