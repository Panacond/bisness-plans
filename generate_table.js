function toggleContent(headerElement) {
    // Находим родительский .collapsible-section
    const section = headerElement.closest(".collapsible-section");
    const content = section.querySelector(".collapsible-content");
    const arrowButton = headerElement.querySelector(
      ".collapsible-arrow-button"
    );
    const bottomButton = content.querySelector(".bottom-collapse-button"); // Находим нижнюю кнопку

    if (content.classList.contains("expanded")) {
      // Если развернуто, сворачиваем
      content.classList.remove("expanded");
      arrowButton.innerHTML = "&#x25BC;"; // Стрелка вниз
      arrowButton.setAttribute("aria-expanded", "false");
      bottomButton.style.display = "none"; // Скрываем нижнюю кнопку
    } else {
      // Если свернуто, разворачиваем
      content.classList.add("expanded");
      arrowButton.innerHTML = "&#x25B2;"; // Стрелка вверх
      arrowButton.setAttribute("aria-expanded", "true");
      // Даем анимации завершиться, прежде чем показать нижнюю кнопку,
      // чтобы она не появлялась резко в процессе раскрытия.
      // Можно и сразу показать, если анимация не критична.
      setTimeout(() => {
        bottomButton.style.display = "block";
      }, 300); // Соответствует времени transition для max-height
    }
  }

  // Функция для сворачивания контента (используется для нижней кнопки)
  function collapseContent(sectionElement) {
    const content = sectionElement.querySelector(".collapsible-content");
    const arrowButton = sectionElement.querySelector(
      ".collapsible-arrow-button"
    );
    const bottomButton = content.querySelector(".bottom-collapse-button");

    content.classList.remove("expanded");
    arrowButton.innerHTML = "&#x25BC;"; // Стрелка вниз
    arrowButton.setAttribute("aria-expanded", "false");
    bottomButton.style.display = "none"; // Скрываем нижнюю кнопку
  }
  // Функция для создания таблицы из массива данных
  function createTable(data, title, containerId, headingId) {
    const container = document.getElementById(containerId);
    const heading = document.getElementById(headingId);

    if (heading) {
      heading.textContent = title;
    }

    let tableHTML = `
                  <table>
                      <thead>
                          <tr>
                              <th>Описание</th>
                              <th>Ресурсы гр.</th>
                              <th>Время ч.</th>
                              <th>Рабочий чел./час</th>
                          </tr>
                      </thead>
                      <tbody>
              `;
    let totalprice = 0;
    let totaltime = 0;
    let totalwork = 0;

    data.forEach((item) => {
      tableHTML += `
                      <tr>
                          <td data-label="Описание">${item.description}</td>
                          <td data-label="Ресурсы гр.">${item.price}</td>
                          <td data-label="Время ч.">${item.time}</td>
                          <td data-label="Работа гр./ч.">${item.worker}</td>
                      </tr>
                  `;
      totalprice += item.price;
      totaltime += item.time;
      totalwork += item.time * item.worker;
    });

    tableHTML += `
                      <tr class="total-row">
                          <td data-label="Описание"><strong>Сумма:</strong></td>
                          <td data-label="Ресурсы"><strong>${totalprice}</strong></td>
                          <td data-label="Время"><strong>${totaltime}</strong></td>
                          <td data-label="Труд"><strong>${totalwork}</strong></td>
                      </tr>
                      </tbody>
                  </table>
              `;
    container.innerHTML = tableHTML;
    return { totalprice: totalprice, totaltime: totaltime, totalwork: totalwork }; // Возвращаем сумму для сводной таблицы
  }

  function createTableIncome(data, title, containerId, headingId) {
    const container = document.getElementById(containerId);
    const heading = document.getElementById(headingId);

    if (heading) {
      heading.textContent = title;
    }

    let tableHTML = `
                  <table>
                      <thead>
                          <tr>
                              <th>Описание</th>
                              <th>Ресурсы гр.</th>
                          </tr>
                      </thead>
                      <tbody>
              `;
    let totalprice = 0;
    let totaltime = 0;
    let totalwork = 0;

    data.forEach((item) => {
      tableHTML += `
                      <tr>
                          <td data-label="Описание">${item.description}</td>
                          <td data-label="Ресурсы">${item.price}</td>
                      </tr>
                  `;
      totalprice += item.price;
      totaltime += item.time;
      totalwork += item.time * item.worker;
    });

    tableHTML += `
                      <tr class="total-row">
                          <td data-label="Описание"><strong>Сумма:</strong></td>
                          <td data-label="Ресурсы"><strong>${totalprice}</strong></td>
                      </tr>
                      </tbody>
                  </table>
              `;
    container.innerHTML = tableHTML;
    return totalprice; // Возвращаем сумму для сводной таблицы
  }

  // Генерируем таблицы и получаем их суммы
  const totalStart = createTable(
    start,
    "Стартовые инвестиции",
    "start-table-container",
    "start-heading"
  );
  const totalCost = createTable(
    cost,
    "Ежемесячные операционные расходы",
    "cost-table-container",
    "cost-heading"
  );
  const totalIncome = createTableIncome(
    income,
    "Прогнозируемые доходы",
    "income-table-container",
    "income-heading"
  );

  // Создаем данные для сводной таблицы
  const summaryData = [
    { description: "Стартовые инвестиции", price: totalStart.totalprice },
    { description: "Время на развитие", price: totalStart.totaltime },
    { description: "Трудовые затраты на развитие", price: totalStart.totalwork },
    { description: "Общие затраты на развитие", price: totalStart.totalwork + totalStart.totalprice },
    { description: " ", price: ' ' },

    { description: "Ежемесячные операционные расходы", price: totalCost.totalprice },
    { description: "Ежемесячное время", price: totalCost.totaltime },
    { description: "Трудовые затраты ежемесячные", price: totalCost.totalwork },
    { description: "Общие затраты на поддержание", price: totalCost.totalwork + totalCost.totalprice },
    { description: " ", price: ' ' },


    { description: "Прогнозируемые доходы", price: totalIncome },
    {
      description: "Рентабельность: Прибыль = Доходы - Расходы",
      price: totalIncome - totalCost.totalprice,
    },
    {
      description: "Рентабельность с учетом работы: Прибыль = Доходы - Расходы",
      price: totalIncome - totalCost.totalprice - totalCost.totalwork,
    },

  ];

  // Функция для создания сводной таблицы
  function createSummaryTable(data, containerId) {
    const container = document.getElementById(containerId);
    let tableHTML = `
                  <table>
                      <thead>
                          <tr>
                              <th>Категория</th>
                              <th>Сумма</th>
                          </tr>
                      </thead>
                      <tbody>
              `;

    data.forEach((item) => {
      tableHTML += `
                      <tr>
                          <td data-label="Категория">${item.description}</td>
                          <td data-label="Сумма">${item.price}</td>
                      </tr>
                  `;
    });

    tableHTML += `
                      </tbody>
                  </table>
              `;
    container.innerHTML = tableHTML;
  }

  // Генерируем сводную таблицу
  createSummaryTable(summaryData, "summary-table-container");