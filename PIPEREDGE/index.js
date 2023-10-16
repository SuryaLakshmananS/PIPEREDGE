const discountData = [
    ['Vendor', 'Trade A', 'Trade B', 'Trade C', 'Trade D'],
        ['Vendor1', 12, 12,'NA',6],
        ['Vendor2', 10, 8, 20, 'N/A'],
        ['Vendor3', 'N/A',25, 3, 16,],
        ['Vendor4', 9,' N/A',16, 30],
        ['Vendor5', 5, 11, 'N/A', 30,]
  ];
  
  const productData = [
    ['Product Name', 'Price', 'Cart',],
        ['Test Product', 125, 'Add To Cart'],
        ['Test Product 2', 42.5, 'Add To Cart'],
        ['Test Product 3', 200, 'Add To Cart'],
        ['Test Product 4', 525, 'Add To Cart']
  ];
  
  const shoppingCartData = [
    ['DiscountPercentage', 'Product Name', 'Org Price', 'Discounted Price', 'Vendor', 'Remove Cart'],
    [10, 'Test Product 25', 67, 46.90, 'Vendor 5', 'Remove Cart'],
    [19, 'Test Product 24', 5845, 549.43, 'Vendor 1', 'Remove Cart']

  ];
  
  let totalPrice = 0;
  
  function generateTable(tableId, data) {
    const table = document.getElementById(tableId);
    data.forEach((rowData, rowIndex) => {
      const row = table.insertRow();
      rowData.forEach((cellData, cellIndex) => {
        const cell = row.insertCell();
        if (cellIndex === 2 && rowIndex !== 0) {
          const button = document.createElement('button');
          button.innerText = cellData;
          button.addEventListener('click', () => addToCart(productData[rowIndex][0], productData[rowIndex][1]));
          cell.appendChild(button);
        } else if (tableId !== 'discount-table' && cellIndex === 5 && rowIndex !== 0) {
          const removeButton = document.createElement('button');
          removeButton.innerText = 'Remove Cart';
          removeButton.addEventListener('click', () => removeFromCart(rowData[1], rowData[3]));
          cell.appendChild(removeButton);
        } else {
          cell.innerText = cellData;
        }
      });
    });
  }
  
  function addToCart(productName, price) {
    const cartTable = document.getElementById('shopping-cart');
    const newRow = cartTable.insertRow();
    newRow.innerHTML = `<td>10</td><td>${productName}</td><td>${price}</td><td>${(price * 0.1).toFixed(2)}</td><td>Vendor 1</td><td><button onclick="removeFromCart('${productName}', ${price})">Remove Cart</button></td>`;
    totalPrice += price;
    updateTotalPrice();
  }
  
  function removeFromCart(productName, price) {
    const cartTable = document.getElementById('shopping-cart');
    const rows = cartTable.getElementsByTagName('tr');
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName('td');
      if (cells[1].innerText === productName) {
        cartTable.deleteRow(i);
        totalPrice -= price;
        updateTotalPrice();
        break;
      }
    }
  }
  
  function updateTotalPrice() {
    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.innerText = `Total Price: Rs. ${totalPrice.toFixed(2)}`;
  }
  
  generateTable('product-table', productData);
  generateTable('shopping-cart', shoppingCartData);
  generateTable('discount-table', discountData);
  const totalPriceDiv = document.createElement('div');
  totalPriceDiv.id = 'total-price';
  totalPriceDiv.innerText = 'Total Price: Rs. 0.00';
  document.body.appendChild(totalPriceDiv);
  