$('#sun-link').hover(function () {
  $('#sun').css({ 'box-shadow': '0px 0px 10px 10px rgba(242, 120, 75, 0.4)' });
}, function () {
  $('#sun').css({ 'box-shadow': '0px 0px 8px 8px rgba(242, 120, 75, 0.2)' });
});

const planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

for (let i = 0; i < planets.length; i++) {
  let planet = planets[i];

  $(`#${planet}-link`).click(function (e) {
    e.preventDefault()

  });

  $(`#${planet}-link`).hover(function () {
    if (planet !== 'pluto') {
      $(`#${planet}-orbit`).css({ border: 'solid 4px rgba(137, 196, 244, 0.4)' });
    } else {
      $(`#${planet}-orbit`).css({ border: 'dashed 1px rgba(137, 196, 244, 0.4)' });
    }

  }, function () {
    if (planet !== 'pluto') {
      $(`#${planet}-orbit`).css({ border: 'solid 4px rgba(137, 196, 244, 0.1)' });
    } else {
      $(`#${planet}-orbit`).css({ border: 'dashed 1px rgba(137, 196, 244, 0.1)' });
    }

  });
}
