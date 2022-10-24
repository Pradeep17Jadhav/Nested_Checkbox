import { useEffect, useState } from "react";
import CheckboxItem from "../../components/CheckboxItem";

import './Form.css';

const Form = () => {
    const [checkboxData, setCheckboxData] = useState([]);

    useEffect(() => {
        //set api path for the raw data
        let path = "https://api.npoint.io/cf5cbe28a25916114eda";
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
                    //handle root elements and add root node data in newData
                    if(!curr.parentId) {
                        setElementAtIndex(newData, curr, curr.id, depth);
                        checkboxData.splice(i, 1);
                        continue;
                    }
                    
                    //traverse from root to parent using index
                    const parents = curr.parentId.split("-").reverse();
                    let reference = newData;
                    while(parents.length) {
                        let index = parseInt(parents.splice(parents.length-1, 1)[0]);
                        reference[index].totalChildCount++;
                        reference = reference[index].childs;
                    }

                    const newIndex = curr.id.split("-").slice(-1)[0];
                    setElementAtIndex(reference, curr, newIndex, depth);
                    checkboxData.splice(i, 1);
                }
            }

            //after traversing all elements having 'depth' numbers of parents, 
            //increment depth and repeat search for elements having currentDepth+1 ancestors
            depth++;
        }

        setCheckboxData(newData);
    }

    /**
     * 
     * @param {Array} arr array to be updated
     * @param {object} element new element to be added
     * @param {number} index the index at which element has to be added
     * @param {number} depth hirarchy depth of the current element
     * @return {void}
     */
    const setElementAtIndex = (arr, element, index, depth) => {
        const len = arr.length;
        index = parseInt(index);

        //store child elements and current depth
        element.childs = [];
        element.depth = depth;
        element.bChecked = false;
        element.totalChildCount = 0;
        element.checkedTotalChildCount = 0;
        element.bIntermediate = false;

        //to use id as index, fill non-existing indices with dummy value -1
        //dummy data will be replaced when we traverse it eventually
        if(index < len) {
            arr[index] = element;
        }
        else {
            if(index > len) {
                while(arr.length < index) {
                    arr.push(-1);
                }
            }
            arr.push(element);
        }
    }

    const updateCheckedState = (id, bCheckedOldState) => {
        const bChecked = !bCheckedOldState;
        const parents = id.split("-");
        let arrCheckedState = JSON.parse(JSON.stringify(checkboxData)); //deep clone
        let elementIndex = parseInt(parents.splice(parents.length-1, 1)[0]);
        let checkedStateReference = arrCheckedState;
        parents.reverse();

        while(parents.length) {
            let index = parseInt(parents.splice(parents.length-1, 1)[0]); 
            checkedStateReference = checkedStateReference[index].childs;
        }
            
        checkedStateReference[elementIndex].bChecked = bChecked;
            
        //handle state of all childs
        checkChildCheckboxes(checkedStateReference[elementIndex], bChecked);
        updateCheckedStateFromChilds(arrCheckedState);
        setCheckboxData(arrCheckedState);
    };

    const updateCheckedStateFromChilds = (arr) => {
        let checkedChildCount = 0;
        for(let i = 0; i < arr.length; i++) {
            let curr = arr[i];
            let childs = curr.childs;
            if(childs && childs.length) {
                curr.checkedTotalChildCount = updateCheckedStateFromChilds(childs);
                checkedChildCount += curr.checkedTotalChildCount;
            }

            if(curr.totalChildCount !== 0 ) {
                if(curr.totalChildCount === curr.checkedTotalChildCount) {
                    curr.bChecked = true;
                    curr.bIntermediate = false;
                }
                else if(curr.totalChildCount !== curr.checkedTotalChildCount) {
                    curr.bChecked = false;
                    if(curr.checkedTotalChildCount === 0)
                        curr.bIntermediate = false;
                    else
                        curr.bIntermediate = true;
                }
            }

            if(curr.bChecked)
                checkedChildCount++;
        }
        return checkedChildCount;

    }

    const checkChildCheckboxes = (arr, bChecked) => {
        if(arr.childs && arr.childs.length) {
            arr.childs.forEach(child => {
                child.bChecked = bChecked;
                checkChildCheckboxes(child, bChecked);
            });
        }
    }

    const formSubmitHandler = (e) => {
        let data = [];
        getFormData(data, checkboxData);
        console.log("Submitted! The data is:");
        console.log(data);
        e.preventDefault();
    }

    const getFormData = (arr, stateData) => {
        stateData.forEach((ele) => {
            let obj = {
                id: ele.id,
                name: ele.name,
                parentId: ele.parentId,
                bChecked: ele.bChecked,
                bIntermediate: ele.bIntermediate,
                childs: getFormData([], ele.childs)
            }
            arr.push(obj);
        });
        return arr;
    }


    return (
        <div className="container">
            <form className="form" onSubmit={formSubmitHandler}>
                <div>
                    {
                        checkboxData.map((boxData) => {
                            return (
                                <CheckboxItem 
                                    boxData={boxData}
                                    key={boxData.id}
                                    updateCheckedState={updateCheckedState}
                                ></CheckboxItem>
                            )
                        })
                    }
                </div>
                <input className="btnSubmit" type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Form;