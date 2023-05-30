function calculate() {
  var investmentInput = document.getElementById('investment');
  var interestInput = document.getElementById('interest');
  var periodSelect = document.getElementById('period');
  var loader = document.getElementById('loader');
  var resultTable = document.getElementById('resultTable');

  var investment = parseFloat(investmentInput.value);
  var interest = parseFloat(interestInput.value);
  var period = periodSelect.value;

  if (isNaN(investment) || isNaN(interest) || investment <= 0 || interest <= 0) {
    alert('Пожалуйста, введите корректные значения для суммы инвестиции и процента доходности.');
    return;
  }

  loader.classList.remove('hidden');
  resultTable.classList.add('hidden');

  setTimeout(function() {
    resultTable.innerHTML = '<tr><th>Период</th><th>Доход</th><th>Баланс</th></tr>'; // Очистить таблицу перед расчетом

    var balance = investment;
    var periodLabel, periodCount;

    if (period === 'daily') {
      periodLabel = 'День';
      periodCount = 30;
    } else if (period === 'weekly') {
      periodLabel = 'Неделя';
      periodCount = 4;
    } else if (period === 'monthly') {
      periodLabel = 'Месяц';
      periodCount = 1;
    }

    for (var i = 1; i <= periodCount; i++) {
      var income = balance * (interest / 100);
      balance += income;

      var row = document.createElement('tr');
      var periodCell = document.createElement('td');
      periodCell.textContent = periodLabel + ' ' + i;
      var incomeCell = document.createElement('td');
      incomeCell.textContent = income.toFixed(2);
      var balanceCell = document.createElement('td');
      balanceCell.textContent = balance.toFixed(2);

      row.appendChild(periodCell);
      row.appendChild(incomeCell);
      row.appendChild(balanceCell);
      resultTable.appendChild(row);
    }

    loader.classList.add('hidden');
    resultTable.classList.remove('hidden');
  }, 2000);
}
