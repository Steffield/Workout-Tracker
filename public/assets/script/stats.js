// get all workout data from back-end

fetch("/api/workouts/range")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    populateChart(data);
  });

API.getWorkoutsInRange();

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
    // "ffa600",
  ];

  return arr;
}

//modified charts slightly
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
      labels: durations.map((d) => d.day),
      datasets: [
        {
          label: "Duration",
          backgroundColor: "mediumaquamarine",
          borderColor: "#218C8D",
          borderWidth: 0.9,
          data: durations.map((d) => d.duration),
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        text: "Workout Duration in Minutes",
        display: true,
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
      },
    },
  });

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: pounds.map((d) => d.day),
      // [
      //   "Sunday",
      //   "Monday",
      //   "Tuesday",
      //   "Wednesday",
      //   "Thursday",
      //   "Friday",
      //   "Saturday",
      // ],
      datasets: [
        {
          label: "Pounds",
          data: pounds.map((d) => d.weight),
          backgroundColor: colors,
          // [
          //   "rgba(255, 99, 132, 0.2)",
          //   "rgba(54, 162, 235, 0.2)",
          //   "rgba(255, 206, 86, 0.2)",
          //   "rgba(75, 192, 192, 0.2)",
          //   "rgba(153, 102, 255, 0.2)",
          //   "rgba(255, 159, 64, 0.2)",
          // ],
          // [
          //   "rgba(255, 99, 132, 1)",
          //   "rgba(54, 162, 235, 1)",
          //   "rgba(255, 206, 86, 1)",
          //   "rgba(75, 192, 192, 1)",
          //   "rgba(153, 102, 255, 1)",
          //   "rgba(255, 159, 64, 1)",
          // ],
          borderWidth: .8,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Pounds Lifted in Workouts",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Duration of Performed Exercises",
          backgroundColor: colors,
          borderColor: "white",
          borderWidth: 2,
          data: durations.map((d) => d.duration),
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Duration of Performed Exercises",
      },
    },
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Weight Lifted in Performed Exercises",
          backgroundColor: colors,
          data: pounds.map((d) => d.weight),
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Weight Lifted in Performed Exercises",
      },
    },
  });
}

//modified duration function with Tim's input- thanks for that

function duration(data) {
  let durations = [];

  data.forEach((workout) => {
    const duration = workout.exercises
      .map((exercise) => exercise.duration)
      .reduce((acc, cv) => acc + cv);

    const parseDate = new Date(workout.day);
    // getMonth method returns a zero based index which is why 1 was added
    const month = parseDate.getMonth() + 1;
    const date = parseDate.getDate();

    durations.push({
      day: `${month}-${date}`,
      duration,
    });
  });

  // data.forEach((workout) => {
  //   workout.exercises.forEach((exercise) => {
  //     durations.push(exercise.duration);
  //   });
  // });

  return durations;
}

//modified calc weight function
function calculateTotalWeight(data) {
  let total = [];

  data.forEach((workout) => {
    const weight = workout.exercises
      .map((exercise) => exercise.weight)
      .reduce((acc, cv) => acc + cv);

    const parseDate = new Date(workout.day);
    // getMonth method returns a zero based index which is why 1 was added
    const month = parseDate.getMonth() + 1;
    const date = parseDate.getDate();

    total.push({
      day: `${month}-${date}`,
      weight,
      
    // workout.exercises.forEach((exercise) => {
    //   total.push(exercise.weight);
    });
  });

  return total;
}

function workoutNames(data) {
  let workouts = [];

  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      workouts.push(exercise.name);
    });
  });

  return workouts;
}




