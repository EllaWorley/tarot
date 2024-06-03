document.addEventListener('DOMContentLoaded', function() {
    const tarotCards = [
        "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
        "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
        "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
        "The Devil", "The Tower", "The Star", "The Moon", "The Sun",
        "Judgment", "The World",
        "Ace of Wands", "Two of Wands", "Three of Wands", "Four of Wands", "Five of Wands",
        "Six of Wands", "Seven of Wands", "Eight of Wands", "Nine of Wands", "Ten of Wands",
        "Page of Wands", "Knight of Wands", "Queen of Wands", "King of Wands",
        "Ace of Cups", "Two of Cups", "Three of Cups", "Four of Cups", "Five of Cups",
        "Six of Cups", "Seven of Cups", "Eight of Cups", "Nine of Cups", "Ten of Cups",
        "Page of Cups", "Knight of Cups", "Queen of Cups", "King of Cups",
        "Ace of Swords", "Two of Swords", "Three of Swords", "Four of Swords", "Five of Swords",
        "Six of Swords", "Seven of Swords", "Eight of Swords", "Nine of Swords", "Ten of Swords",
        "Page of Swords", "Knight of Swords", "Queen of Swords", "King of Swords",
        "Ace of Pentacles", "Two of Pentacles", "Three of Pentacles", "Four of Pentacles", "Five of Pentacles",
        "Six of Pentacles", "Seven of Pentacles", "Eight of Pentacles", "Nine of Pentacles", "Ten of Pentacles",
        "Page of Pentacles", "Knight of Pentacles", "Queen of Pentacles", "King of Pentacles",
        // Reversed cards
        "The Fool Reversed", "The Magician Reversed", "The High Priestess Reversed", "The Empress Reversed", "The Emperor Reversed",
        "The Hierophant Reversed", "The Lovers Reversed", "The Chariot Reversed", "Strength Reversed", "The Hermit Reversed",
        "Wheel of Fortune Reversed", "Justice Reversed", "The Hanged Man Reversed", "Death Reversed", "Temperance Reversed",
        "The Devil Reversed", "The Tower Reversed", "The Star Reversed", "The Moon Reversed", "The Sun Reversed",
        "Judgment Reversed", "The World Reversed",
        "Ace of Wands Reversed", "Two of Wands Reversed", "Three of Wands Reversed", "Four of Wands Reversed", "Five of Wands Reversed",
        "Six of Wands Reversed", "Seven of Wands Reversed", "Eight of Wands Reversed", "Nine of Wands Reversed", "Ten of Wands Reversed",
        "Page of Wands Reversed", "Knight of Wands Reversed", "Queen of Wands Reversed", "King of Wands Reversed",
        "Ace of Cups Reversed", "Two of Cups Reversed", "Three of Cups Reversed", "Four of Cups Reversed", "Five of Cups Reversed",
        "Six of Cups Reversed", "Seven of Cups Reversed", "Eight of Cups Reversed", "Nine of Cups Reversed", "Ten of Cups Reversed",
        "Page of Cups Reversed", "Knight of Cups Reversed", "Queen of Cups Reversed", "King of Cups Reversed",
        "Ace of Swords Reversed", "Two of Swords Reversed", "Three of Swords Reversed", "Four of Swords Reversed", "Five of Swords Reversed",
        "Six of Swords Reversed", "Seven of Swords Reversed", "Eight of Swords Reversed", "Nine of Swords Reversed", "Ten of Swords Reversed",
        "Page of Swords Reversed", "Knight of Swords Reversed", "Queen of Swords Reversed", "King of Swords Reversed",
        "Ace of Pentacles Reversed", "Two of Pentacles Reversed", "Three of Pentacles Reversed", "Four of Pentacles Reversed", "Five of Pentacles Reversed",
        "Six of Pentacles Reversed", "Seven of Pentacles Reversed", "Eight of Pentacles Reversed", "Nine of Pentacles Reversed", "Ten of Pentacles Reversed",
        "Page of Pentacles Reversed", "Knight of Pentacles Reversed", "Queen of Pentacles Reversed", "King of Pentacles Reversed"
    ];

    const apiUrl = 'https://opensheet.elk.sh/1n3NmyMs5TqD7V6V6hap9NS_SgcraUwHgd4TZZ9QItL0/All%20Cards%2FMeanings!A3:L158';

    $(".card-input").autocomplete({
        source: tarotCards,
        autoFocus: true
    });

    document.getElementById('tarotForm').addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the form from submitting traditionally
        displayResults();
    });

    function displayResults() {
        axios.get(apiUrl)
            .then(response => {
                const data = response.data; // Assuming this returns an array of objects where each object contains card details
                let interpretation = '';

                // Loop through each card input and find the data
                document.querySelectorAll('.card-input').forEach((input, index) => {
                    const cardName = input.value.trim().toLowerCase();
                    const cardData = data.find(card => card.Name.toLowerCase() === cardName);

                    if (cardData) {
                        // Columns are assumed to be 'C', 'D', 'E', etc., based on card position (1 to 10)
                        const columnLetter = String.fromCharCode(67 + index); // 67 is ASCII for 'C'
                        const positionSummary = cardData[columnLetter];

                        interpretation += `<h3>Position ${index + 1} - ${cardName}</h3>
                                           <p>${positionSummary}</p>`;
                    } else {
                        interpretation += `<h3>Position ${index + 1} - Card not found</h3>
                                           <p>No summary available. Please check the spelling and format of the card name.</p>`;
                    }
                });

                document.getElementById('interpretation').innerHTML = interpretation;
            })
            .catch(error => {
                console.error('Error loading the data:', error);
                document.getElementById('interpretation').innerHTML = `<p>Error retrieving card information. Please try again.</p>`;
            });
    }
});
