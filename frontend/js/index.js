document.addEventListener('DOMContentLoaded', () => {
    const headers = getAuthHeaders('application/json');
  
    // User Enrollment
    document.getElementById('enrollForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const resultEl = document.getElementById('enrollResult');
      const data = {
        national_id: document.getElementById('national_id').value.trim(),
        dob: document.getElementById('dob').value,
        password: document.getElementById('password').value
      };
  
      try {
        const res = await fetch('/api/users/enroll', {
          method: 'POST',
          headers,
          body: JSON.stringify(data)
        });
        const json = await res.json();
        resultEl.innerText = json.prs_id
          ? `✅ Enrollment successful! PRS-ID: ${json.prs_id}`
          : `❌ ${json.message || 'Enrollment failed.'}`;
        if (json.prs_id) e.target.reset();
      } catch (err) {
        resultEl.innerText = '❌ Network error during enrollment.';
      }
    });
  
    // Vaccination JSON Upload
    document.getElementById('vaccineForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const resultEl = document.getElementById('vaccineResult');
      const file = document.getElementById('vaccineFile').files[0];
  
      if (!file || file.type !== 'application/json') {
        resultEl.innerText = '❌ Please upload a valid .json file.';
        return;
      }
  
      try {
        const data = JSON.parse(await file.text());
        const res = await fetch('/api/vaccinations/upload-json', {
          method: 'POST',
          headers,
          body: JSON.stringify(data)
        });
        const json = await res.json();
        resultEl.innerText = json.saved
          ? `✅ Records saved: ${json.saved}`
          : `❌ ${json.message || 'Upload failed'}`;
        if (json.saved) e.target.reset();
      } catch {
        resultEl.innerText = '❌ Error reading JSON or server error.';
      }
    });
  
    // Vaccination Certificate Upload (PDF)
    document.getElementById('certForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const resultEl = document.getElementById('certResult');
      const file = document.getElementById('certFile').files[0];
  
      if (!file || file.type !== 'application/pdf') {
        resultEl.innerText = '❌ Please upload a valid PDF.';
        return;
      }
  
      try {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/vaccinations/upload-certificate', {
          method: 'POST',
          body: formData
        });
        const json = await res.json();
        resultEl.innerText = json.filename
          ? `✅ PDF uploaded: ${json.filename}`
          : `❌ ${json.message || 'Upload failed'}`;
        if (json.filename) e.target.reset();
      } catch {
        resultEl.innerText = '❌ Network error during upload.';
      }
    });
  
    // Merchant Stock Update
    document.getElementById('stockForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const resultEl = document.getElementById('stockResult');
      const data = {
        merchant_id: document.getElementById('merchant_id').value.trim(),
        item_name: document.getElementById('item_name').value.trim(),
        quantity: parseInt(document.getElementById('quantity').value, 10)
      };
  
      if (!data.merchant_id || !data.item_name || isNaN(data.quantity) || data.quantity < 0) {
        resultEl.innerText = '❌ Please enter valid merchant, item, and quantity.';
        return;
      }
  
      try {
        const res = await fetch('/api/merchants/update-stock', {
          method: 'POST',
          headers,
          body: JSON.stringify(data)
        });
        const json = await res.json();
        resultEl.innerText = json.stock_id
          ? `✅ Stock updated! ID: ${json.stock_id}`
          : `❌ ${json.message || 'Update failed'}`;
        if (json.stock_id) e.target.reset();
      } catch {
        resultEl.innerText = '❌ Network error during stock update.';
      }
    });
  
    // Stock Locator
    document.getElementById('locatorForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const resultEl = document.getElementById('locatorResult');
      const item = document.getElementById('item_query').value.trim();
  
      if (!item) {
        resultEl.innerText = '❌ Please enter an item name.';
        return;
      }
  
      try {
        const res = await fetch(`/api/stock/locator?item=${encodeURIComponent(item)}`);
        const json = await res.json();
        resultEl.innerText = json.stocks?.length
          ? json.stocks.map(s => `• Merchant ${s.merchant_id}: ${s.quantity}`).join('\n')
          : 'No stock found';
        e.target.reset();
      } catch {
        resultEl.innerText = '❌ Network error while locating stock.';
      }
    });
  });
  