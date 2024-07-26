const accessKey = 'FAqrOcSaWdfWL3EgvTg_scfr4lu62iofZ7ex7iZEsN0';
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('.search-input');
const imageContainer = document.querySelector('.image-container');
const loadMoreButton = document.querySelector('.loadMoreButton');

let page=1;

//function to fetch images using Unsplash API
const fetchImages = async (query,pageNo) =>{
    try {
        if(pageNo ===1){
            imageContainer.innerHTML = '';
        }
        const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;

        const response = await fetch(url);
        const data = await response.json();

        // console.log(data);
        if(data.results.length > 0)
            {
                data.results.forEach(photo => {
                    //creating image div
                    const imageElement = document.createElement('div');
                    imageElement.classList.add('imageDiv');
                    imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;
            
                    //creating overlay
                    const overlayElement = document.createElement('div');
                    overlayElement.classList.add('overlay');
            
                    //creating overlay text
                    const overlayText = document.createElement('h3');
                    overlayText.innerText = `${photo.alt_description}`;
            
                    overlayElement.appendChild(overlayText);
                    imageElement.appendChild(overlayElement);
                    imageContainer.appendChild(imageElement);
                });
                if(data.total_pages === pageNo)
                    {
                        loadMoreButton.style.display = "none";
                    }
                else{
                    loadMoreButton.style.display = "block";
                }
            }
        else{
            imageContainer.innerHTML = `<h2>No image found.</h2>`;
            if(loadMoreButton.style.display === "block"){
                loadMoreButton.style.display = "none";
            }
        }
    } 
    catch (error) {
        imageContainer.innerHTML = `<h2>Failed to fetch images. PLease try again later</h2>`
        // if(loadMoreButton.style.display === "block"){
        //     loadMoreButton.style.display = "none";
        // }
    }
    
}

//Adding event listener to search form
searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if(inputText!== '')
        {
            page=1;
            fetchImages(inputText,page);
        }
    else{
        imageContainer.innerHTML = `<h2> Please enter a search query.</h2>`;
        if(loadMoreButton.style.display === "block"){
            loadMoreButton.style.display = "none";
        }
    }
})

//Adding event listener to load more
loadMoreButton.addEventListener('click', ()=>{
    fetchImages(searchInput.value.trim(), ++page);
});