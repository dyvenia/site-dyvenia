document.querySelectorAll('.section-feature[data-feature-lightbox] .gallery').forEach(gallery => {
  const dialog = gallery.querySelector('dialog');
  const trigger = gallery.querySelector('[data-lightbox-trigger]');
  const close = dialog?.querySelector('button');

  if (!dialog || !trigger) return;

  trigger.addEventListener('click', () => dialog.showModal());
  close?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
});
