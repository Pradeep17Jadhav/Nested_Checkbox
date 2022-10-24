import './Checkbox.css';

const Checkbox = (props) => {
    const textCls = props.textCls ? props.textCls : "";

    //show horizontal connection when depth>1 and checkbox is a leaf node
    const HorizontalConnectionLine =  props.bLeafNode ? <span className="leaf-line" /> : null;
    const VerticalonnectionLine =  props.bLeafNode ? null : <span className="checkbox-line" />;

    const stateChangeHandler = () => {
        props.updateCheckedState(props.id, props.bChecked);
    }
    return (
        
        <div className="checkbox">
            { VerticalonnectionLine }
            { HorizontalConnectionLine }
            <label className={"checkbox-label" + textCls}>
                <input className="checkbox-ele" 
                    type="checkbox"
                    checked={props.bChecked}
                    onChange={stateChangeHandler}
                    ref={input => { if(input) input.indeterminate = props.bIntermediate; }}
                />
                <span className="checkmark"></span>
                {props.name}
            </label>
        </div>
    );
}

export default Checkbox;