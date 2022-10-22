import './ListItem.css';

const ListItem = (props) => {
    const depth = props.boxData.depth;
    let textCls = "";
    if(depth === 0 || depth === 1)
        textCls = " level" + depth;

    return (
        <div className="listItem">
            <input className="checkbox-ele" type="checkbox"></input>
            <span className={"checkbox-title" + textCls}>
                {props.boxData.name}
            </span>
        </div>
    );
}

export default ListItem;