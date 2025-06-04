const partyList = document.getElementById('party-list');
const addPartyForm = document.getElementById('add-party-form');
const API_URL = 'https://fsa-crud-2aa9294b8e23.herokuapp.com/api/2311-FSA-ET-WEB-PT-SF/events';

// This Function fetchs and renders parties
async function fetchAndRenderParties() {
    try {
        const response = await fetch(API_URL); //Rubric: Fetch GET
        const result = await response.json();
        const parties = result.data;

        partyList.innerHTML = '';

        parties.forEach(party => {
            const partyDiv = document.createElement('div');
            partyDiv.classList.add('party-item');
            partyDiv.innerHTML = `
                <h3>${party.name}</h3>
                <p>Date: ${party.date}</p>
                <p>Time: ${party.time}</p>
                <p>Location: ${party.location}</p>
                <p>Description: ${party.description}</p>
                <button class="delete-button" data-id="${party.id}">Delete</button>
            `;
            partyList.appendChild(partyDiv);
        });

        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', handleDeleteParty);
        });

    } catch (error) {
        console.error('Error fetching parties:', error);
    }
}

// Party Deleting Function
async function handleDeleteParty(event) {
    const partyId = event.target.dataset.id;
    try {
        await fetch(`${API_URL}/${partyId}`, { 
            method: 'DELETE',
        });
        fetchAndRenderParties(); 
    } catch (error) {
        console.error('Error deleting party:', error);
    }
}

// Add New Party Fucntion 
async function handleAddParty(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const location = document.getElementById('location').value;
    const description = document.getElementById('description').value;

    try {
        await fetch(API_URL, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, date, time, location, description }),
        });
        fetchAndRenderParties(); 
        addPartyForm.reset();
    } catch (error) {
        console.error('Error adding party:', error);
    }
}

// Form submission Event listener 
addPartyForm.addEventListener('submit', handleAddParty);

fetchAndRenderParties();