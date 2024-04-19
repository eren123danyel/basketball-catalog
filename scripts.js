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
let cardsPerPage = 10; 

async function loadData() {
    let data;
    await fetch('./data/players.json')
    .then((response) => response.json())
    .then((json) => {data = json})
    .catch((error) => console.log(error));
    
    return data;
}

// Remove all cards 
function removeAll() {
    document.querySelectorAll(".card").forEach(el => {if (!el.classList.contains('hidden')){el.remove()}}); // Remove all cards but the template card
}

function pagination(dir) {
    console.log(dir);
    if (dir == 'right') {
        paginationIndex++;
    }
    if (dir == 'left') {
        paginationIndex--;
    }
    removeAll();
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
    const data = await loadData();
    const template = document.querySelector('.card');
    const container = document.querySelector('#card-grid')

    for (let i=cardsPerPage*paginationIndex; i<cardsPerPage*paginationIndex+cardsPerPage; i++) {
        const nextCard = template.cloneNode(true); // Copy the template card
        nextCard.classList.remove("hidden"); // Make sure they aren't hidden
        console.log();
        editCardContent(nextCard,data[i].firstName,data[i].lastName,data[i].playerId);
        container.appendChild(nextCard);
        
    }

    const left = document.querySelector('#left');
    const right = document.querySelector('#right');

    if (paginationIndex*cardsPerPage <= 0) {left.classList.add('hidden');} else {left.classList.remove('hidden');}
    if (paginationIndex*cardsPerPage+cardsPerPage >= data.length) {left.classList.add('hidden');} else {right.classList.remove('hidden');}

     // Show page number
     document.querySelector('#page-number').textContent = "Page " + (paginationIndex+1) + " of " + Math.ceil(data.length / cardsPerPage); 

}


// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards);