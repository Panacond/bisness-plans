document.addEventListener('DOMContentLoaded', function () {
    const footerHTML = `
        <footer>
            <div>
                <p>&copy; 2025 horns and hooves. Это не все идеи, а только начало</p>
            </div>
        </footer>
    `;

    // Находим элемент <main>
    const mainElement = document.querySelector('main');

    // Если элемент <main> найден, вставляем футер после него
    if (mainElement) {
        mainElement.insertAdjacentHTML('afterend', footerHTML);
    }
});