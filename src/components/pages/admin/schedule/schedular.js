import React, { Fragment } from "react";
import Colors from "./../../../color";

const Schedular = (props) => {

    let schedule = props.rows;

    const timeFormat = (hour, minute) => {
        let hr = (hour.toString().length === 1) ? "0" + hour : hour;
        let min = (minute.toString().length === 1) ? "0" + minute : minute;
        return hr + ":" + min;
    };
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const displayAssiging = (row) => {
        if (row.course.length > 0 && row.teacher.length > 0) {
            return row.course[0].name + " (" + row.teacher[0].name + ")";
        } else {
            return capitalizeFirstLetter(row.type);
        }
    }
    const Header = (props) => {
        let headerHeadings = props.topHeader;
        return (<Fragment>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                {headerHeadings.map((item) => {
                    return (
                        <Fragment>
                            <div style={{ width: "16.67%", height: "40px", backgroundColor: Colors.MAIN, padding: "10px", color: Colors.FOREGROUND, textAlign: "center" }}>
                                {item}
                            </div>
                        </Fragment>
                    );
                })}
            </div>
        </Fragment>)
    }

    return (
        <Fragment>
            <div style={{ width: "900px", margin: "auto", backgroundColor: Colors.FOREGROUND, marginTop: "20px", overflow: "scroll" }}>
                <Header topHeader={["TIME", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]} />
                <div>
                    {
                        schedule.rows.map((item) => {
                            return (
                                <Fragment>
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <label style={{ ...LabelStyle, color: Colors.MAIN }}>
                                            {timeFormat(item.schedule[0].startTimeHour, item.schedule[0].startTimeMinutes)} - {timeFormat(item.schedule[0].endTimeHour, item.schedule[0].endTimeMinutes)}
                                        </label>
                                        <label style={LabelStyle} onClick={() => {
                                            if (item.schedule[1].type === "break" || item.schedule[1].type === "lunch break") {
                                            } else {
                                                props.onClick(item.schedule[0]);
                                            }
                                        }}
                                            onMouseEnter={(event) => { event.target.style.backgroundColor = Colors.MAIN; event.target.style.color = Colors.FOREGROUND }}
                                            onMouseLeave={(event) => { event.target.style.backgroundColor = Colors.FOREGROUND; event.target.style.color = Colors.TEXT_PRIMARY }}>
                                            {displayAssiging(item.schedule[0])}
                                        </label>
                                        <label style={LabelStyle} onClick={() => {
                                            if (item.schedule[1].type === "break" || item.schedule[1].type === "lunch break") {
                                            } else {
                                                props.onClick(item.schedule[1]);
                                            }
                                        }}
                                            onMouseEnter={(event) => { event.target.style.backgroundColor = Colors.MAIN; event.target.style.color = Colors.FOREGROUND }}
                                            onMouseLeave={(event) => { event.target.style.backgroundColor = Colors.FOREGROUND; event.target.style.color = Colors.TEXT_PRIMARY }}>
                                            {displayAssiging(item.schedule[1])}
                                        </label>
                                        <label style={LabelStyle} onClick={() => {
                                            if (item.schedule[1].type === "break" || item.schedule[1].type === "lunch break") {
                                            } else {
                                                props.onClick(item.schedule[2]);
                                            }
                                        }}
                                            onMouseEnter={(event) => { event.target.style.backgroundColor = Colors.MAIN; event.target.style.color = Colors.FOREGROUND }}
                                            onMouseLeave={(event) => { event.target.style.backgroundColor = Colors.FOREGROUND; event.target.style.color = Colors.TEXT_PRIMARY }}>
                                            {displayAssiging(item.schedule[2])}
                                        </label>
                                        <label style={LabelStyle} onClick={() => {
                                            if (item.schedule[1].type === "break" || item.schedule[1].type === "lunch break") {
                                            } else {
                                                props.onClick(item.schedule[3]);
                                            }
                                        }}
                                            onMouseEnter={(event) => { event.target.style.backgroundColor = Colors.MAIN; event.target.style.color = Colors.FOREGROUND }}
                                            onMouseLeave={(event) => { event.target.style.backgroundColor = Colors.FOREGROUND; event.target.style.color = Colors.TEXT_PRIMARY }}>
                                            {displayAssiging(item.schedule[3])}
                                        </label>
                                        <label style={LabelStyle} onClick={() => {
                                            if (item.schedule[1].type === "break" || item.schedule[1].type === "lunch break") {
                                            } else {
                                                props.onClick(item.schedule[4]);
                                            }
                                        }}
                                            onMouseEnter={(event) => { event.target.style.backgroundColor = Colors.MAIN; event.target.style.color = Colors.FOREGROUND }}
                                            onMouseLeave={(event) => { event.target.style.backgroundColor = Colors.FOREGROUND; event.target.style.color = Colors.TEXT_PRIMARY }}>
                                            {displayAssiging(item.schedule[4])}
                                        </label>
                                    </div>
                                </Fragment>
                            );
                        })
                    }
                </div>
            </div>
        </Fragment>
    );

}

const LabelStyle = {
    fontSize: "13px",
    width: "16.67%",
    height: "40px",
    padding: "10px",
    textAlign: "center",
    color: Colors.TEXT_PRIMARY
}

export default Schedular;