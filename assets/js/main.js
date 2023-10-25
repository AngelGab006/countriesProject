const datalist = document.getElementById('countries');
const input = document.getElementById('countriesInput');
const imgContainer = document.getElementById('imgContainer');
const nameContainer = document.getElementById('nameContainer');
const favicon = document.querySelector("link[rel*='icon']");
const filter = document.querySelector('.filter');
const ubicacion = document.getElementById('ubicacion');
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
function pathUbication(value) {
    return new Promise((resolve,rejected)=>{
        try {
            let elemento = document.querySelector(`path[title='${value}']`);
            if(elemento == null)throw new Error('este pais no esta en el mapa');
            console.log(elemento)
            let pathD= elemento.getAttribute('d').split(' ');
            resolve(pathD[1]);
        } catch (error) {
            rejected(`ha ocurrido un error: ${error}`)
        }
    })
};
function X10(path) {
    let pathDX10 =  path.split(',');
    pathDX10[0] = Number(pathDX10[0]) * 10
    pathDX10[1] = Number(pathDX10[1]) * 10
    return pathDX10.join(',')
}
function cambiarUbicacion(path) {
    let arrUbicacion = ubicacion.getAttribute('d').split(' ')
    arrUbicacion[1]= path;
    arrUbicacion = arrUbicacion.join(' ');
    ubicacion.setAttribute('d',arrUbicacion);
}
async function search(value) {
    imgContainer.innerHTML = `<img class="flags" src="../assets/img/cargando.webp" class="img">`;
    favicon.href = '../assets/img/cargando.webp';
    nameContainer.innerHTML = `<label id="name" for="img">cargando...</label>`
    const img = await searcher(value);
    let pathD = await pathUbication(value);
    pathD = X10(pathD);
    cambiarUbicacion(pathD);
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