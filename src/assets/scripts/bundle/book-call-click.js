document.addEventListener('click', event => {
  const link = event.target.closest?.('a[href*="meetings"][href*="hubspot.com"]');
  if (!link) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({event: 'book_call_click'});
});
