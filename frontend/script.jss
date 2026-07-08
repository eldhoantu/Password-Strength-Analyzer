const analyzeBtn = document.getElementById("analyzeBtn");
const passwordInput = document.getElementById("passwordInput");
const strengthText = document.getElementById("strengthText");
const strengthBar = document.getElementById("strengthBar");
const suggestions = document.getElementById("suggestions");

analyzeBtn.addEventListener("click", async () => {

    const password = passwordInput.value;

    const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password: password
        })
    });

    const data = await response.json();

    strengthText.textContent =
        `Strength: ${data.strength}`;

    suggestions.innerHTML = "";

    data.suggestions.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        suggestions.appendChild(li);
    });

    if (data.score <= 2) {
        strengthBar.style.width = "30%";
        strengthBar.style.backgroundColor = "red";
    }
    else if (data.score === 3) {
        strengthBar.style.width = "60%";
        strengthBar.style.backgroundColor = "gold";
    }
    else {
        strengthBar.style.width = "100%";
        strengthBar.style.backgroundColor = "green";
    }
});