import ListItem from './ListItem';

import './CheckboxItem.css';

const CheckboxItem = (props) => {
    const boxData = props.boxData;
    const bHasChilds = boxData.childs && boxData.childs.length;
    let childElements = null;

    if(bHasChilds) {
        childElements = (
            <div className="checkBoxItem-childs">
            {
                boxData.childs.map((child) => {
                    if(!child || child === -1)
                        return null;
                    return (
                        <CheckboxItem 
                            className=""
                            boxData={child}
                            key={child.id}
                        />
                    );
                })
            }
            </div>
        )
    }

    return (
        <div className="checkBoxItem">
            <ListItem 
                name={boxData.name}
                depth={boxData.depth}
                bHasChilds={childElements != null}
            />
            { childElements }
        </div>
    );
}

export default CheckboxItem;