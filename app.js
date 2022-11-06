
window.addEventListener('load', onLoad());

async function onLoad() {
    const res = await fetch(`http://localhost:3030/jsonstore/cookbook/recipes`);
    const data = await res.json();

    if (data.ok === false) {
        throw new Error(`Error`)
    }

   const recipe = Object.values(data);
   
    const myMain = document.querySelector('main')

    recipe.forEach(element => {
        const myArticle = document.createElement('article');
        myArticle.setAttribute('class', 'preview');

        const divOne = document.createElement('div');
        divOne.setAttribute('class', 'title');
        const h2 = document.createElement('h2');
        h2.textContent = element.name
        divOne.appendChild(h2);

        const divTwo = document.createElement('div');
        divTwo.setAttribute('class', 'small');
        const img = document.createElement('img');
        img.src = element.img
        divTwo.appendChild(img);

        myArticle.appendChild(divOne);
        myArticle.appendChild(divTwo);
        myMain.appendChild(myArticle);

    });

}

