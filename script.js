const dataContainer = document.getElementById('data-container');
const gridViewButton = document.getElementById('grid-view');
const listViewButton = document.getElementById('list-view');

const fetchData = async () => {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
    );
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const displayGridView = (data) => {
  dataContainer.innerHTML = '';
  data.forEach((coin) => {
    const card = `
      <div class="card">
        <img src="${coin.image}" alt="${coin.name}">
        <h2>${coin.name}</h2>
        <p>Current Price: $${coin.current_price}</p>
        <p>Market Cap: $${coin.market_cap}</p>
        <p class="price-change ${coin.price_change_percentage_24h < 0 ? 'negative' : ''}">
          24h Price Change: ${coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
    `;
    dataContainer.insertAdjacentHTML('beforeend', card);
  });
};

const displayListView = (data) => {
  dataContainer.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Current Price</th>
          <th>Market Cap</th>
          <th>24h Price Change</th>
        </tr>
      </thead>
      <tbody>
        ${data
          .map(
            (coin) => `
            <tr>
              <td><img src="${coin.image}" alt="${coin.name}" width="30"></td>
              <td>${coin.name}</td>
              <td>$${coin.current_price}</td>
              <td>$${coin.market_cap}</td>
              <td class="price-change ${coin.price_change_percentage_24h < 0 ? 'negative' : ''}">
                ${coin.price_change_percentage_24h.toFixed(2)}%
              </td>
            </tr>
          `
          )
          .join('')}
      </tbody>
    </table>
  `;
};

document.addEventListener('DOMContentLoaded', async () => {
  const data = await fetchData();
  displayGridView(data);

  gridViewButton.addEventListener('click', () => {
    gridViewButton.classList.add('active');
    listViewButton.classList.remove('active');
    displayGridView(data);
  });

  listViewButton.addEventListener('click', () => {
    listViewButton.classList.add('active');
    gridViewButton.classList.remove('active');
    displayListView(data);
  });
});
