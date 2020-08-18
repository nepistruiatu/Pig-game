// scorul global, al rundei(curent), jucătorul activ şi starea jocului(resetat|activ sau încheiat=inactiv)
var scores, roundScore, activePlayer, gamePlaying;

init(); // Reset

// Selectează butonul Roll şi rulează funcţia de fiecare dată când acesta e apăsat
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {   // Verifică dacă jocul este activ
        // Generează un număr aleatoriu între 1 şi 6
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // Afişează rezultatele
        document.getElementById('dice-1').style.display = 'block'; // Zarurile devin vizibile
        document.getElementById('dice-2').style.display = 'block';        
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';  // Selectează poza care corespunde valorii zarului
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        // Resetează scorul total la 0 dacă ambele zaruri sunt 1 şi încheie tura jucătorului
        if(dice1 === 1 && dice2 === 1) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        // Adaugă valoarea zarurilor la scorul curent şi afişează-l dacă nu s-a dat nici un 1
        } else if (dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();   // Următorul (dacă s-a dat 1)
        }
    }    
});
// Dacă butonul Hold e apăsat atunci updatează scorul şi UI, verifică dacă a câştigat
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {   // Verifică dacă jocul e activ
        // Adaugă scorul curent la scorul global
        scores[activePlayer] += roundScore;

        // Updatează scorul global pentru jucătorul activ
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Verifică dacă jucătorul a câştigat, schimbă numele cu Winner şi dezactivează-l
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none'; // Zarurile devin invizibile
            document.getElementById('dice-2').style.display = 'none'; 
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
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
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

    document.getElementById('dice-1').style.display = 'none';     // ascunde zarurile
    document.getElementById('dice-2').style.display = 'none';

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