import { useState } from 'react';
import './Checkbox.css';

const Checkbox = (props) => {
    const textCls = props.textCls ? props.textCls : "";
    let isChecked = false;
    const id = props.id;

    //show horizontal connection when depth>1 and checkbox is a leaf node
    const HorizontalConnectionLine =  props.bLeafNode ? <span className="leaf-line" /> : null;
    const VerticalonnectionLine =  props.bLeafNode ? null : <span className="checkbox-line" />;

    return (
        
        <div className="checkbox">
            { VerticalonnectionLine }
            { HorizontalConnectionLine }
            <label className={"checkbox-label" + textCls}>
                <input className="checkbox-ele" 
                    type="checkbox"
                    checked={props.checked}
                    onChange={() => props.updateCheckedState(props.id)}
                />
                <span className="checkmark"></span>
                {props.name}
            </label>
        </div>
    );
}

export default Checkbox;