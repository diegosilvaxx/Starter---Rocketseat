// const arr = [1, 3, 4, 4, 5, 8, 9];

// const newArr = arr.map(function(item) {
//   return item * 2;
// });

// console.log(newArr);

// const sum = arr.reduce(function(total, next) {
//   return total + next;
// });

// console.log(sum);

// const filter = arr.filter(function(item) {
//   return item % 2 === 0;
// });

// console.log(filter);

// const find = arr.find(function(item) {
//   return item === 4;
// });

// console.log(find);

// const newArr2 = arr.map(item => item * 3);

// console.log(newArr2);

// const usuario = {
//   nome: "Diego",
//   idade: 24,
//   endereco: {
//     cidade: "Ribeirao preto",
//     estado: "SP"
//   }
// };

// console.log(usuario);

// const nome = "Diegao";
// const idade = 24;

// const usuario = {
//   nome,
//   idade
// };

// console.log(usuario);

// console.log(`Meu nome é ${nome} e tenho ${idade} anos`);

// alert("opa");

// const minhaPromisse = () =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("Ok");
//     }, 2000);
//   });

// async function execultaPromisse() {
//   const response = await minhaPromisse();

//   console.log(response);
// }

// execultaPromisse();

//com arroy Function
// const execultaPromisse = async () => {
//   console.log(await minhaPromisse());
//   console.log(await minhaPromisse());
//   console.log(await minhaPromisse());
// };

// execultaPromisse();

// import axios from "axios";

// class Api {
//   static async getUserInfo(usarname) {
//     try {
//       const response = await axios.get(
//         `https://api.github.com/users/${usarname}`
//       );
//       console.log(response);
//     } catch (error) {
//       console.warn("Erro na API " + error);
//     }
//   }
// }

// Api.getUserInfo("diego3g64546");
import api from "./api";

class App {
  constructor() {
    this.repositories = [];

    this.formEl = document.getElementById("repo-form");
    this.inputEl = document.querySelector("input[name=repository]");
    this.listEl = document.getElementById("repo-list");
    this.registerHandlers();
  }

  registerHandlers() {
    this.formEl.onsubmit = event => this.addRepository(event);
  }

  setLoading(loading = true) {
    if (loading === true) {
      let loadingEl = document.createElement("span");
      loadingEl.appendChild(document.createTextNode("Carregando..."));
      loadingEl.setAttribute("id", "loading");

      this.formEl.appendChild(loadingEl);
    } else {
      document.getElementById("loading").remove();
    }
  }

  async addRepository(event) {
    event.preventDefault();

    const repoInput = this.inputEl.value;

    if (repoInput.length === 0) return;

    this.setLoading();
    try {
      const response = await api.get(`/repos/${repoInput}`);
      console.log(response);
      const {
        name,
        description,
        html_url,
        owner: { avatar_url }
      } = response.data;

      this.repositories.push({
        name,
        description,
        avatar_url,
        html_url
      });

      this.inputEl.value = "";
      this.render();
    } catch (error) {
      alert("O repositório não existe!");
    }
    this.setLoading(false);
  }

  render() {
    this.listEl.innerHTML = "";

    this.repositories.forEach(repo => {
      let imgEl = document.createElement("img");
      imgEl.setAttribute("src", repo.avatar_url);

      let titleEl = document.createElement("strong");
      titleEl.appendChild(document.createTextNode(repo.name));

      let descriptionEl = document.createElement("p");
      descriptionEl.appendChild(document.createTextNode(repo.description));

      let linkEl = document.createElement("a");
      linkEl.setAttribute("target", "_blank");
      linkEl.setAttribute("href", repo.html_url);
      linkEl.appendChild(document.createTextNode("Acessar"));

      let listItemEl = document.createElement("li");
      listItemEl.appendChild(imgEl);
      listItemEl.appendChild(titleEl);
      listItemEl.appendChild(descriptionEl);
      listItemEl.appendChild(linkEl);

      this.listEl.appendChild(listItemEl);
    });
  }
}
new App();
