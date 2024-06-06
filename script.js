const jokeContainer = document.getElementById("joke");
const wrapper = document.getElementById("wrapper");
const btn = document.getElementById("btn");
const jokeUrl = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";
const imageUrl = "https://api.api-ninjas.com/v1/randomimage?category=nature";

function getJoke() {
    jokeContainer.classList.remove("fade");
    fetch(jokeUrl)
        .then(response => response.json())
        .then(data => {
            jokeContainer.textContent = data.joke;
            jokeContainer.classList.add("fade");

            // Fetch random image based on joke category
            fetch(imageUrl + data.category)
                .then(response => response.json())
                .then(imageData => {
                    const imageUrl = imageData.image || imageData.url || imageData.imageUrl;
                    wrapper.style.backgroundImage = `url(${imageUrl})`;
                })
                .catch(error => {
                    console.error('Error fetching image:', error);
                });
        })
        .catch(error => {
            console.error('Error fetching joke:', error);
        });
}

btn.addEventListener("click", getJoke);

// Initial joke fetch
getJoke();
