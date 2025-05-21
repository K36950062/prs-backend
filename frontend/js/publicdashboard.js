document.addEventListener('DOMContentLoaded', () => {
    const headers = getAuthHeaders();
  
    // Load User Profile
    async function loadProfile() {
      try {
        const res = await fetch('/api/users/me', { headers });
        const json = await res.json();
        document.getElementById('prsId').innerText = json.prs_id || json.user_id || 'Unknown';
      } catch {
        document.getElementById('prsId').innerText = '❌ Error loading profile.';
      }
    }
  
    // Load Vaccination Records
    async function loadVaccinations() {
      const list = document.getElementById('vaccList');
      try {
        const res = await fetch('/api/vaccinations/list', { headers });
        const json = await res.json();
  
        if (!json.length) {
          list.innerHTML = '<li>No vaccination records found.</li>';
          return;
        }
  
        list.innerHTML = json.map(v =>
          `<li>${v.vaccine_name} @ ${new Date(v.date_administered).toLocaleDateString()}</li>`
        ).join('');
      } catch {
        list.innerHTML = '<li>❌ Failed to load vaccinations.</li>';
      }
    }
  
    // Stock Locator
    document.getElementById('findBtn').addEventListener('click', async () => {
      const item = document.getElementById('publicItem').value.trim();
      const resultEl = document.getElementById('publicLocatorResult');
  
      if (!item) {
        resultEl.innerText = '❌ Please enter an item name.';
        return;
      }
  
      try {
        const res = await fetch(`/api/stock/locator?item=${encodeURIComponent(item)}`, { headers });
        const json = await res.json();
  
        resultEl.innerText = json.stocks?.length
          ? json.stocks.map(s => `• Merchant ${s.merchant_id}: ${s.quantity}`).join('\n')
          : 'No stock available';
      } catch {
        resultEl.innerText = '❌ Error locating stock.';
      }
    });
  
    // Load user data on page load
    loadProfile();
    loadVaccinations();
  });
  