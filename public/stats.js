// get all workout data from back-end

fetch("/api/workouts/range")
  .then(response => {
    return response.json();
  })
  .then(data => {
    populateChart(data);
  });


API.getWorkoutsInRange()

  function generatePalette() {
    const arr = [
      "#218C8D",
      "#6CCECB",
      "#F9E559",
      "#ff7c43",
      "#f95d6a",
      "#d45087",
      "#8EDC9D",
      "#665191",
      "#2f4b7c",
      "#473E3F",

    // "#003f5c",
    // "#2f4b7c",
    // "#665191",
    // "#a05195",
    // "#d45087",
    // "#f95d6a",
    // "#ff7c43",
    // "ffa600",
    // "#003f5c",
    // "#2f4b7c",
    // "#665191",
    // "#a05195",
    // "#d45087",
    // "#f95d6a",
    // "#ff7c43",
    // "ffa600"
  ]

  return arr;
  }
function populateChart(data) {
  let durations = duration(data);
  let pounds = calculateTotalWeight(data);
  let workouts = workoutNames(data);
  const colors = generatePalette();

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
      ],
      datasets: [
        {
          label: "Workout Duration In Minutes",
          backgroundColor:  "mediumaquamarine",
          borderColor: "mediumaquamarine",
          data: durations,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      // maintainAspectRatio:false,
      title: {
        display: true,
        text: "Workout Duration In Minutes"
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ]
      }
    }
  });

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: [
        "Sun",
        "Mon",
        "Tu",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
      ],
      datasets: [
        {
          label: "Pounds",
          data: pounds,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      // scales: {
      //   sAxes: [{
      //     ticks: {
      //       min: "Wed"
      //     }
      //   }]
      // },
      responsive: true,
      // maintainAspectRatio:false,
      title: {
        display: true,
        text: "Pounds Lifted"
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: durations
        }
      ]
    },
    options: {
      responsive: true,
      hoverBorderWidth: 4,
      // maintainAspectRatio:false,
      title: {
        display: true,
        text: "Duration of Excercises Performed"
      }
    }
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: pounds
        }
      ]
    },
    options: {
      responsive: true,
      hoverBorderWidth: 4,
      // maintainAspectRatio:false,
      title: {
        display: true,
        text: "Pounds Lifted in Performed Excercises"
      }
    }
  });
}

function duration(data) {
  let durations = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      durations.push(exercise.duration);
    });
  });

  return durations;
}

function calculateTotalWeight(data) {
  let total = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      total.push(exercise.weight);
    });
  });

  return total;
}

function workoutNames(data) {
  let workouts = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      workouts.push(exercise.name);
    });
  });
  
  return workouts;
}
