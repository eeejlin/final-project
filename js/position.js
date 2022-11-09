Plotly.d3.json('api/natural.json', function (err, rows) {
    const arr = rows.map((perDate) => {
        let coords = perDate.coords
        console.log(perDate);

        var sun = {
            x: [coords.sun_j2000_position.x],
            y: [coords.sun_j2000_position.y],
            z: [coords.sun_j2000_position.z],
            name: 'sun position',
            mode: 'markers',
            marker: {
                size: 20,
                line: {
                    color: 'rgba(217, 217, 217, 0.14)',
                    width: 0.5
                },
                opacity: 0.8
            },
            type: 'scatter3d'
        };

        var lunar = {
            x: [coords.lunar_j2000_position.x],
            y: [coords.lunar_j2000_position.y],
            z: [coords.lunar_j2000_position.z],
            name: 'lunar position',
            mode: 'markers',
            marker: {
                size: 15,
                line: {
                    color: 'rgba(217, 217, 217, 0.14)',
                    width: 0.5
                },
                opacity: 0.8
            },
            type: 'scatter3d'
        };

        var spacecraft = {
            x: [coords.dscovr_j2000_position.x],
            y: [coords.dscovr_j2000_position.y],
            z: [coords.dscovr_j2000_position.z],
            name: 'spacecraft position',
            mode: 'markers',
            marker: {
                size: 10,
                line: {
                    color: 'rgba(217, 217, 217, 0.14)',
                    width: 0.5
                },
                mode: 'markers',
                opacity: 0.8
            },
            type: 'scatter3d'
        };


        var data = [sun, lunar, spacecraft];

        var layout = {
            showlegend: true,
            legend: {
                x: 0,
                xanchor: 'right',
                y: 1,
                traceorder: 'normal',
                font: {
                  family: 'sans-serif',
                  size: 12,
                  color: '#000'
                },
                bgcolor: 'none',
                bordercolor: '#FFFFFF',
                borderwidth: 2
            },
            width: 500,
            height: 500,
            scene: {
                aspectratio: {
                    x: 1,
                    y: 1,
                    z: 1
                },
                camera: {
                    center: {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    eye: {
                        x: 1.25,
                        y: 1.25,
                        z: 1.25
                    },
                    up: {
                        x: 0,
                        y: 0,
                        z: 1
                    }
                },
                xaxis: {
                    title: 'distance',
                    type: 'linear',
                    zeroline: false
                },
                yaxis: {
                    title: 'distance',
                    type: 'linear',
                    zeroline: false
                },
                zaxis: {
                    title: 'distance',
                    type: 'linear',
                    zeroline: false
                }
            },
        };
        Plotly.newPlot('myDiv', data, layout, { showSendToCloud: true, displayModeBar: false });
    })
});