document.addEventListener('DOMContentLoaded', function() {
    const googleSheetID = '1n3NmyMs5TqD7V6V6hap9NS_SgcraUwHgd4TZZ9QItL0';
    const apiUrl = `https://opensheet.elk.sh/${googleSheetID}/All%20Cards%2FMeanings!A3:L158`;

    function loadCards() {
        axios.get(apiUrl)
            .then(response => {
                const data = response.data;
                // Populate all dropdowns
                for (let i = 1; i <= 10; i++) {
                    const dropdown = document.getElementById('card' + i);
                    data.forEach(item => {
                        let option = document.createElement('option');
                        option.value = item.Name; // Assumes 'Name' is your column A in the JSON response
                        option.textContent = item.Name;
                        dropdown.appendChild(option);
                    });
                }
            })
            .catch(error => console.error('Error loading the data: ', error));
    }

    function displayResults() {
        axios.get(apiUrl)
            .then(response => {
                const data = response.data;
                let interpretation = '';
                // Loop through each dropdown and find the data
                for (let i = 1; i <= 10; i++) {
                    const selectedCard = document.getElementById('card' + i).value;
                    const cardData = data.find(card => card.Name === selectedCard);
                    const positionData = cardData[`C${i}`]; // Adjusted to dynamically access each column based on the position
                    interpretation += `<h3>Position ${i} - ${selectedCard}</h3>
                                       <p><strong>Meaning:</strong> ${cardData.B}</p>  // 'B' is the general meaning
                                       <p><strong>Position Meaning:</strong> ${positionData}</p>`; // Each card position has specific meaning
                }
                document.getElementById('interpretation').innerHTML = interpretation;
            });
    }

    loadCards();
    document.getElementById('tarotForm').addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the form from submitting in the traditional manner
        displayResults();
    });
});
