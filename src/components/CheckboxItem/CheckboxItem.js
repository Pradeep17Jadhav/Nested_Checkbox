import './CheckboxItem.css';
import ListItem from './ListItem';

const CheckboxItem = (props) => {
  return (
    <ListItem boxData = {props.boxData}/>
  );
}

export default CheckboxItem;