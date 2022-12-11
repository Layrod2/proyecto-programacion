const handlebars = {}

handlebars.vacunadoQuery = (t, opts) => {
  if (t.status === true) {
    return `
      <label class='col s12'>
        <input type="checkbox" name="${t.name}" value="true" checked>
        <span>${t.status_string}</span>
      </label>
    `;
  }
  return `
    <label class='col s12'>
      <input type="checkbox" name="${t.name}" value="true">
      <span>${t.status_string}</span>
    </label>
  `;
}



module.exports = handlebars;
