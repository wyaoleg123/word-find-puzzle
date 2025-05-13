
let startTime = Date.now();
let solvingTimer;
let submissionDeadlineKey = "wordFindDeadline";
let submissionMadeKey = "wordFindSubmitted";

// Track solving time
function updateSolvingTime() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById("timeSpent").innerText = elapsed;
}
solvingTimer = setInterval(updateSolvingTime, 1000);

// 72-hour deadline timer
function setDeadline() {
    if (!localStorage.getItem(submissionDeadlineKey)) {
        const deadline = Date.now() + 72 * 60 * 60 * 1000;
        localStorage.setItem(submissionDeadlineKey, deadline.toString());
    }
}
setDeadline();

function updateTimeLeft() {
    const deadline = parseInt(localStorage.getItem(submissionDeadlineKey));
    const now = Date.now();
    let diff = deadline - now;
    if (diff <= 0) {
        document.getElementById("timeLeft").innerText = "Time's up!";
        document.getElementById("puzzleForm").style.display = "none";
        clearInterval(solvingTimer);
    } else {
        let hrs = Math.floor(diff / (1000 * 60 * 60));
        let mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let secs = Math.floor((diff % (1000 * 60)) / 1000);
        document.getElementById("timeLeft").innerText = `${hrs}h ${mins}m ${secs}s`;
    }
}
setInterval(updateTimeLeft, 1000);

// Submission handling
document.getElementById("puzzleForm").addEventListener("submit", function(e) {
    e.preventDefault();
    if (localStorage.getItem(submissionMadeKey)) {
        alert("You've already submitted.");
        return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const words = document.getElementById("words").value.trim();
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    const entry = {
        name,
        email,
        words,
        timeSpent,
        submittedAt: new Date().toISOString()
    };

    localStorage.setItem("wordFindEntry", JSON.stringify(entry));
    localStorage.setItem(submissionMadeKey, "true");

    document.getElementById("puzzleForm").style.display = "none";
    document.getElementById("confirmation").style.display = "block";
});
