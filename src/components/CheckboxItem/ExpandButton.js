import './ExpandButton.css';

const ExpandButton = (props) => {
    const visibilityCls = props.visible ? "" : " hidden";
    return (
        <div className={"expandButton" + visibilityCls}>

        </div>
    );
}

export default ExpandButton;