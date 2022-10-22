import { useEffect, useState } from "react";
import CheckboxItem from "../../components/CheckboxItem/CheckboxItem";

const Form = () => {
    const [checkboxData, setCheckboxData] = useState([]);

    useEffect(() => {
        let path = "https://api.npoint.io/0311f20a3dd662fa4942";
        fetch(path)
            .then((res) => res.json())
            .then((data) => setCheckboxData(data))
            .catch((e) => {
                console.log("Error while loading data.", e);
            });
    }, []);

    return (
        <div>
            {
                checkboxData.map((boxData) => {
                    return (
                        <CheckboxItem boxData={boxData}></CheckboxItem>
                    )
                })
            }
        </div>
    )
}

export default Form;