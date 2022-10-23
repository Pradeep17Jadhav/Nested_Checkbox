import ExpandButton from "./ExpandButton";
import Checkbox from "./Checkbox";

import './ListItem.css';

const ListItem = (props) => {
    const depth = props.depth;
    const bShowExpand = props.bHasChilds;

    let textCls = "";
    if(depth === 0 || depth === 1)
        textCls = " level" + depth;

    return (
        <div className="listItem">
            <ExpandButton visible={bShowExpand}/>
            <Checkbox 
                textCls={textCls}
                name={props.name}
            />
        </div>
    );
}

export default ListItem;