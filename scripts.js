/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 * 
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your 
 *    browser and make sure you can see that change. 
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 * 
 */

// Global Variables
let paginationIndex = 0;
const cardsPerPage = 10; 
let query;

function search(value) {
    query = value;
    paginationIndex = 0;
    showCards();
}

async function loadData() {
    let data;
    await fetch('./data/players.json')
    .then((response) => response.json())
    .then((json) => {data = json})
    .catch((error) => console.log(error));
    
    if(query) {
        const queryParts = query.toLowerCase().split(" ");
        return data.filter((item) => 
            queryParts.every((value) => 
            item.firstName.toLowerCase().includes(value) || 
            item.lastName.toLowerCase().includes(value)));
    }

    return data;
}


// Remove all cards 
function removeAll() {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        // Remove all cards but the template card and dropped elements
        if (card.classList.contains('hidden') || card.classList.contains('dropped')){
            return;
        } 
        card.remove();
        }); 
}

function pagination(dir) {
    if (dir == 'right') {
        paginationIndex+=1;
    }
    if (dir == 'left') {
        paginationIndex-=1;
    }
    showCards();
}

  

async function editCardContent(card,playerFirst,playerLast,playerId) {
    const image = card.querySelector('img');
    const name = card.querySelector('h2');

    name.textContent = playerFirst + " " + playerLast;
    image.src = "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + encodeURIComponent(playerId) +".png";
    image.alt = "Picture of " + playerFirst + " " + playerLast;
}



async function showCards() {
    removeAll();//Clear board
    const data = await loadData();
    console.log(data);
    const template = document.querySelector('.card');
    const container = document.querySelector('#card-grid')

    const startIndex = cardsPerPage * paginationIndex;
    const endIndex = Math.min(startIndex + cardsPerPage, data.length);


    for (let i=startIndex; i<endIndex; i++) {
        const nextCard = template.cloneNode(true); // Copy the template card
        nextCard.classList.remove("hidden"); // Make sure they aren't hidden
        console.log();
        editCardContent(nextCard,data[i].firstName,data[i].lastName,data[i].playerId);
        container.appendChild(nextCard);
        
    }
    // Show page number
    document.querySelector('#page-number').textContent = "Page " + (paginationIndex+1) + " of " + Math.ceil(data.length / cardsPerPage); 


    const left = document.querySelector('#left');
    const right = document.querySelector('#right');

    if (startIndex <= 0) {
        left.classList.add('hidden');
    } else {
        left.classList.remove('hidden');
    }
    
    if (endIndex >= data.length) {
        right.classList.add('hidden');
    } else {
        right.classList.remove('hidden');
    }

}


// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards);