// This file contains alternate ways of doing the filtering. I ended up using the 3rd with checkboxes //

//FILTER 1//

const filterInput = document.getElementById('namefilter');
filterInput.addEventListener('input', () => {
  const filterText = filterInput.value.toLowerCase();
  // Call a function to filter and update the restaurant list based on filterText
  filterRestaurantList(filterText);
});

// Function to filter and update the restaurant list
const filterRestaurantList = filterText => {
  const restaurantRows = document.querySelectorAll(
    'table tr:not(:first-child)'
  );

  restaurantRows.forEach(row => {
    const restaurantName = row
      .querySelector('td:nth-child(2)')
      .textContent.toLowerCase();

    if (restaurantName.includes(filterText)) {
      row.style.display = ''; // Show the row if it matches the filter
    } else {
      row.style.display = 'none'; // Hide the row if it doesn't match the filter
    }
  });
};

//____FILTER 2__USING .FILTER()____//

// Select the input element
const searchInput = document.getElementById('namefilter');

// Event listener for input changes
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.trim(); // Get the trimmed search term

  // Filter the restaurants based on the search term
  const filteredRestaurants = restaurants.filter(restaurant => {
    const restaurantName = restaurant.company.toLowerCase(); // Assuming 'name' is the property you want to search
    return restaurantName.includes(searchTerm.toLowerCase());
  });

  // Clear the existing restaurant list
  const restaurantTable = document.querySelector('tr');
  restaurantTable.innerHTML = '';

  // Append the filtered restaurants to the table
  filteredRestaurants.forEach(restaurant => {
    const tr = restaurantRow(restaurant);
    restaurantTable.appendChild(tr);
  });
});
//_______________filter____________________//

//____________________FILTER 3_________________//

const option1Checkbox = document.getElementById('option1');
const option2Checkbox = document.getElementById('option2');

option1Checkbox.addEventListener('change', applyFilters);
option2Checkbox.addEventListener('change', applyFilters);

function applyFilters() {
  // Get the current state of the checkboxes
  const option1Checked = option1Checkbox.checked;
  const option2Checked = option2Checkbox.checked;

  // Filter the restaurants based on the selected options
  const filteredRestaurants = restaurants.filter(restaurant => {
    if (option1Checked && option2Checked) {
      // Both checkboxes are checked, no filtering needed
      return true;
    } else if (option1Checked) {
      const restaurantName = restaurant.company.toLowerCase();
      return restaurantName.includes('sodexo'.toLowerCase());
    } else if (option2Checked) {
      const restaurantName = restaurant.company.toLowerCase();
      return restaurantName.includes('Compass Group'.toLowerCase());
    }
    // If neither checkbox is checked, show all restaurants
    return true;
  });

  // Clear the existing restaurant list
  const restaurantTable = document.querySelector('table');
  restaurantTable.innerHTML = '';

  // Append the filtered restaurants to the table
  filteredRestaurants.forEach(restaurant => {
    const tr = restaurantRow(restaurant);
    restaurantTable.appendChild(tr);
  });
}

// Initial call to applyFilters to show all restaurants
applyFilters();
