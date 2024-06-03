document.addEventListener('DOMContentLoaded', function() {
    const googleSheetID = '1n3NmyMs5TqD7V6V6hap9NS_SgcraUwHgd4TZZ9QItL0';
    const apiUrl = `https://opensheet.elk.sh/${googleSheetID}/All%20Cards%2FMeanings!A3:L158`;

    function displayResults() {
        axios.get(apiUrl)
            .then(response => {
                const data = response.data;
                let interpretation = '';
                // Loop through each card input and find the data
                document.querySelectorAll('.card-input').forEach((input, index) => {
                    const cardName = input.value.trim();
                    const cardData = data.find(card => card.Name.toLowerCase() === cardName.toLowerCase());
                    if (cardData) {
                        const positionData = cardData[`C${index + 1}`]; // Dynamically access each column based on the position
                        interpretation += `<h3>Position ${index + 1} - ${cardName}</h3>
                                           <p><strong>Meaning:</strong> ${cardData.B}</p>  // 'B' is the general meaning
                                           <p><strong>Position Meaning:</strong> ${positionData}</p>`; // Position-specific meaning
                    } else {
                        interpretation += `<h3>Position ${index + 1} - ${cardName}</h3>
                                           <p><strong>Error:</strong> Card not found.</p>`;
                    }
                });
                document.getElementById('interpretation').innerHTML = interpretation;
            });
    }

    document.getElementById('tarotForm').addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the form from submitting traditionally
        displayResults();
    });
});
