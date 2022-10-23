import './Checkbox.css';

const Checkbox = (props) => {
    const textCls = props.textCls ? props.textCls : "";

    return (
        <div className="checkbox">
            <label className={"checkbox-label" + textCls}>
                <input className="checkbox-ele" type="checkbox"></input>
                <span className="checkmark"></span>
                {props.name}
            </label>
        </div>
    );
}

export default Checkbox;