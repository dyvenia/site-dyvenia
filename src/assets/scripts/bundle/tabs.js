document.addEventListener('DOMContentLoaded', () => {
  // Select all tab buttons and panels using updated data-* attributes
  const tabs = document.querySelectorAll('[data-tab-target]');
  const panels = document.querySelectorAll('[data-tab-panel]');

  // Hide all panels except the first and set aria-selected for tabs
  panels.forEach((panel, index) => {
    if (index === 0) {
      panel.hidden = false; // Show the first panel
    } else {
      panel.hidden = true; // Hide all others
    }
  });

  tabs.forEach((tab, index) => {
    if (index === 0) {
      tab.setAttribute('aria-selected', 'true'); // Select the first tab
    } else {
      tab.setAttribute('aria-selected', 'false'); // Deselect all others
    }

    // Add click event listeners to each tab
    tab.addEventListener('click', () => {
      const targetPanelId = tab.dataset.tabTarget;

      // Deselect all tabs and hide all panels
      tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
      panels.forEach(panel => (panel.hidden = true));

      // Select the clicked tab and show the associated panel
      tab.setAttribute('aria-selected', 'true');
      const targetPanel = document.querySelector(`[data-tab-panel="${targetPanelId}"]`);
      if (targetPanel) {
        targetPanel.hidden = false;
      }
    });
  });
});
