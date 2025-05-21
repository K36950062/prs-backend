document.addEventListener('DOMContentLoaded', () => {
    const headers = getAuthHeaders('application/json');
  
    async function loadStock() {
      const tbody = document.getElementById('stockRows');
      try {
        const res = await fetch('/api/merchants/stock', { headers });
        const data = await res.json();
  
        if (!data.stocks || !data.stocks.length) {
          tbody.innerHTML = '<tr><td colspan="3">No stock available</td></tr>';
          return;
        }
  
        tbody.innerHTML = data.stocks.map(s => `
          <tr>
            <td>${s.item_name}</td>
            <td>${s.quantity}</td>
            <td>${new Date(s.last_updated).toLocaleString()}</td>
          </tr>
        `).join('');
      } catch {
        tbody.innerHTML = '<tr><td colspan="3">❌ Error loading stock data</td></tr>';
      }
    }
  
    document.getElementById('mq_upd').addEventListener('click', async () => {
      const resultEl = document.getElementById('mq_result');
      const item = document.getElementById('mq_item').value.trim();
      const qty = parseInt(document.getElementById('mq_qty').value, 10);
  
      if (!item || isNaN(qty) || qty < 0) {
        resultEl.innerText = '❌ Enter a valid item and quantity.';
        return;
      }
  
      const data = {
        merchant_id: null, // inferred from token
        item_name: item,
        quantity: qty
      };
  
      try {
        const res = await fetch('/api/merchants/update-stock', {
          method: 'POST',
          headers,
          body: JSON.stringify(data)
        });
        const json = await res.json();
        resultEl.innerText = json.stock_id
          ? `✅ Updated Stock ID: ${json.stock_id}`
          : `❌ ${json.message || 'Update failed'}`;
        if (json.stock_id) {
          document.getElementById('mq_item').value = '';
          document.getElementById('mq_qty').value = '';
          loadStock();
        }
      } catch {
        resultEl.innerText = '❌ Network error during stock update.';
      }
    });
  
    // Initial stock load
    loadStock();
  });
  