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

export default function TeamGraph ({teamData}) {

    defaults.font.size = 17;
    defaults.font.family = 'Segoe UI';
    defaults.color = 'black';

    const dataArrays = mapToObjArrays(teamData.pastGames);

    console.log(dataArrays.gameNumbers);
    const data = {
        labels: dataArrays.gameNumbers,
        datasets: [
            {
                label: teamData.teamAbbrev,
                data: dataArrays.elo,
                borderColor: 'hsl(246, 38%, 60%)',
                backgroundColor: 'hsla(224, 58%, 45%, 0.50)',
                pointRadius: 2,
                tension: .2,
                borderJoinStyle: 'round',
                borderCapStyle: 'round',
                borderWidth: 3
            },
            {
                label: "Average Rating",
                data: dataArrays.averageNumbers,
                borderColor: 'hsla(0, 0%, 69%, 0.70)',
                backgroundColor: 'hsla(0, 0%, 77%, 0.81)',
                pointRadius: 0,
                borderWidth: 2
            }
        ]
    }

    return (
        <div className="team-graph">

            <Line options={options} data={data}/>
        </div>
    );
}

