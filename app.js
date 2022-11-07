

window.addEventListener('load', async () => {
    const recipe = await onLoad();

});

async function onLoad() {
    const res = await fetch(`http://localhost:3030/jsonstore/cookbook/recipes`);
    const data = await res.json();

    if (data.ok === false) {
        throw new Error(`Error`)
    }

    const recipe = Object.values(data);

    const myMain = document.querySelector('main');
    const p = document.querySelector('p');
    p.textContent = '';

    recipe.forEach(element => {
        const myArticle = document.createElement('article');
        myArticle.setAttribute('class', 'preview');
        myArticle.setAttribute('id', `${element._id}`);

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

        myArticle.addEventListener('click', fullRecipe)


    });

}

async function fullRecipe(e) {
    let target = e.target;
    let id = target.getAttribute('id');
    
    const currentFetch = await fetch(`http://localhost:3030/jsonstore/cookbook/details/${id}`);
    const fullRecipe = await currentFetch.json();
    const ingredients = fullRecipe.ingredients;
    const preperation = fullRecipe.steps;
    const recipieName = fullRecipe.name;

    let divForImg = document.createElement('div');
    divForImg.setAttribute('class', 'thumb')

    let currentImg = document.createElement('img');
    currentImg.src = fullRecipe.img
    divForImg.appendChild(currentImg);

    let divForIng = document.createElement('div');
    divForIng.setAttribute('class', 'ingredients');
    let ulIngr = document.createElement('ul');

    ingredients.forEach(ingr => {
        let li = document.createElement('li');
        li.textContent = `${ingr}`;
        ulIngr.appendChild(li);
    });
    const h3Ingr = document.createElement('h3');
    h3Ingr.textContent = `Ingredients:`;
    divForIng.appendChild(h3Ingr)
    divForIng.appendChild(ulIngr);

    let ulPrep = document.createElement('ul');
    let divPrep = document.createElement('div');
    divPrep.setAttribute('class', 'description')
    preperation.forEach(prep => {
        let li = document.createElement('li');
        li.textContent = `${prep}`;
        ulPrep.appendChild(li);
    });
    const h3Prep = document.createElement('h3');
    h3Prep.textContent = `Preparation: `;
    divPrep.appendChild(ulPrep);
    divPrep.appendChild(h3Prep);

    const h2Name = document.createElement('h2');
    h2Name.textContent = recipieName;

    const currentArticle = document.createElement('article');
    currentArticle.setAttribute('id', id)
    const divBand = document.createElement('div');
    divBand.setAttribute('class', 'band');
    divBand.appendChild(divForImg);
    divBand.appendChild(divForIng);
    currentArticle.appendChild(h2Name);
    currentArticle.appendChild(divBand);
    currentArticle.appendChild(divPrep);

    target.remove()
    const myMain = document.querySelector('main');
    myMain.appendChild(currentArticle);
   
}



