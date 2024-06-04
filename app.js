document.addEventListener('DOMContentLoaded', function() {
    // Fetch and parse the CSV data
    fetch('card_meanings.csv')
        .then(response => response.text())
        .then(csvText => {
            const cardData = parseCSV(csvText);
            setUpForm(cardData);
        })
        .catch(error => console.error('Error fetching or parsing CSV:', error));

    function parseCSV(csvText) {
        const parsed = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true
        });

        return parsed.data.map(row => ({
            Name: row.Card.trim(),
            Meanings: [
                row['Position 1']?.trim() ?? "",
                row['Position 2']?.trim() ?? "",
                row['Position 3']?.trim() ?? "",
                row['Position 4']?.trim() ?? "",
                row['Position 5']?.trim() ?? "",
                row['Position 6']?.trim() ?? "",
                row['Position 7']?.trim() ?? "",
                row['Position 8']?.trim() ?? "",
                row['Position 9']?.trim() ?? "",
                row['Position 10']?.trim() ?? ""
            ]
        }));
    }

    function setUpForm(cardData) {
        const cardNames = cardData.map(card => card.Name);
        console.log("Setting up form with card names:", cardNames);
        $(".card-input").autocomplete({
            source: cardNames,
            autoFocus: true,
            delay: 300
        });

        document.getElementById('tarotForm').addEventListener('submit', function(event) {
            event.preventDefault();
            displayResults(cardData);
        });
    }

    function displayResults(cardData) {
        let interpretation = '';
        document.querySelectorAll('.card-input').forEach((input, index) => {
            const cardName = input.value.trim().toLowerCase();
            const cardInfo = cardData.find(card => card.Name.toLowerCase() === cardName);
            if (cardInfo) {
                const positionSummary = cardInfo.Meanings[index]; // Ensure this index corresponds correctly to columns in CSV
                interpretation += `<h3>Position ${index + 1} - ${cardInfo.Name}</h3><p>${positionSummary}</p>`;
            } else {
                interpretation += `<h3>Position ${index + 1} - Card not found</h3><p>No summary available. Please check the spelling and format of the card name.</p>`;
            }
        });
        document.getElementById('interpretation').innerHTML = interpretation;
    }
});
