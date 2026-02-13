import { 
    Chart as ChartJS, 
    Tooltip, 
    Legend, 
    Title, 
    LineElement, 
    CategoryScale, 
    LinearScale, 
    PointElement,
    defaults
} from 'chart.js';

import { Line } from 'react-chartjs-2'; 
import { options, mapToObjArrays } from './chartFunctions.js';
import './TeamGraph.css';

ChartJS.register(
    Tooltip, 
    Legend, 
    Title, 
    LineElement, 
    CategoryScale, 
    LinearScale,
    PointElement
);

export default function TeamGraph ({teamData, allTeamsData}) {

    defaults.font.size = 15;
    defaults.font.family = 'Segoe UI';
    defaults.color = 'black';

    const allDatasets = [];

    for (let i = 0; i < allTeamsData.length; i++) {
        const dataArrays = mapToObjArrays(allTeamsData[i].pastGames);

        const dataset = {
            label: allTeamsData[i].teamAbbrev,
            data: dataArrays.elo,
            borderColor: 'hsla(0, 0%, 69%, 0.32)',
            backgroundColor: 'hsla(0, 0%, 77%, 0.81)',
            pointRadius: 0,
            tension: 0,
            borderJoinStyle: 'round',
            borderCapStyle: 'round',
            borderWidth: 2
        }

        if (allTeamsData[i].teamAbbrev === teamData.teamAbbrev) {
            dataset.pointRadius = 2;
            dataset.borderWidth = 3;
            dataset.backgroundColor = 'hsla(224, 58%, 45%, 0.50)';
            dataset.borderColor = 'hsl(246, 38%, 60%)';
        }

        allDatasets.push(dataset);
    }

    const data = {
        labels: [...Array(teamData.gamesPlayed).keys()],
        datasets: allDatasets
            /*{
                label: "Average Rating",
                data: dataArrays.averageNumbers,
                borderColor: 'hsla(0, 0%, 69%, 0.70)',
                backgroundColor: 'hsla(0, 0%, 77%, 0.81)',
                pointRadius: 0,
                borderWidth: 2
            }*/
    }

    return (
        <div className="team-graph">

            <Line options={options} data={data}/>
        </div>
    );
}