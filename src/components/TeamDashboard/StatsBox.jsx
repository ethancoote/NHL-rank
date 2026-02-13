import './StatsBox.css';

export default function StatsBox ({head, body, bg, shadow, border}) {

    let bgClass = "";
    if (bg === "green") {
        bgClass = "bg-green";
    } else if (bg === "red") {
        bgClass = "bg-red";
    } else if (bg === "yellow") {
        bgClass = "bg-yellow";
    } else if (bg === "tint") {
        bgClass = "bg-tint";
    }

    let shadowClass = "";
    if (shadow) {
        shadowClass = "shadow";
    }

    let borderClass = "";
    if (border) {
        borderClass = "border-solid";
    }

    return (
        <div className={`stats-box ${bgClass} ${shadowClass} ${borderClass}`}>
            <p className="stats-box__head">{head}</p>
            <p className="stats-box__body">{body}</p>
        </div>
    );
}