// Task 2 - Fetch Tickets Using Async/Await and Handle Errors

// Using an async function to fetch tickets from the API
async function fetchTickets() {
    const apiURL = 'https://jsonplaceholder.typicode.com/posts';
    const errorMessageSection = document.getElementById('error-message');
    errorMessageSection.style.display = 'none'; // Hide any previous error messages

    try {
        // Fetch the data from the API
        const response = await fetch(apiURL);

        // If the response is not successful, throw an error
        if (!response.ok) {
            throw new Error('Network response was not successful');
        }

        // Parse JSON data from the response
        const tickets = await response.json();

        // If no tickets are found, throw a custom error
        if (tickets.length === 0) {
            throw new Error('No unresolved tickets available');
        }

        // Display the fetched tickets
        displayTickets(tickets);

    } catch (error) {
        // Show error message if fetch fails
        errorMessageSection.style.display = 'block';
        errorMessageSection.textContent = error.message;

    } finally {
        // TASK 4 - Ensure cleanup (e.g., hiding a loading message if added)
        console.log("Fetch attempt finished"); // Add any other cleanup code if needed
    }
}

// Call fetchTickets function when the page loads
window.addEventListener('load', fetchTickets);

// Task 3 - Display Tickets Dynamically on the Page

function displayTickets(tickets) {
    const container = document.getElementById('ticket-container');
    container.innerHTML = ''; // Clear any existing tickets

    // Iterate over each ticket and create HTML elements dynamically
    tickets.forEach(ticket => {
        const ticketElement = document.createElement('div');
        ticketElement.innerHTML = `
            <h2>Ticket ID: ${ticket.id}</h2>
            <p><strong>Customer Name:</strong> User ${ticket.userId}</p>
            <p><strong>Issue Description:</strong> ${ticket.title}</p>
            <p><strong>Details:</strong> ${ticket.body}</p>
            <hr>
        `;
        container.appendChild(ticketElement);
    });
}