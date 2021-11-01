import React, { Fragment, useState } from "react";
import COLORS from "../../components/color";
import { useMediaQuery } from 'react-responsive'
import { Icon } from "semantic-ui-react";
import { NavLink} from "react-router-dom";
const MySideBar = (props) => {

    let Bars = props.Bars;

    const isDesktop = useMediaQuery({ minWidth: 1020 });
    const [showSideBar, setShowSideBar] = useState("none");
    const [buttonInverted, setInvertedProperty] = useState(false);

    const sideBarForMobile = {
        position: "absolute",
        zIndex: "1"
    }

    const onBarsIconClick = () => {
        if (showSideBar === "none") {
            setShowSideBar("");
            setInvertedProperty(true);
        } else {
            setShowSideBar("none");
            setInvertedProperty(false);
        }
    }

    return (
        <Fragment>
            <div style={{ width: "100%", height: "100%" }}>
                <div style={isDesktop ? SideBarStyle : { ...SideBarStyle, ...sideBarForMobile, display: showSideBar }}>
                    <div style={{ marginTop: "30px" }}>
                        {
                            Bars.map((bar, index) => {
                                return (
                                    <NavLink style={{ textDecoration: "none", }} exact key={index} to={bar.link} activeStyle={{ fontWeight: "bold", color: "black" }}>
                                        <div key={bar.link} style={BarStyle}>
                                            <img height="20px" src={bar.icon} alt={bar.alt} />
                                            <p style={HeadingStyle}>{bar.title}</p>
                                        </div>
                                        {/* {bar.title==="Resources"?
                                            <div style={{marginLeft:"4rem"}}>
                                                <p style={SubHeadingStyle}>Books</p>
                                                <p style={SubHeadingStyle}>Resources</p>
                                            </div>
                                        :null} */}
                                    </NavLink>
                                );
                            })
                        }
                    </div>
                </div>
                <div style={{ height: "80px" }}>
                </div>

                <div style={isDesktop ? { marginLeft: "230px", marginTop: "0px", } : { marginTop: "0px" }}>
                    {props.children}
                </div>
                <div style={isDesktop ? { display: "none" } : { position: "absolute", zIndex: "1", right: "15px", top: "90px" }}>
                    <Icon onClick={() => { onBarsIconClick() }} size="small" link circular inverted={buttonInverted} name="bars"></Icon>
                </div>
            </div>
        </Fragment>
    );
};

const SideBarStyle = {
    marginTop: "80px",
    backgroundColor: COLORS.FOREGROUND,
    width: "230px",
    height: "100vh",
    overflow: "scroll",
    zIndex: 1,
    top: 0,
    left: 0,
    position: "fixed",
    boxShadow: "0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 10px 5px 0 rgba(0, 0, 0, 0.19)"
}

const BarStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "25px",
    padding: "14px",
}

const HeadingStyle = {
    marginLeft: "15px",
    fontSize: "16px",
    color: COLORS.TEXT_SECONDARY
}
const SubHeadingStyle = {
    marginLeft: "20px",
    fontSize: "16px",
    lineHeight: "15px",
    fontWeight:"normal",
    color: "#A0ADD1"
}

export default MySideBar;
