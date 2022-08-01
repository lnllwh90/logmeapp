
let resultsBox = $('#results-box')
let resultsCard = document.getElementsByClassName($('.results-card'))
let noVis = document.getElementsByClassName($('.not-visible'))
let mealNameSearch = $('#search-form');
const delay_by_in_ms = 600
let scheduled_function = false
const endpoint1 = '/search'

console.log(mealNameSearch)

/* timeout for AJAX request */
let delayTimer;
/* Tag elements in the tag container */
let tags;
/* Food ID returned from Food API */
let foodId;
/* Custom food ID for manual entries */
let randomAlphaNumeric = () => {
  /* To string - base 32 - hexadecimal 0-9;a-v */ 
  return Math.random().toString(32).slice(2) 
}

/* Search term for the food API */

$('#search-term').keyup(function(){
  
  clearTimeout(delayTimer);
  /* Text to display when searching for results */
  $('#results-box').text('Loading search results')
  
delayTimer = setTimeout(function() {
  let customFoodId = randomAlphaNumeric()

  let text = $('#search-term').val()
  let pic = new Image();
  pic.src = '/static/img/no-image-icon-23494.png'
  let food_image = document.createElement('img').appendChild(pic)
  food_image.setAttribute('id', 'food-img')

  /* passes user input to Django to query the api */
   return $.ajax({
    url: '/search',
    data: {
      'search_term': text,
    },
    dataType: 'json',
    
    /* Uses the text supplied by user input to parse the API. 
    On success the response will return a list from the food api as a table*/

      success: function(data) {
        console.log(data)
        let results = '';

        /* Term entered by the user to appear at the top of the results table to allow for manual entries.*/
        
        results += 
        `
        <div class = "container" id='searchResults'> 
          <div class='table'>
          <table>
            <tr class="results">
              <td colspan="6" data-food-id="foodCustom_${text}1" data-food-label="${text}" data-custom='1'> ${text}
              </td>
              <td>
                <div class="toggle-container">
                  <div class='toggle-btn row'>
                    <div class='inner-circle'>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          
          </table>
        <div>
        <div class="instant-results">
          <table id='searchTable'>
          
        `
        /* Returns the results from the food API as a table. */

        data['hints'].forEach(function(meal){
          console.log(meal['food']['label'])
          console.log(meal['food']['foodId'])
          
          results += 
          `
          
          <tr class='instant-results'>
            <th id='brand-name' class='' colspan="1"> Brand: ${meal['food']['brand']}
            </th>
            <th colspan="2"> Brand: ${meal['food']['category']}
            </th>
          </tr>
          <tr class='results'>
            <td>
              <img id='food-img' class='mr-3' src="${meal['food']['image']}" onerror="this.onerror=null;this.src='/static/img/no-image-icon-23494.png';">
            </td>
            <td class ='' id='nmp' data-food-id='${meal['food']['foodId']}' data-food-label="${meal['food']['label']}" data-custom='0'> 
            ${meal['food']['label']}
            </td>
            <td>
            <div class="toggle-container">
              <div class='toggle-btn row'>
              
                <div class='inner-circle'>
                </div>
              </div>
              </div>
            </td>
          </tr>
        `
        });
          results +=
          `
          </table>
          </div>
          </div>
          </div>
          </div>
          `
        /* Appends the table to the results-box element */
        $('#results-box').html(results);
        
        /* When clicking the inner-circle element, button will toggle horizontally indicating whether a tag was created for the foodLabel or not.*/
        $('.inner-circle').on('click', function(e){
          
          /* e returns the inner-circle element*/

          /* variable to reference the results returned from table holding the results returned from the API, foodID, FoodLabel, etc... */

          let food = e.target.parentNode.parentNode.parentNode.previousElementSibling

          /* Variables to get the attributes from the parent node */
          let foodLabel = food.getAttribute('data-food-label')
          foodId = food.getAttribute('data-food-id')
          let customEntry = food.getAttribute('data-custom')
          tags = document.querySelectorAll('#mealTag')
          console.log(tags)

          let tagElement =''
          
          /* on click add the class 'active' to the parent div of inner-circle to signal the css*/
          e.target.parentNode.classList.toggle('active')
          
          /* If the parent div of the inner-cirlce contains 'active', create a tag using the foodLabel  */
         if (e.target.parentNode.classList.contains('active')){
              // div for the tag<div class="tag"></div>
               tagElement += `<div id = "mealTag" data-food-id="${foodId}" data-food-label="${foodLabel}" data-custom="${customEntry}"> ${foodLabel} <i class="material-icons" id="close-icon" data-item="js">close</i></div>`
              /* Append the tag created inside of the tag-container div */

              $('.tag-container').append(tagElement)
             
          }
          /* If the parent of the inner-circle does not contain 'active' or is deactivated (toggled off), if the tag is in the tag-container div, remove tag. */
          else if (!e.target.parentNode.classList.contains('active')){
            // console.log(tags)
            let tag = document.getElementById('mealTag')
            
            /* reference to each element in the tag-container div */
            for(let i=0; mealElement=tags[i]; i++){
              
              
              /* Variable to get the foodId from the mealTag element */
              let mealTagFoodId = mealElement.getAttribute('data-food-id')   
              console.log(mealTagFoodId)

              /* If the foodId from the mealTag div is === to the foodId from the element in the table of results, remove tag.*/
              if (mealTagFoodId === foodId){
                // console.log(mealElement)
                // console.log(food)
                /* remove tag from tag-container div */
                mealElement.remove(mealElement)
              }
              
            }
          }
          console.log($('.tag-container').children())
          $('.tag-container').on('click', '#close-icon', function(){
            console.log($(this))
            $(this).parent().remove()

          })
          // $('#tagSubmission').on('mousedown', mealFormSubmission = () =>{
          //   forEach()
          // })
        })
        let prepareMealLog;
        $('#tagSubmission').on('mousedown', prepareMealLog = () => {
          // let t = $(this).parent().find('div')
          // console.log(t)

        })
      },
        error: (err) => {
          console.log(err)
      }  
    });
  }, 600);
});

// displays the results from the API
$('#search-term').focus(function () {
  if (!$('#results-box').hasClass('visible') ) {
    $('#results-box').removeClass('not-visible') &&
    $('#results-box').addClass('visible')
  }
});
let calendarIcon = `<i class="far fa-calendar"></i>`
$('#id_date').append(calendarIcon)
 
// {
//   $.ajax({
//     url: '/search',
//     data:{
//       'foodId':$(this).target.getAttribute('data-food-id')
      
//     },
//     method:'POST',
//     dataType: 'json',
//     success: function(data){
//       console.log(foodId)
//     }
//   })
// })


// let logMeal_btn = document.getElementById("logMeal-btn")

// 




// $('.inner-circle').addEventListener("click", addTags)


  // mealTag_label.appendChild(mealTag)

// $('#logMeal-btn').(function(){
//   $(this).element
//   $('#mealTag').append(meaclickl['food']['label']);
// });
// }





// $('#search-term').blur(function(){
//   if ($('#results-box').hasClass('visible')){
//     $('#results-box').removeClass('visible') &&
//     $('#results-box').addClass('not-visible')
//   }
// });



// const mealApi_res = new 
// let foodImg = document.getElementById('food-img')

// console.log(foodImg)
// foodImg.forEach((image) =>{
//   let src = image.getAttribute('src'); 
//   let noImg = new Image();
//   noImg.src = 'static/img/no-image-icon-23494.png'
//   if (src === '') {
      // src = noImg;
      // }
//   });
// const sendMeal_name = (request_parameters) => {
//       $.ajax({
//         url: '/search',
//         data: {
//           'search_term': request_parameters,
//         },
//         dataType: 'json',
//         success: (res)=>{
//           console.log(res)
//         },
//         error: (err) => {
//           console.log(err)
//         }
//       })
//     }

// mealNameSearch.on('keyup', function(){
//   console.log($(this).val())
//   const request_parameters = {
//       search_term: $(this).val()
//   }  
//   if (resultsBox.hasClass('not-visible')){
//     resultsBox.removeClass('not-visible')
//   }
//     sendMeal_name($(this).val())

//     if (scheduled_funciton){
//       clearTimeout(scheduled_function)
//     }

//     scheduled_function = setTimeout(sendMeal_name, delay_by_in_ms, endpoint1, request_parameters)
//   });

// let delayTimer;
// $('#search-form').keyup(function() {
//   console.log($('#search-form').val())
//   $('#results_box').text($('#search-form').val())
//   if (resultsBox.classList.contains('not-visible')){
//     resultsBox.classList.remove('not-visible');
//   }
  // clearTimeout(delayTimer);
  // let rb = $('#results_box').innerHTML
  // rb.text('Loading...');
  // delayTimer = setTimeout(function(){
  //   let text = $('#search-form').val()
  //   $.ajax({
  //     url: '/search',
  //     data: {
  //       'q': text,
  //     },
  //     dataType: 'json',
  //     success: (res)=>{
  //       console.log(res.data);
  //       results = $('#results_box').innerHTML 
  //       rb = (res.data)
  //       if (Array.isArray(rb)) {rb.forEach(text => {
  //         results += `<div class='row mt-2 mb-2">
  //           <div class='col-10'>
  //             <p class='h5'${rb}</p>
  //           </div>
  //         </div>`
  //       }
  //       )};
        // let results = '';
        // $('#results_box').text('');
        // // data[''].forEach(function(meal){
        // results += '<div class="row";
        // res.forEach(function(meal){

        // })
        // // });
        // $('#results_box').append(results)

      // },
      // error: (err) => {
      //   console.log(err)
      // }
//     });
//   }, 1000);
// });

// mealNameSearch.addEventListener('keyup', e=>{
//   console.log(e.target.value);

//   if (resultsBox.classList.contains('not-visible')){
//     resultsBox.classList.remove('not-visible')
//   }
//   sendMeal_name(e.target.value)
// });

// const sendMeal_name = (meal) =>{
//     $.ajax({
//       url: '/search',
//       data: {
//         'q': meal,
//       },
//       dataType: 'json',
//       success: (res)=>{
//         console.log(res)
//       },
//       error: (err) => {
//         console.log(err)
//       }
//     })
//   }
    

// const csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value

// const url = window.location.href
// console.log(url)
// console.log(meal_searchbar)
// console.log(searchIn)
// console.log(searchForm)
// console.log(csrf)

// 
  
    // if (resultsBox.classList.contains('not-visible')){
    //   resultsBox.classList.remove('not-visible')
    // }
  
    // sendMeal_name(e.target.value)
  // });

// mealNameSearch.keyup(function(){
//   clearTimeout(delayTimer);
//   resultsBox.text('Loading....');
//   delayTimer = setTimout(function(){
//     $.ajax({
//       datatype: 'json',
//       url: 'meal/search',
//       data: {
//       'search_term': meal,
//     },
//     success: (res)=>{
//       console.log(res)
//     },
//     error: (err) => {
//       console.log(err)
//     }
//   });
//   }, 1000);
// });

// ['change','keyup']meal_searchbar.addEventListener('keyup', e=>{
//   console.log(e.target.value)
  
  // if (resultsBox.classList.contains('not-visible')){
  //   resultsBox.classList.remove('not-visible')
  // }

  // sendMeal_name(e.target.value)
// });

// const url2 = new URL('https://api.edamam.com/auto-complete')
// function insertAfter(referenceNode, newNode){
//   referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
// }
// app id d4531d9e
// let food_api_id = document.createElement('input');
// food_api_id.type = 'hidden';
// food_api_id.name = 'app_id';
// food_api_id.value = '{{ app_id | json_script: "f_a_i"}}';
// food_api_id.setAttribute("id", "f_a_i")
// let food_app_id = document.getElementById("f_a_i").value;
// console.log(food_app_id);
// console.log(food_app_id.length);
// let food_aidStr = food_app_id.substring(0,4) + food_app_id.substring(11,15)


// console.log(food_aidStr)

// let food_api_key = document.getElementById("f_a_k").value;
// let food_keyStr = food_api_key.substring(6,40);
// let food_key2Str = food_api_key.substring(6,40).replace("-","").replace("-","")
// create logic for regex to replace the hyphens 
// console.log(food_keyStr)
// console.log(food_key2Str)
// let food_name = document.getElementById("search-input").value;
// console.log(food_api_key)
// console.log(food_name)
// let api_el = document.getElementById("f_a_i").value;
// console.log(food_api_id)


//Create img element with a meal_logo id

// let mealSearch = document.getElementById("kw_search");
//reference the parent node
// let mealForm = document.getElementById("mealform")

// mealForm.innerHTML += `
// <div class="search">
//     <form id="search-form" autocomplete="off">
//     <input type="text" id="search-input" class="search2">
//     </form>
// </div>`;

// meal_searchbar.innerHTML += `<script>'{{ csrf_token }}'</script>`;

// mealSearch.insertBefore(mealForm, mealSearch.childNodes[5]);

// insertAfter(mealForm, mealSearch)

// let csrf = document.createElement('input');
// csrf.type = 'hidden';
// csrf.name = 'csrfmiddlewaretoken';
// csrf.value = '{% csrf_token %}';
// csrf.setAttribute("id", "csrf")





// const sendMeal_name = (mealName) =>[
//   $.ajax({
//     type: 'POST',
//     url: 'search/',
//     data: {
//         'q': mealName,
//     },
//     success: (res)=>{
//       console.log(res)
//     },
//     error: (err) =>{
//       console.log(err)
//     }
//   })
// ]



// let food_app_id = '{{app_id}}';
// console.log(food_app_id)
// let params = [['app_id',food_aidStr],['app_key',food_key2Str],['q','chi'],['limit',5]];
// url.search = new URLSearchParams(params).toString();
// fetch (url);


