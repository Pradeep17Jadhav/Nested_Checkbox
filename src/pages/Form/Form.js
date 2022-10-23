import { useEffect, useState } from "react";
import CheckboxItem from "../../components/CheckboxItem/CheckboxItem";

import './Form.css';

const Form = () => {
    const [checkboxData, setCheckboxData] = useState([]);

    useEffect(() => {
        let path = "https://api.npoint.io/63a4287fa979aced3a3f";
        fetch(path)
            .then((res) => res.json())
            .then((data) => processCheckboxData(data))
            .catch((e) => {
                console.log("Error while loading data.", e);
            });
    }, []);

    const processCheckboxData = (checkboxData) => {
        let depth = 0;
        let newData = [];

        while(checkboxData.length) {
            let len = checkboxData.length;
            for(let i = len-1; i >= 0; i--) {
                const curr = checkboxData[i];
                const partitions = curr.id.split("-").length-1;

                if(partitions === depth) {
                    if(!curr.parentId) {
                        setElementAtIndex(newData, curr, curr.id, depth);
                        checkboxData.splice(i, 1);
                        continue;
                    }
                    const parents = curr.parentId.split("-").reverse();
                    let reference = newData;

                    while(parents.length) {
                        let index = parseInt(parents.splice(parents.length-1, 1)[0]);
                        reference = reference[index].childs;
                    }

                    const newIndex = curr.id.split("-").slice(-1)[0];
                    setElementAtIndex(reference, curr, newIndex, depth);
                    checkboxData.splice(i, 1);
                }
            }
            depth++;
        }

        setCheckboxData(newData);
    }

    const setElementAtIndex = (arr, element, index, depth) => {
        let len = arr.length;
        index = parseInt(index);
        element.childs = [];
        element.depth = depth;

        if(index < len)
            arr[index] = element;
        else {
            if(index > len) {
                while(arr.length < index)
                    arr.push(-1);
            }
            arr.push(element);
        }
    }

    return (
        <div className="container">
            {
                checkboxData.map((boxData) => {
                    return (
                        <CheckboxItem 
                            boxData={boxData}
                            key={boxData.id}
                        ></CheckboxItem>
                    )
                })
            }
        </div>
    )
}

export default Form;