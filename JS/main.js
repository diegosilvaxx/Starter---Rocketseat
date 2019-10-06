// var xhr = new XMLHttpRequest();

// xhr.open("GET", "https://api.github.com/users/diegosilvaxx");
// xhr.send(null);

// xhr.onreadystatechange = function() {
//   if (xhr.readyState === 4) {
//     console.log(JSON.parse(xhr.responseText));
//   }
// };

// var minhaPromise = function() {
//   return new Promise(function(resolve, reject) {
//     var xhr = new XMLHttpRequest();

//     xhr.open("GET", "https://api.github.com/users/diegosilvaxx");
//     xhr.send(null);

//     xhr.onreadystatechange = function() {
//       if (xhr.readyState === 4) {
//         if (xhr.status === 200) {
//           resolve(JSON.parse(xhr.responseText));
//         } else {
//           reject("Erro na requisição");
//         }
//       }
//     };
//   });
// };

function checaIdade(idade) {
  return new Promise((resolve, reject) => {
    if (idade < 18) {
      reject("Sua idade e maior que 18");
    } else {
      resolve("Sua idade e menor que 18");
    }
  });
}
checaIdade(20)
  .then(function() {
    console.log("Sua idade e maior que 18");
  })
  .catch(function() {
    console.log("Sua idade e menor que 18");
  });

// axios
//   .get("https://api.github.com/users/diegosilvaxx")
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(error) {
//     console.warn(error);
//   });
