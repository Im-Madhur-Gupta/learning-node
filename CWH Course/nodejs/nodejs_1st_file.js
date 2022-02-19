// console.log("Backend started.");
// for(let i=2;i<=20;i+=2){
//     console.log(i);
// }

// REPL (terminal me node dalke) me _ contains the last evaluated variable.

const http = require('http'); // --> OLD WAY, Node.js ko yahi samajh ayega.
// import http from "http"; --> NEW WAY - But Node.js won't understand the new way.

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Events in JS</title>
      <style>
          p{
              /* display: none;*/
              /* visibility: hidden; */
          }
          .btn{
              padding: 6px;
              border: 2px solid white;
              background-color: black;
              color: white;
              border-radius: 4px;
              font-weight:bold;
              transition: all 0.5s ease-in-out;
          }
          .btn:hover{
              border: 2px solid black;
              background-color: white;
              color: black;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Events in JS</h1>
          <p id="para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime accusantium ut quam aspernatur tempora necessitatibus, possimus a dolorem iusto dicta eaque dolor eum sapiente consectetur delectus nemo laudantium excepturi vero voluptatum. Optio, iste a? Iusto, praesentium! Quasi sequi libero nihil repellendus voluptate debitis! Suscipit reprehenderit enim tempore recusandae, numquam quae esse delectus. Corrupti ipsam, tempora ea assumenda veniam fugit repellendus aliquid accusantium nobis temporibus dolores laborum voluptatum expedita? Adipisci porro ducimus, numquam error vitae exercitationem, necessitatibus ipsam aspernatur iusto ad, deserunt ipsum sed expedita. Itaque atque enim facilis minima harum consequuntur explicabo recusandae, illo illum blanditiis aliquam natus assumenda nemo fugiat vel quas animi voluptatum iusto officiis. Aspernatur, nemo vero. Commodi impedit quos maxime eaque aspernatur sit culpa, quia sapiente ipsa repudiandae excepturi libero officia nemo natus nihil, pariatur temporibus placeat incidunt corrupti nulla aliquid nesciunt quo aperiam. Sed temporibus quia voluptates quasi alias eligendi unde beatae voluptas ex, laboriosam maiores omnis. Corrupti autem reprehenderit adipisci maxime mollitia, nostrum odio amet saepe blanditiis dicta expedita nesciunt deleniti suscipit magni ipsa eveniet voluptatum aliquam, ipsum, esse omnis accusantium! Dolorum magni molestias quasi tempore reiciendis? Veniam perspiciatis odit temporibus, itaque eius voluptas ad deserunt? Animi velit quod officia natus totam quae incidunt recusandae aliquid iusto optio? Similique laboriosam inventore cum doloremque, ipsum ullam architecto exercitationem. Aliquid ut, cupiditate enim sunt cum ab, sed dolorum, similique autem ipsa nostrum neque! Consectetur impedit, culpa, velit sint quae incidunt dolor recusandae at nulla tempore voluptatem, quo ullam deleniti ut in temporibus vitae. Accusamus nihil, nam qui ea repudiandae fuga, quia unde recusandae et sunt ipsam eum numquam repellat in dicta totam? Reiciendis cum libero soluta commodi temporibus inventore nulla, recusandae, dolor architecto veniam unde quos nostrum? Delectus nesciunt animi, officiis dicta placeat cumque quaerat dolorum, maxime facere dolorem, accusamus expedita omnis totam. Blanditiis, molestias itaque!</p>
          <button class="btn" onclick="togglehide()">Show/Hide</button>
          <button class="btn" onclick="togglereadmode()">Toggle Read Mode</button>
          <button class="btn" onclick="togglejustify()">Justify Content</button>
      </div>
      <script>
          // Event matlab ek signal ki kuch hua he like a click of a button on our website aur fir usse kuch karwaya. Aur in events ko listen karke mai jo bhi required work he wo karwa sakta hu.
          // Some events are -
          // 1. mouse events -
          // click
          // contextmenu
          // mouseover/mouseout
          // mousedown/mouseup
          // mousemove
  
          // 2. form events -
          // submit
          // focus
  
          // Other events - DOMContentLoaded, transitionend.
          
          // Ab jo maine button banaya he mai usko press karne se jo para he usko hide karna chahta hu - 
          // Step 1 - I will give the button an attribute onclick="hide()", hide() is the js function that I want to trigger when the button is pressed.
          // Step 2 - Define hide() function as per your requirement.
  
          // Aur bhi kai sare on___ wale attributes hote he.
          function togglehide(){
              let para = document.getElementById("para");
              if(para.style.display!="none"){ // IMP - Yaha maine ye check kiya ki para HTMLElement ki CSS (style) display ppt pe none (ppt value ko string bana ke use karna padega) to ni he.
                  // Remember here that name of some CSS ppts are slightly different.
                  para.style.display="none";
              }
              else{
                  para.style.display="block";
              }
          }
          function togglereadmode(){
              let para = document.getElementById("para");
              if(para.style.fontWeight!="bold"){ // Agr read mode off ho to -
                  para.style.fontWeight="bold";
                  para.style.color="white";
                  para.style.backgroundColor="black";
                  para.style.fontSize="1.2rem";
              }
              else{ // Agr read mode on ho to -
                  para.style.fontWeight="lighter";
                  para.style.color="black";
                  para.style.backgroundColor="white";
                  para.style.fontSize="1rem";
              }
          }
          function togglejustify(){
              let para = document.getElementById("para");
              if(para.style.textAlign!="justify"){
                  para.style.textAlign="justify";
              }
              else{
                  para.style.textAlign="left";
              }
          }
          
          
          
          // IMPORTANT - But there is a better way to do the above, using Event Listeners -
          // element.addEventListener("kya listen karna he",listen karne pe kya function execute karna he);
          
          let para = document.getElementById("para");
          // Above line for declaring para isn't required as modern browsers already make a global variable with id as it's name that points to that element (here the paragraph with id="para"). Aur agr "para" name ka koi dura variable declare kar diya to overwrite ho jaega.
          
          para.addEventListener("mouseover",function zoomin(){
                  para.style.fontSize="1.2rem";
          });
          // above maine para me ek event listener add kar diya jo mouseover ko detect karke trigger ho jaega, then I have to give a function jo run hoga when this event is triggered. Abviously function ke andar mai kuch bhi karwa sakta hu.
          para.addEventListener("mouseout",function zoomout(){
              para.style.fontSize="1rem";
          })
          // Remember this is not toggling, ye event listener wale functions sirf tab execute honge jab mera event chal raha hoga and jaise hi event band hogaya to ye usko waise ka waisa chodd dega aur phir listen karne ke liye baith jaega. 
          
          </script>
  </body>
  </html>`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});