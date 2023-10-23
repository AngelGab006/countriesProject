const datalist = document.getElementById('countries');
const input = document.getElementById('countriesInput');
const imgContainer = document.getElementById('imgContainer');
const nameContainer = document.getElementById('nameContainer');
const favicon = document.querySelector("link[rel*='icon']");
let countries = [];
const url = 'https://restcountries.com/v2/all';
fetch(url)
    .then(result => result.json())
    .then(data =>{
        for (let i = 0; i < data.length; i++) {
            countries.push(data[i].name)
            datalist.innerHTML += `<option value="${data[i].name}"></option>`
        };
    })
    .catch(err=> `something went wrong ${err}`);
function searcher(value) {
    return new Promise((resolve,rejected)=>{
        fetch(url)
            .then(result => result.json())
            .then(data=>{
                for (let i = 0; i < data.length; i++) {
                    if (data[i].name === value) {
                        resolve(data[i].flags.png)
                    };
                };
            })
            .catch(err=>rejected(`ocurrio un error inesperado ${err}`))
    });
};
async function search(value) {
    imgContainer.innerHTML = `<img class="flags" src="../assets/img/cargando.webp" class="img">`;
    favicon.href = '../assets/img/cargando.webp';
    nameContainer.innerHTML = `<label id="name" for="img">cargando...</label>`
    const img = await searcher(value);
    console.log(img);
    imgContainer.innerHTML = `<img class="flags" src="${img}" class="img">`;
    favicon.href = img;
    nameContainer.innerHTML = `<label id="name" for="img">${value}</label>`;
    return img
}
input.addEventListener('input',()=>{
    let value = input.value
    if (countries.includes(value)) {
        search(value);
    };
});