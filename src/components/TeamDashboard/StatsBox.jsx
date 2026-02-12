import './StatsBox.css';

export default function StatsBox ({head, body, bg, shadow}) {

    let bgClass = "";
    if (bg === "green") {
        bgClass = "bg-green";
    } else if (bg === "red") {
        bgClass = "bg-red";
    } else if (bg === "yellow") {
        bgClass = "bg-yellow";
    }

    let shadowClass = "";
    if (shadow) {
        shadowClass = "shadow";
    }

    return (
        <div className={`stats-box ${bgClass} ${shadowClass}`}>
            <p className="stats-box__head">{head}</p>
            <p className="stats-box__body">{body}</p>
        </div>
    );
}