// Utility: Get authentication headers
function getAuthHeaders(contentType = null) {
    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    if (contentType) {
      headers['Content-Type'] = contentType;
    }
    return headers;
  }
  
  // Utility: Display error in a target element
  function displayError(id, message) {
    const el = document.getElementById(id);
    if (el) el.innerText = `❌ ${message}`;
  }
  
  // Utility: Format a date to readable format
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  
  // Utility: Format datetime
  function formatDateTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  // Utility: Validate JSON file input
  function validateJsonFile(file) {
    return file && file.type === 'application/json';
  }
  
  // Utility: Validate PDF file input
  function validatePdfFile(file) {
    return file && file.type === 'application/pdf';
  }
  