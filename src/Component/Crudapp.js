import React, { useState } from 'react'
import '../Style/Crudapp.css'
const Crudapp = () => {
    const [inputField, setInputField] = useState({ name: "", email: "", age: "" });
    const [tableData, setTableData] = useState([]);
    const [editId, setEditId] = useState(null);
    const handleChange = (e) => {
        setInputField({ ...inputField, [e.target.name]: e.target.value });
    }

    const handleEdit = (id) => {
        const item = tableData.find((items) => items.id === id);
        setInputField(item);
        setEditId(id);
        // console.log(item);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, age } = inputField;
        if (!name.trim() || !email.trim() || !age) return

        if (editId) {
            const updatedData = tableData.map((items) => items.id === editId ? { ...items, name, email, age } : items);
            setTableData(updatedData);
            setInputField({ name: "", email: "", age: "" });
            setEditId(null);
            // console.log(updatedData);
        }
        else {
            const newId = tableData.length > 0 ? tableData[tableData.length - 1].id + 1 : 1;
            // console.log(newId);
            setTableData([...tableData, { id: newId, name, email, age }]);
            setInputField({ name: "", email: "", age: "" })
        }
    }

    const handleDelete = (id) => {
        const filteredData = tableData.filter((items) => items.id !== id);
        setTableData(filteredData);
        // console.log(filteredData);
    }
    return (
        <>
           <div className='crud-maincontainer'>
                <form onSubmit={handleSubmit} className='crud-container'>
                    <div className='crud-subcontainer'>
                        <input type='text' name='name' placeholder='Enter The Name' value={inputField.name} onChange={(e) => handleChange(e)} />
                    </div>
                    <div className='crud-subcontainer'>
                        <input type='text' name='email' placeholder='Enter The Email' value={inputField.email} onChange={(e) => handleChange(e)} />
                    </div>
                    <div className='crud-subcontainer'>
                        <input type='number' name='age' placeholder='Enter The Age' value={inputField.age} onChange={(e) => handleChange(e)} />
                    </div>
                    <button type='submit'>{editId ? "Update" : "Submit"}</button>
                </form>
            <div className='crud-tablecontainer'>
                <table>
                    <thead>
                        <tr>
                            <th>SNo</th>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableData?.map((items, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{items.id}</td>
                                    <td>{items.name}</td>
                                    <td>{items.email}</td>
                                    <td>{items.age}</td>
                                    <td className='crud-buttons'>
                                        <button onClick={() => handleEdit(items.id)} className='btn1'>Edit</button>
                                        <button onClick={() => handleDelete(items.id)} className='btn2'>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
           </div>
        </>
    )
}
export default Crudapp