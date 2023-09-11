'use strict';
import {restaurantModal, restaurantRow} from './components.js';
import {apiUrl} from './variables.js';
import {fetchData} from './utils.js';

const modal = document.querySelector('dialog');
// arrow function 1 //
modal.addEventListener('click', () => {
  modal.close();
});

const positionOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
//___________________________________________________________________________//

//_________________________________________________________________________________________//
// arrow function 3 //
const calculateDistance = (x1, y1, x2, y2) => {
  const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  return distance;
};

// arrow function 4 //
const error = err => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

// arrow function 5 //
const success = async pos => {
  try {
    const crd = pos.coords;
    const restaurants = await fetchData(apiUrl + '/restaurants');
    console.log(restaurants);
    // arrow function 6 //
    restaurants.sort((a, b) => {
      const x1 = crd.latitude;
      const y1 = crd.longitude;
      const x2a = a.location.coordinates[1];
      const y2a = a.location.coordinates[0];
      const distanceA = calculateDistance(x1, y1, x2a, y2a);
      const x2b = b.location.coordinates[1];
      const y2b = b.location.coordinates[0];
      const distanceB = calculateDistance(x1, y1, x2b, y2b);
      return distanceA - distanceB;
    });

    //_______________filter____________________//

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
        tr.addEventListener('click', async () => {
          try {
            // remove all highlights
            const allHighs = document.querySelectorAll('.highlight');
            allHighs.forEach(high => {
              high.classList.remove('highlight');
            });

            tr.classList.add('highlight');

            const menu = await fetchData(
              apiUrl + `/restaurants/daily/${restaurant._id}/fi`
            );
            console.log(menu);
            modal.innerHTML = '';
            modal.innerHTML = restaurantModal(restaurant, menu);

            modal.showModal();
          } catch (error) {
            alert(error.message);
          }
        });
      });
    }

    // Initial call to applyFilters to show all restaurants
    applyFilters();

    //_______________filter____________________//

    restaurants.map(restaurant => {
      const tr = restaurantRow(restaurant);
      document.querySelector('table').appendChild(tr);
      // arrow function 7 //
      tr.addEventListener('click', async () => {
        try {
          // remove all highlights
          const allHighs = document.querySelectorAll('.highlight');
          allHighs.forEach(high => {
            high.classList.remove('highlight');
          });

          tr.classList.add('highlight');

          const menu = await fetchData(
            apiUrl + `/restaurants/daily/${restaurant._id}/fi`
          );
          console.log(menu);
          modal.innerHTML = '';
          modal.innerHTML = restaurantModal(restaurant, menu);

          modal.showModal();
        } catch (error) {
          alert(error.message);
        }
      });
    });
  } catch (error) {
    alert(error.message);
  }
};

navigator.geolocation.getCurrentPosition(success, error, positionOptions);
