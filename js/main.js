// http://jsonpdataproxy.appspot.com/?max-results=10000&url=https://raw.github.com/opencivicdata/ocd-division-ids/master/identifiers/country-ca.csv
var dataset = new recline.Model.Dataset({
  backend: 'dataproxy',
  rows: 10000,
  url: 'https://raw.github.com/opencivicdata/ocd-division-ids/master/identifiers/country-ca.csv'
});

dataset.fetch().done(function (dataset) {
  console.log(dataset.records.length);
  var grid = new recline.View.SlickGrid({
    model: dataset,
    el: $('#grid')
  });
  // $('#grid').append(grid.el);
});
