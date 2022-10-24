import { useState } from "react";
import ListItem from './ListItem';

import './CheckboxItem.css';

const CheckboxItem = (props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const boxData = props.boxData;
    const bHasChilds = boxData.childs && boxData.childs.length !== 0;
    let childElements = null;

    if(bHasChilds) {
        childElements = (
            <div className="checkBoxItem-childs">
                <span className="vertical-line" />
            {
                boxData.childs.map((child) => {
                    if(!child || child === -1)
                        return null;
                    return (
                        <CheckboxItem
                            boxData={child}
                            key={child.id}
                            updateCheckedState={props.updateCheckedState}
                        />
                    );
                })
            }
            </div>
        )
    }

    const showHideHandler = () => {
        if(bHasChilds)
            setIsExpanded(!isExpanded);
    }

    return (
        <div className="checkBoxItem">
            <ListItem 
                name={boxData.name}
                depth={boxData.depth}
                id={boxData.id}
                bChecked={boxData.bChecked}
                bIntermediate={boxData.bIntermediate}
                bHasChilds={childElements != null}
                isExpanded={isExpanded}
                showHideHandler={showHideHandler}
                updateCheckedState={props.updateCheckedState}
            />
            { isExpanded && childElements }
        </div>
    );
}

export default CheckboxItem;