// const login = (e) => {
//     e.preventDefault();
//     const user = document.getElementById("user").value;
//     const password = document.getElementById("password").value;

//     const objeto = {
//         user: user,
//         password: password
//     }
    
//     console.log(objeto);
//     postDataJSON('http://localhost:8080/api/productos/login', objeto)
//     .then(data => {
//       /*const msg = document.getElementById('msg');
//       msg.innerHTML = data.msg;*/
      
//       console.log(data); // JSON data parsed by `data.json()` call
//     })
//     .catch(e => {
//       console.log(e.message);
//     });    
// }

// const button = document.getElementById('send');
// button.addEventListener('click', login);

// // Ejemplo implementando el metodo POST:
// async function postDataJSON(url, data) {
//     // Opciones por defecto estan marcadas con un *
//     console.log(data);
//     const response = await fetch(url, {
//       method: 'POST', // *GET, POST, PUT, DELETE, etc.
//       mode: 'cors', // no-cors, *cors, same-origin
//       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: 'same-origin', // include, *same-origin, omit
//       headers: {
//         'Content-Type': 'application/json'
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       redirect: 'follow', // manual, *follow, error
//       referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//       body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     //return response.json(); // parses JSON response into native JavaScript objects
// }
  

const login = () => {

  const user = document.getElementById("user").value;
  const password = document.getElementById("password").value;

  const params = {
    email: user,
    password: password
  };

  console.log(params)
  // const options = {
  //     method: 'POST',
  //     body: JSON.stringify( params )  
  // };
  //console.log(options)
  fetch( 'http://localhost:8080/api/login/auth', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            }
  })
  .then((response) =>response.json())
  .then((data)=> {
    console.log(data)
    //window.location.replace(data.url)
  })
  .catch(function(err) {
    console.log(err)
  })
  
      /*.then( response => response.json() )
      .then( response => {
          // Do something with response.
      } );*/
}

const button = document.getElementById('send');
button.addEventListener('click', login);