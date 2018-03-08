
/*---KLOKKEN---*/

set('hours',   30 * new Date().getHours());
set('minutes',  6 * new Date().getMinutes());
set('seconds', 10 * new Date().getSeconds());

/*---DONUTCHARTS---*/

function set(id, deg) {
  var el = document.getElementById(id),
      rotation = 'rotate(' + deg + 'deg)';
  
  el.style.transform = rotation;
  el.style.webkitTransform = rotation;
}

var chart = new Chartist.Pie('#fooddonutchart', {
          series: [30, 30, 10, 40, 15, 50],
          labels: ['Fruit', 'Rice', 'Spreads', 'Canned', 'Sweets', 'Bread']
      }, {
          donut: true,
          showLabel: true
      });

var chart = new Chartist.Pie('#drinksdonutchart', {
          series: [20, 30, 60, 40, 10, 40],
          labels: ['Milk', 'Juice', 'Water', 'Soda', 'Alcohol', 'Tea']
      }, {
          donut: true,
          showLabel: true
      });
// As options we currently only set a static size of 300x200 px. We can also omit this and use aspect ratio containers
// as you saw in the previous example

chart.on('draw', function(data) {
    if(data.type === 'slice') {
    // Get the total path length in order to use for dash array animation
      var pathLength = data.element._node.getTotalLength();

      // Set a dasharray that matches the path length as prerequisite to animate dashoffset
      data.element.attr({
        'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
      });

      // Create animation definition while also assigning an ID to the animation for later sync usage
      var animationDefinition = {
        'stroke-dashoffset': {
          id: 'anim' + data.index,
          dur: 1000,
          from: -pathLength + 'px',
          to:  '0px',
          easing: Chartist.Svg.Easing.easeOutQuint,
          // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
          fill: 'freeze'
      }
    };

    // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
    if(data.index !== 0) {
      animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
    }

    // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
    data.element.attr({
      'stroke-dashoffset': -pathLength + 'px'
    });

    // We can't use guided mode as the animations need to rely on setting begin manually
    // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
    data.element.animate(animationDefinition, false);
  }
});

// For the sake of the example we update the chart every time it's created with a delay of 8 seconds
chart.on('created', function() {
  if(window.__anim21278907124) {
    clearTimeout(window.__anim21278907124);
      window.__anim21278907124 = null;
    }
    window.__anim21278907124 = setTimeout(chart.update.bind(chart), 10000);
});

/*---BARCHARTS---*/

new Chartist.Bar('#foodbarchart', {
  labels: ['Apples', 'Beans', 'Bread', 'Butter', 'Chocolate', 'Cookies', 'Corn', 'Jelly', 'Mango', 'Rice'],
  series: [15, 20, 50, 5, 8, 7, 20, 5, 15, 10]
}, {
  distributeSeries: true
});

new Chartist.Bar('#drinksbarchart', {
  labels: ['Milk', 'Apple Juice', 'Water', 'Cola', 'Fanta', 'Rum', 'Wine', 'Tea', 'Bitter Lemon', 'Orange Juice'],
  series: [30, 20, 20, 7, 30, 50, 5, 5, 8, 10]
}, {
  distributeSeries: true
});


