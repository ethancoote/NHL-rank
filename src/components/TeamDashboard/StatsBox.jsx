import './StatsBox.css';

export default function StatsBox ({head, body}) {
    return (
        <div className="stats-box">
            <p className="stats-box__head">{head}</p>
            <p className="stats-box__body">{body}</p>
        </div>
    );
}