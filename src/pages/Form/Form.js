import { useEffect, useState } from "react";
import CheckboxItem from "../../components/CheckboxItem/CheckboxItem";

import './Form.css';

const Form = () => {
    const [checkboxData, setCheckboxData] = useState([]);
    const [checkedState, setCheckedState] = useState([]);

    useEffect(() => {
        //set api path for the raw data
        let path = "https://api.npoint.io/63a4287fa979aced3a3f";
        fetch(path)
            .then((res) => res.json())
            .then((data) => processCheckboxData(data))
            .catch((e) => {
                console.log("Error while loading data.", e);
            });
    }, []);

    /**
     * Processes the raw unsorted data and creates a new sorted hirarchical data
     * @param {object} checkboxData raw unsorted data
     * @return {void}
     */
    const processCheckboxData = (checkboxData) => {
        let depth = 0;
        const newData = [];

        //maintain a hirarchical structure for checked states of all elements to update states in constant time complexity
        const checkedState = [];

        //sorting the data based on length of parents to improve time complexity
        //for all elements, keep on checking number of ancestors from 0 to n.
        //data is added starting from parents and ending on child leaf nodes.
        //using parent id's as index to reduce time complexity of searching parent
        while(checkboxData.length) {
            let len = checkboxData.length;

            for(let i = len-1; i >= 0; i--) {
                const curr = checkboxData[i];
                const partitions = curr.id.split("-").length-1;

                if(partitions === depth) {
                    // checkedState.push({id: curr.id, checked: false});
                    //handle root elements and add root node data in newData
                    if(!curr.parentId) {
                        setElementAtIndex(newData, curr, curr.id, depth, checkedState);
                        checkboxData.splice(i, 1);
                        continue;
                    }
                    const parents = curr.parentId.split("-").reverse();
                    
                    //traverse from root to parent using index
                    let reference = newData;
                    let checkedStateReference = checkedState;
                    while(parents.length) {
                        let index = parseInt(parents.splice(parents.length-1, 1)[0]);
                        reference = reference[index].childs;
                        checkedStateReference = checkedStateReference[index].childs;
                    }

                    const newIndex = curr.id.split("-").slice(-1)[0];
                    setElementAtIndex(reference, curr, newIndex, depth, checkedStateReference);
                    checkboxData.splice(i, 1);
                }
            }

            //after traversing all elements having 'depth' numbers of parents, 
            //increment depth and repeat search for elements having currentDepth+1 ancestors
            depth++;
        }

        setCheckboxData(newData);
        setCheckedState(checkedState);
        console.log("newData", newData);
        console.log("checkedState", JSON.stringify(checkedState));
    }

    /**
     * 
     * @param {Array} arr array to be updated
     * @param {object} element new element to be added
     * @param {number} index the index at which element has to be added
     * @param {number} depth hirarchy depth of the current element
     * @return {void}
     */
    const setElementAtIndex = (arr, element, index, depth, checkedState) => {
        const len = arr.length;
        const elementId = element.id;
        index = parseInt(index);
        const checkedStateElement = {
            id:elementId,
            checked:false,
            childs:[]
        }

        //store child elements and current depth
        element.childs = [];
        element.depth = depth;
        element.checked = false;

        //to use id as index, fill non-existing indices with dummy value -1
        //dummy data will be replaced when we traverse it eventually
        if(index < len) {
            arr[index] = element;
            checkedState[index] = checkedStateElement;
        }
        else {
            if(index > len) {
                while(arr.length < index) {
                    arr.push(-1);
                    checkedState.push({});
                }
            }
            arr.push(element);
            checkedState.push(checkedStateElement);
        }
    }

    const formSubmitHandler = (e) => {
        console.log(checkedState);
    }

    const updateCheckedState = (id) => {
        const parents = id.split("-").reverse();
        let arrCheckedState = JSON.parse(JSON.stringify(checkboxData)); //deep clone
        let index = parseInt(parents.splice(parents.length-1, 1)[0]);
        let checkedStateReference = arrCheckedState;

        while(parents.length) {
            checkedStateReference = checkedStateReference[index].childs;
            index = parseInt(parents.splice(parents.length-1, 1)[0]);
        }

        checkedStateReference[index].checked = !checkedStateReference[index].checked;
        setCheckboxData(arrCheckedState);
        // setCheckedState(arrCheckedState);
        console.log(arrCheckedState);
    };


    return (
        <div className="container">
            <form onSubmit={formSubmitHandler}>
                {
                    checkboxData.map((boxData) => {
                        return (
                            <CheckboxItem 
                                boxData={boxData}
                                key={boxData.id}
                                checkedState={checkedState}
                                updateCheckedState={updateCheckedState}
                            ></CheckboxItem>
                        )
                    })
                }
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Form;