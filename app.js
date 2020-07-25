// scorul total, curent, jucătorul activ, starea jocului(activ | încheiat), valoarea zarului anterior
var scores, roundScore, activePlayer, gamePlaying, previousRoll;

init(); // Reset

// Selectează butonul Roll şi rulează funcţia de fiecare dată când acesta e apăsat
document.querySelector('.btn-roll').addEventListener('click', function() {
    // Dezactivează input field-ul pentru modificări ulterioare când se dă prima oară cu zarul
    document.querySelector('.set-score').disabled = true;

    if(gamePlaying) {   // Verifică dacă jocul este activ
        // Generează un număr aleatoriu între 1 şi 6
        var dice = Math.floor(Math.random() * 6) + 1;

        // Afişează rezultatele
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';        // Zarul devine vizibil
        diceDOM.src = 'dice-' + dice + '.png';  // Selectează poza care corespunde valorii zarului

        // Resetează scorul la 0 dacă pică 6 de 2 ori consecutiv şi încheie tura jucătorului
        if(dice === 6 && previousRoll === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        // Adaugă valoarea zarului la scorul curent al jucătorului şi afişează-l dacă nu s-a dat 1
        } else if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        // Următorul (dacă s-a dat 1)
        } else {
            nextPlayer();
        }
        previousRoll = dice; // reţine valoarea zarului pentru tura următoare
    }    
});
// Dacă butonul Hold e apăsat atunci updatează scorul şi UI, verifică dacă a câştigat
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {   // Verifică dacă jocul e activ
        // Adaugă scorul curent la scorul total
        scores[activePlayer] += roundScore;
        // Updatează scorul total pentru jucătorul activ
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Salvează valoarea din input field într-o variabilă
        var setScore = document.querySelector('.set-score').value;
        // Verifică dacă jucătorul a câştigat, schimbă numele cu Winner şi dezactivează-l
        if (scores[activePlayer] >= setScore) { // variabila determină scorul necesar victoriei
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none'; // Zarul devine invizibil
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;    // Dezactivează jocul
        } else {            
            nextPlayer();   // Următorul (dacă punctajul e sub 100)
        }
    }    
});
// Schimbă jucătorul activ
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        // Resetează scorul curent acumulat pentru ambii jucători
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        // Mută clasa 'active' la celălalt jucător
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        // Ascunde zarul când începe o nouă rundă
        document.querySelector('.dice').style.display = 'none';
};
// Resetează totul şi începe un nou joc când e apăsat New game
document.querySelector('.btn-new').addEventListener('click', init);
// Reseteaza jocul
function init() {
    scores = [0, 0]; // Scorul ambilor jucători devine 0
    activePlayer = 0;   //Player 1(stânga) devine jucătorul activ 
    roundScore = 0;
    gamePlaying = true; // Activează jocul

    document.querySelector('.set-score').disabled = false;      // activează câmpul scorului

    document.querySelector('.dice').style.display = 'none';     // ascunde zarul
    // Resetează scorurile (total + curent)
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    // Resetează numele şi starea jucătorilor
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');    
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');      //reactivează Player 1
}