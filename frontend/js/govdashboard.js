document.addEventListener('DOMContentLoaded', () => {
    const headers = getAuthHeaders('application/json');
  
    // Load Global Vaccination Stats
    async function loadStats() {
      try {
        const res = await fetch('/api/vaccinations/stats', { headers });
        const json = await res.json();
        document.getElementById('totalVacc').innerText = json.total ?? '0';
        document.getElementById('uniqueUsers').innerText = json.unique ?? '0';
      } catch {
        document.getElementById('totalVacc').innerText = '❌ Error';
        document.getElementById('uniqueUsers').innerText = '❌ Error';
      }
    }
  
    // Generic loader for JSON display
    async function loadSection(endpoint, elementId, key) {
      try {
        const res = await fetch(endpoint, { headers });
        const json = await res.json();
        document.getElementById(elementId).innerText =
          json[key]?.length || Object.keys(json[key] || {}).length
            ? JSON.stringify(json[key], null, 2)
            : 'No data available';
      } catch {
        document.getElementById(elementId).innerText = '❌ Failed to load data.';
      }
    }
  
    // FHIR JSON Upload
    document.getElementById('govUploadBtn').addEventListener('click', async () => {
      const file = document.getElementById('govVaccineFile').files[0];
      const resultEl = document.getElementById('govUploadResult');
  
      if (!file || file.type !== 'application/json') {
        resultEl.innerText = '❌ Please upload a valid .json file.';
        return;
      }
  
      try {
        const text = await file.text();
        const data = JSON.parse(text);
  
        const res = await fetch('/api/vaccinations/upload-json', {
          method: 'POST',
          headers,
          body: JSON.stringify(data)
        });
  
        const json = await res.json();
        resultEl.innerText = json.saved
          ? `✅ Records saved: ${json.saved}`
          : `❌ ${json.message || 'Upload failed'}`;
      } catch {
        resultEl.innerText = '❌ Error reading file or contacting server.';
      }
    });
  
    // Register Merchant
    document.getElementById('gm_register').addEventListener('click', async () => {
      const name = document.getElementById('gm_name').value.trim();
      const license = document.getElementById('gm_license').value.trim();
      const address = document.getElementById('gm_address').value.trim();
      const resultEl = document.getElementById('gm_result');
  
      if (!name || !license || !address) {
        resultEl.innerText = '❌ Please fill in all fields.';
        return;
      }
  
      try {
        const res = await fetch('/api/merchants/register', {
          method: 'POST',
          headers,
          body: JSON.stringify({ name, license_number: license, address })
        });
        const json = await res.json();
        resultEl.innerText = json.merchant_id
          ? `✅ Merchant registered! ID: ${json.merchant_id}`
          : `❌ ${json.message || 'Registration failed'}`;
      } catch {
        resultEl.innerText = '❌ Error registering merchant.';
      }
    });
  
    // Load data on page load
    loadStats();
    loadSection('/api/stock/levels', 'supplyLevelsContent', 'regions');
    loadSection('/api/restrictions', 'purchasingRestrictionsContent', 'restrictions');
    loadSection('/api/vaccinations/trends', 'vacTrendsContent', 'trends');
  });
  