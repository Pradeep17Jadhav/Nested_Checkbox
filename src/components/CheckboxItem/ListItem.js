import './ListItem.css';

const ListItem = (props) => {
  return (
    <div className="listItem">

        <input type="checkbox"></input>
        {props.boxData.name}
    </div>
  );
}

export default ListItem;