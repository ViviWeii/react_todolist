import React, { Component } from 'react';

class ColorModal extends Component {
    state = { }

    // 關閉換色視窗
    hidecolorModal = () => {
        let colorModal = document.getElementById("colorModal");
        colorModal.style.display = "none";
    }

    // 更換顏色
    changeColor = (darkColor,color,textColor,e) => {
        let indexTitle = document.getElementById("indexTitle");
        let editTitle = document.getElementById("editTitle");
        let indexUl = document.getElementById("indexUl");
        let editUl = document.getElementById("editUl");
        let addBtn = document.getElementById("addBtn");

        // 背景顏色
        indexTitle.style.backgroundColor = darkColor;
        editTitle.style.backgroundColor = darkColor;
        indexUl.style.backgroundColor = color;
        editUl.style.backgroundColor = color;
        addBtn.style.backgroundColor = color;

        // 文字顏色
        indexTitle.style.color = textColor;
        editTitle.style.color = textColor;
        indexUl.style.color = textColor;
        editUl.style.color = textColor;
        addBtn.style.color = textColor;
    }
    render() {
        return (
            <React.Fragment>
                <div id="colorModal">
                    <div className="colorModalDiv">
                        <span><i className="fas fa-times" onClick={this.hidecolorModal}></i></span>
                        <p>更換顏色</p>
                        <div className="buttonDiv">
                            <input type="button" id="red" onClick={(e) => this.changeColor("rgb(255, 137, 137)","rgb(255, 172, 172)","#000",e)} alt="紅色" />
                            <input type="button" id="orange" onClick={(e) => this.changeColor("rgb(250, 186, 91)","rgb(255, 204, 137)","#000",e)} alt="橘色" />
                            <input type="button" id="yellow" onClick={(e) => this.changeColor("rgb(255, 252, 73)","rgb(255, 253, 152)","#000",e)} alt="預設黃色" />
                            <input type="button" id="green" onClick={(e) => this.changeColor("rgb(160, 228, 127)","rgb(201, 233, 157)","#000",e)} alt="綠色" />
                            <input type="button" id="blue" onClick={(e) => this.changeColor("rgb(136, 228, 235)","rgb(180, 245, 247)","#000",e)} alt="藍色" />
                            <input type="button" id="indigo" onClick={(e) => this.changeColor("rgb(138, 179, 255)","rgb(172, 198, 255)","#000",e)} alt="靛色" />
                            <input type="button" id="purple" onClick={(e) => this.changeColor("rgb(195, 166, 253)","rgb(213, 190, 252)","#000",e)} alt="紫色" />
                            <input type="button" id="pink" onClick={(e) => this.changeColor("rgb(251, 172, 255)","rgb(252, 194, 255)","#000",e)} alt="粉色" />
                            <input type="button" id="gray" onClick={(e) => this.changeColor("rgb(201, 201, 201)","rgb(218, 218, 218)","#000",e)} alt="灰色" />
                            <input type="button" id="black" onClick={(e) => this.changeColor("rgb(0, 0, 0)","rgb(94, 94, 94)","#fff",e)} alt="黑色" />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ColorModal;