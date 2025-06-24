function loadHeader(currentPage) {
    let headerHTML = `
        <header>
            <div >
                <h1>Добро пожаловать на horns and hooves!</h1>
                <nav>
                    <ul>
                        <li><a href="index.html">Оглавление</a></li>
                        <li><a href="./001_Greenery on the Balcony.html">Зелень</a></li>
                        <li><a href="./002_mushrooms.html">Грибы</a></li>
                        <li><a href="contact.html">Контакты</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    `;

    // Создаем временный элемент div, чтобы манипулировать DOM строкой
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = headerHTML;

    // Находим все ссылки внутри навигации
    const navLinks = tempDiv.querySelectorAll('nav ul li a');

    // Проходим по каждой ссылке и добавляем класс 'active' при совпадении
    navLinks.forEach(link => {
        // Получаем имя файла из атрибута href (например, "index.html", "page1.html")
        const linkFileName = link.getAttribute('href');
        
        // Сравниваем с текущей страницей
        if (linkFileName === currentPage) {
            link.classList.add('active');
        }
    });

    // Находим элемент <main> в реальном DOM
    const mainElement = document.querySelector('main');

    // Если элемент <main> найден, вставляем собранный HTML шапки перед ним
    if (mainElement) {
        // Получаем сам элемент header из временного div
        const actualHeaderElement = tempDiv.firstElementChild; 
        mainElement.insertAdjacentElement('beforebegin', actualHeaderElement);
    }
}