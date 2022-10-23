import Checkbox from "./Checkbox";

import './ListItem.css';

const ListItem = (props) => {
    const depth = props.depth;
    let textCls = "";
    if(depth === 0 || depth === 1)
        textCls = " level" + depth;

    let visibilityCls = props.isExpanded ? " expanded" : "";
    visibilityCls += props.bHasChilds ? "" : " hidden";

    return (
        <>
            <span className="expand-line" />
            <div className="listItem">
                <span className="checkbox-line" />
                <div 
                    className={"expandButton" + visibilityCls} 
                    onClick={props.showHideHandler}
                />
                <Checkbox 
                    textCls={textCls}
                    name={props.name}
                />
            </div>
        </>
        
    );
}

export default ListItem;