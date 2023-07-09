import classes from "./css/intro.module.css";

function Intro() {
    return (
        <div className={classes.bounce}>
            <span className={classes.letter}>c</span>
            <span className={classes.letter}>a</span>
            <span className={classes.letter}>t</span>
            <span className={classes.letter}>e</span>
            <span className={classes.letter}>s</span>
            <span className={classes.letter}>t</span>
        </div>
    );
}

export default Intro;
