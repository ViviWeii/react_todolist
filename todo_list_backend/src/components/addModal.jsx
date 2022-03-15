import React, { Component } from 'react';
import axios from 'axios';

class AddModal extends Component {
    state = {
        todoItem: { id: 66, todoTitle: "", isComplete: 0 }
    }

    hideAddModal = () => {
        let addModal = document.getElementById("addModal");
        addModal.style.display = "none";
    }

    addChange = (e) => {
        let newState = {...this.state};
        newState.todoItem.todoTitle = e.target.value;
        this.setState(newState);
        console.log(newState)
    }

    addItem = async () => {
        let url = `http://localhost:8000/addItem`;
        await axios.post(url, this.state.todoItem)
        .then(
            res => console.log(res)
        )
        .catch(
            err => console.log(err)
        );
        window.location.reload();
    }

    render() {
        return (
            <React.Fragment>
                <div id="addModal">
                    <form action="/addItem" method="post">
                        <div className="addModalDiv">
                            <span><i className="fas fa-times" onClick={this.hideAddModal}></i></span>
                            <p>新增項目</p>
                            <input type="text" onChange={this.addChange} name="todoTitle" id="todoTitle" value={this.state.todoItem.todoTitle || ""} />
                            <div className="buttonDiv">
                                <input type="button" id="addBtn" onClick={this.addItem} value="新增" />
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default AddModal;