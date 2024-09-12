document.addEventListener('DOMContentLoaded', function() {
    const pollForm = document.getElementById('poll-form');
    const optionsContainer = document.getElementById('options-container');
    const addOptionBtn = document.getElementById('add-option-btn');
    const pollDisplay = document.getElementById('poll-display');
    const displayQuestion = document.getElementById('display-question');
    const voteForm = document.getElementById('vote-form');
    const submitVoteBtn = document.getElementById('submit-vote');

    addOptionBtn.addEventListener('click', function() {
        const optionInput = document.createElement('input');
        optionInput.setAttribute('type', 'text');
        optionInput.classList.add('poll-option');
        optionInput.setAttribute('placeholder', 'Enter Option');
        optionInput.required = true;
        optionsContainer.appendChild(optionInput);
    });

    
    pollForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const question = document.getElementById('poll-question').value;
        const options = [...document.querySelectorAll('.poll-option')].map(option => option.value);

        if (!question || options.length < 2) {
            alert("Please enter a question and at least two options.");
            return;
        }

        pollData = { question, options };
        pollResults = options.reduce((acc, option) => {
            acc[option] = 0;
            return acc;
        }, {});

        displayPoll();
    });

    
    function displayPoll() {
        pollForm.classList.add('hidden');
        displayQuestion.innerText = pollData.question;

        pollData.options.forEach(option => {
            const label = document.createElement('label');
            const radioInput = document.createElement('input');
            radioInput.setAttribute('type', 'radio');
            radioInput.setAttribute('name', 'poll');
            radioInput.setAttribute('value', option);
            label.appendChild(radioInput);
            label.appendChild(document.createTextNode(option));
            voteForm.appendChild(label);
            voteForm.appendChild(document.createElement('br'));
        });

        pollDisplay.classList.remove('hidden');
        submitVoteBtn.classList.remove('hidden');
    }

    
    submitVoteBtn.addEventListener('click', function() {
        const selectedOption = document.querySelector('input[name="poll"]:checked');
        if (!selectedOption) {
            alert("Please select an option to vote.");
            return;
        }

        pollResults[selectedOption.value]++;
        displayResults();
    });

   
    function displayResults() {
        voteForm.classList.add('hidden');
        submitVoteBtn.classList.add('hidden');
        resultsDisplay.classList.remove('hidden');

        Object.keys(pollResults).forEach(option => {
            const resultItem = document.createElement('p');
            resultItem.textContent = `${option}: ${pollResults[option]} votes`;
            resultsDisplay.appendChild(resultItem);
        });
    }
});
