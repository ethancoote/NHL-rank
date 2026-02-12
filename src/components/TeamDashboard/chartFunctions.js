export const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
        padding: 0
    },
    plugins: {
        legend: {
            display: false,
            position: 'top'      
        },
        title: {
            display: false,
            text: "Team Elo",
        },
        tooltip: {
            padding: 12,
            boxPadding: 8,
            callbacks: {
                title: () => ""
            }
        }
    },
    scales: {
        y: {
            title: {
                display: true,
                text: "Elo",
                font: {
                    weight: 700
                },
                padding: {bottom: 8}
            }
        },
        x: {
            display: false,
            grid: {
                display: false
            }
        }
    }
};

export function mapToObjArrays(gamesData) {
    const dataArrays = {
        elo: [],
        gameNumbers: [],
        averageNumbers: []
    };

    for (let i = 0; i < gamesData.length; i++) {
        dataArrays.gameNumbers.push(i+1);
        dataArrays.elo.push(gamesData[i].elo);
        dataArrays.averageNumbers.push(1000);
    }

    return dataArrays;
}