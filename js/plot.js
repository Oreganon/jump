google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(draw_basic);

function draw_basic() {
    let d = document.getElementById("date").value;

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Progress');
    data.addColumn('number', 'Percentage');

    data.addRows(get_data(d));

    var options = {
        hAxis: {
            title: 'Time (10s interval)'
        },
        width: document.body.offsetWidth,
        height: 900,
        explorer: { axis: 'horizontal' },
        vAxis: {
            title: 'progress',
            viewWindowMode:'explicit',
            viewWindow: {
              max:100,
              min:0,
            }
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

    chart.draw(data, options);
}

function get_data(d) {
    if (window.data === undefined) {
        return [[0,0],[1,10],[2,20],[3,40]];
    }
    let data_array = window.data[d];
    let chart_array = [];
    for (var i = 0; i < data_array.length; ++i) {
        let percent = Math.ceil((data_array[i]-1) / 42 * 100);
        chart_array.push([i, percent]);
    }
    return chart_array;
}

function init(data) {
    for (key of Object.keys(data)) {
        let option = document.createElement("option");
        option.innerText = key;
        option.value = key;
        document.getElementById("date").appendChild(option);
    }
    window.data = data;
    draw_basic();
}

function plot(data_url) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            init(data)
        }
    };
    xhr.open("GET", data_url, true);
    xhr.send();
}


