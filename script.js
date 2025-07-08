console.log("script.js loaded and executing!");

let cardPrizeMap = {};

// Fetch and parse the new CSV file on page load
function loadCardPrizes() {
    Papa.parse('Final_Prize_Cards_CSV.csv', {
        download: true,
        header: true, // The new CSV has a header row
        complete: function(results) {
            // results.data is an array of objects: [{CardNumber, Prize}, ...]
            results.data.forEach(row => {
                const code = row.CardNumber && row.CardNumber.trim();
                const prize = row.Prize && row.Prize.trim();
                if (code && prize) {
                    cardPrizeMap[code] = prize;
                }
            });
            console.log('Loaded card prizes:', Object.keys(cardPrizeMap).length);
        },
        error: function(err) {
            console.error('Failed to load Final_Prize_Cards_CSV.csv:', err);
        }
    });
}

// Prize icon mapping
const prizeIcons = {
    "هدية فورية": "fa-gift",
    "دورة مهارات الحاسوب": "fa-laptop-code",
    "دورة لغة انجليزية": "fa-language",
    "جلسة تصوير": "fa-camera",
    "خدمة تجميل": "fa-spa",
    "2 بسعر 1 للدورات القصيرة": "fa-tags",
    "خصم الأصحاب": "fa-users",
    "سحب على الجائزة الكبرى": "fa-trophy",
    "لقاء مجاني لبرنامج من اختيارك": "fa-handshake",
    "خصم 5%": "fa-percent",
    "خصم 8%": "fa-percent",
    "خصم المسجلين المبكرين 10%": "fa-bolt"
};

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM content loaded!");
    loadCardPrizes();
    const cardInput = document.getElementById("cardNumber");
    const checkButton = document.getElementById("checkButton");
    const prizeResultDiv = document.getElementById("prizeResult");
    const prizeDescription = document.getElementById("prizeDescription");
    const prizeIcon = document.getElementById("prizeIcon");
    const errorMessageDiv = document.getElementById("errorMessage");
    const loadingMessageDiv = document.getElementById("loadingMessage");

    if (checkButton) {
        checkButton.addEventListener("click", () => {
            const cardNumber = cardInput.value.trim();
            // Hide previous messages/results
            errorMessageDiv.style.display = "none";
            prizeResultDiv.style.display = "none";
            // Show loading
            loadingMessageDiv.style.display = "block";
            setTimeout(() => {
                loadingMessageDiv.style.display = "none";
                if (cardPrizeMap[cardNumber]) {
                    const prize = cardPrizeMap[cardNumber];
                    prizeDescription.textContent = prize;
                    // Set icon based on prize
                    const iconClass = prizeIcons[prize] || "fa-gift";
                    prizeIcon.className = `fas ${iconClass}`;
                    prizeResultDiv.style.display = "block";
                    errorMessageDiv.style.display = "none";
                    // Confetti burst for celebration
                    if (window.confetti) {
                        confetti({
                            particleCount: 120,
                            spread: 80,
                            origin: { y: 0.6 }
                        });
                    }
                } else {
                    errorMessageDiv.textContent = "رقم البطاقة غير صحيح أو غير موجود";
                    errorMessageDiv.style.display = "block";
                    prizeResultDiv.style.display = "none";
                }
            }, 1500); // 1.5 seconds loading
        });
    } else {
        console.error("Check button not found!");
    }
});


