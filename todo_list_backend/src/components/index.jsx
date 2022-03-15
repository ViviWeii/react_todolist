import React, { Component } from "react";
import axios from "axios";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../css/index.css";
import AddModal from "./addModal";
import ColorModal from "./colorModal";



class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todoItem: [
                { id: "", todoTitle: "", isComplete: 0 }
            ]
        }
    }

    // 查資料
    async componentDidMount() {
        let url = `http://localhost:8000/`;
        let result = await axios.get(url);
        this.state.todoItem = result.data;
        this.setState({});
    }

    // 切換修改模式
    editMode = () => {
        let todoIndex = document.getElementById("todoIndex");
        let todoEdit = document.getElementById("todoEdit");
        todoIndex.style.display = "none";
        todoEdit.style.display = "block";
    }

    // 切換原本頁面
    editComplete = () => {
        let todoIndex = document.getElementById("todoIndex");
        let todoEdit = document.getElementById("todoEdit");
        todoIndex.style.display = "block";
        todoEdit.style.display = "none";
    }

    // 開啟新增視窗
    showAddModal = () => {
        let addModal = document.getElementById("addModal");
        addModal.style.display = "block";
    }

    // 開啟換色視窗
    showColorModal = () => {
        let colorModal = document.getElementById("colorModal");
        colorModal.style.display = "block";
    }

    // 刪除資料
    deleteItem = async (id, e) => {
        let url = `http://localhost:8000/deleteItem/${id}`;
        await axios.delete(url);
        window.location.reload();
    }

    // onChange後，立即更改資料
    changeIsComplete = async (id, e) => {
        let newState = { ...this.state };
        newState.todoItem[id - 1].isComplete = e.target.checked ? 1 : 0;
        this.setState(newState.todoItem[id - 1]);

        let url = `http://localhost:8000/editIsComplete/${id}`;
        await axios.put(url, this.state.todoItem[id - 1])
            .then(
                res => console.log(res)
            )
            .catch(
                err => console.log(err)
            );
    }

    render() {

        return (
            <React.Fragment>
                <section id="index">
                    <div id="todoIndex" className="todoDiv">
                        <div className="todoTitle" id="indexTitle">
                            <div className="todoInlineTitle">
                                <h1>代辦事項</h1>
                                <div className="todoSpan">
                                    <span onClick={this.editMode}><i className="fas fa-pencil-alt"></i></span>
                                </div>
                            </div>
                        </div>
                        <div className="todoInlineDiv">
                            <form action="/editItem" method="post">
                                <ul id="indexUl">
                                    {this.state.todoItem.map((item, index) =>
                                        <li key={item.id} className="todoItem">
                                            <input type="checkbox" name={item.Id} id={item.id} checked={item.isComplete}
                                                onChange={(e) => this.changeIsComplete(item.id, e)} />
                                            <label htmlFor={item.id}>
                                                <div className={`todoInlineItem ${item.isComplete ? "complete" : ""}`}>
                                                    <p>{item.todoTitle}</p>
                                                    <span><i className={item.isComplete ? "fas fa-check" : ""}></i></span>
                                                </div>
                                            </label>
                                        </li>
                                    )
                                    }
                                </ul>
                            </form>
                        </div>
                    </div>
                    <div id="todoEdit" className="todoDiv">
                        <div className="todoTitle" id="editTitle">
                            <div className="todoInlineTitle">
                                <h1>代辦事項</h1>
                                <div className="todoSpan">
                                    <span onClick={this.showColorModal}><i className="fas fa-palette"></i></span>
                                    <span onClick={this.editComplete}><i className="fas fa-check"></i></span>
                                </div>
                            </div>
                        </div>
                        <div className="todoInlineDiv">
                            <ul id="editUl">
                                <li id="addItem" className="todoItem" onClick={this.showAddModal}>
                                    <div className="todoInlineItem">
                                        <div>
                                            <p><i className="fas fa-plus-circle"></i>添加項目</p>
                                        </div>
                                    </div>
                                </li>
                                {this.state.todoItem.map((item, index) =>
                                    <li key={item.id} className="todoItem">
                                        <div className={`todoInlineItem ${item.isComplete ? "complete" : ""}`}>
                                            <div>
                                            {/* <i className="fas fa-sort"></i> */}
                                                <p>{item.todoTitle}</p>
                                                <span onClick={(e) => this.deleteItem(item.id, e)}><i className="fas fa-trash"></i></span>
                                            </div>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>

                        {/* 拖曳功能 */}
                        {/* <DragDropContext onDragEnd={result => {

                            const reorder = (list, startIndex, endIndex) => {
                                const result = Array.from(list);

                                const [removed] = result.splice(startIndex, 1);
                                result.splice(endIndex, 0, removed);
                                return result;
                            }
                            if (!result.destination) {
                                return;
                            }

                            const todo = reorder(
                                this.state.todoItem,
                                result.source.index,
                                result.destination.index
                            )
                            this.setState({ todo });
                        }}>
                            <Droppable droppableId="droppable">
                                {provided => (
                                    <div className="todoInlineDiv" ref={provided.innerRef} {...provided.droppableProps}>
                                        <ul id="editUl">
                                            <li id="addItem" className="todoItem" onClick={this.showAddModal}>
                                                <div className="todoInlineItem">
                                                    <div>
                                                        <p><i className="fas fa-plus-circle"></i>添加項目</p>
                                                    </div>
                                                </div>
                                            </li>
                                            {this.state.todoItem.map((item, index) =>
                                                <Draggable key={item.id} draggableId={`item${item.id}`} index={index}>
                                                    {p => (
                                                        <li id={item.id} className="todoItem" ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps}>
                                                            <div className={`todoInlineItem ${item.isComplete ? "complete" : ""}`}>
                                                                <div>
                                                                    <p><i className="fas fa-sort"></i>{item.todoTitle}</p>
                                                                    <span onClick={(e) => this.deleteItem(item.id, e)}><i className="fas fa-trash"></i></span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )}
                                                </Draggable>
                                            )}
                                            {provided.placeholder}
                                        </ul>
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext> */}

                    </div >
                </section >
                <AddModal />
                <ColorModal />
            </React.Fragment >
        );
    }
}

export default Index;