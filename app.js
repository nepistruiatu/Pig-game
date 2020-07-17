var scores, roundScore, activePlayer, gamePlaying;

init(); // Reset

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // Generează un număr aleatoriu între 0 şi 1; rotunjeşte în jos cu .floor
        var dice = Math.floor(Math.random() * 6) + 1;

        // Afişează rezultatele
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';        // Zarul devine iar vizibil
        diceDOM.src = 'dice-' + dice + '.png';  // Selectează poza potrivită

        // Updatează scorul rundei dacă nu s-a dat 1
        if (dice !== 1) {
            // Adaugă scorul curent la cel al rundei şi afişează-l
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();   // Următorul
        }
    }    
});
// Dacă butonul Hold este apăsat atunci updatează scorul şi UI, verifică dacă a câştigat
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {   // Verifică dacă jocul este activ
        // Adaugă scorul curent la scorul global
        scores[activePlayer] += roundScore;

        // Updatează UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Verifică dacă jucătorul a câştigat, schimbă numele cu Winner şi dezactivează-l
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none'; // Zarul devine invizibil
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;    // Dezactivează jocul
        } else {            
            nextPlayer();   // Următorul
        }
    }    
});
// Schimbă jucătorul activ
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        // Resetează scorul curent acumulat
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        // Mută clasa 'active' la celălalt jucător
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        // Ascunde zarul când începe o nouă rundă
        document.querySelector('.dice').style.display = 'none';
};
// Începe un nou joc dând clic pe New game
document.querySelector('.btn-new').addEventListener('click', init);
// Reseteaza jocul
function init() {
    scores = [0, 0]; // Scorul ambilor jucători 
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true; // Activează jocul

    document.querySelector('.dice').style.display = 'none';
    // Resetează scorurile (global + rundă)
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    // Resetează numele jucătorilor şi reactivează Player 0
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');    
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
