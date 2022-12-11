// Inicialization Materialize components
document.addEventListener('DOMContentLoaded', () => {
  // navigation
  const sidenav = document.querySelectorAll('.sidenav');
  let instance_nav = M.Sidenav.init(sidenav);
  // select
  const select = document.querySelectorAll('select');
  let instance_select = M.FormSelect.init(select);
});
