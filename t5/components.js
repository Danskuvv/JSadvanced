'use strict';

const restaurantRow = restaurant => {
  const {name, company} = restaurant;
  const trElem = document.createElement('tr');
  trElem.innerHTML = `
  <td>${name}</td>
  <td>${company}</td>
  `;

  return trElem;
};

const restaurantModal = (restaurant, menu) => {
  const {name, address, postalCode, company, city, phone} = restaurant;
  const {courses} = menu;
  let menuHtml = '';

  courses.forEach(course => {
    const {name: courseName, diets, price} = course;
    menuHtml += `
      <tr>
        <td>${courseName}</td>
        <td>${diets || ' - '}</td>
        <td>${price || ' - '}</td>
      </tr>
    `;
  });

  const html = `
    <h3>${name}</h3>
    <p>${company}</p>
    <p>${address} ${postalCode} ${city}</p>
    <p>${phone}</p>
    <table>
      <tr>
        <th>Course</th>
        <th>Diet</th>
        <th>Price</th>
      </tr>
      ${menuHtml}
    </table>
  `;

  return html;
};
export {restaurantModal, restaurantRow};
