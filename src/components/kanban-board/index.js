import React, { useState } from "react";
import "./index.css";

const KanbanBoard = () => {
    const stagesNames = ["Backlog", "To Do", "Ongoing", "Done"];
    const [tasks, setTasks] = useState([
        { name: "task 0", stage: 0 },
        { name: "task 1", stage: 0 },
        { name: "task 2", stage: 0 },
        { name: "task 3", stage: 0 },
        { name: "task 4", stage: 1 },
        { name: "task 5", stage: 1 },
        { name: "task 6", stage: 1 },
        { name: "task 7", stage: 2 },
        { name: "task 8", stage: 2 },
        { name: "task 9", stage: 3 },
    ]);

    const moveToForward = (task) => {
        const taskscopy = [...tasks];
        const [_, index] = task.name.split(" ");

        const updatedTasks = taskscopy.map((task_item, idx) => {
            if (Number(idx) === Number(index)) {
                //Number(idx) 是将变量 idx 或者表达式 idx 转换为数字类型的操作。
                return { ...task_item, stage: task_item.stage + 1 }; //{ ...t } 是使用对象展开运算符创建 task_item 对象的一个浅拷贝副本。
                //         第一个 return 加花括号的原因：
                // 在第一个 return 语句中，当条件成立时，我们需要返回一个新的对象，而不是直接返回 task_item。
                // { ...task_item, stage: task_item.stage + 1 } 这行代码的作用是创建一个新对象，它包含了 task_item 对象的所有属性，
                // 并且，使用花括号里面第二个参数，更新了 stage属性task_item.stage 的值加上 1。这种写法确保了在进行对象属性更新时，不修改原始的 task_item 对象，而是返回一个新的对象副本，从而保持了数据的不可变性（immutability）。
            }
            return task_item;
            // return { ...task_item };//其实这么写也不会报错但是没必要
            // 第二个 return 不加花括号的原因：
            // 在第二个 return 语句中，我们只需要返回 task_item 本身，而不需要创建一个新对象。直接使用 return task_item; 就足够返回原始的 task_item 对象了，不需要额外的花括号来包裹。
        });

        setTasks(updatedTasks);
    };

    const moveToBack = (task) => {
        const taskscopy = [...tasks];
        const [_, index] = task.name.split(" ");
        taskscopy.forEach((item, idx) => {
            if (Number(idx) === Number(index)) {
                item.stage -= 1;
            }
        });
        taskscopy[index] = task;
        setTasks(taskscopy);
    };

    let stagesTasks = [];
    for (let i = 0; i < stagesNames.length; ++i) {
        stagesTasks.push([]);
    }
    //[ [], [], [], [] ]

    for (let task of tasks) {
        const stageId = task.stage;
        stagesTasks[stageId].push(task); //因为是js所以你必须要用push而非append，append是在python里面用的
    } // stageId used as index of array
    console.log(stagesTasks);
    return (
        <div className="mt-20 layout-column justify-content-center align-items-center">
            <div className="mt-50 layout-row">
                {stagesTasks.map((tasks, i) => {
                    return (
                        <div className="card outlined ml-20 mt-0" key={`${i}`}>
                            <div className="card-text">
                                <h4>{stagesNames[i]}</h4>
                                <ul
                                    className="styled mt-50"
                                    data-testid={`stage-${i}`}
                                >
                                    {tasks.map((task, index) => {
                                        return (
                                            <li
                                                className="slide-up-fade-in"
                                                key={`${i}${index}`} //如果你在浏览器的开发者工具中查看生成的 HTML 结构，并不会看到 key 属性。这是因为 key 是 React 在渲染过程中使用的工具，并不是作为最终渲染输出的一部分。
                                            >
                                                <div className="li-content layout-row justify-content-between align-items-center">
                                                    <span
                                                        data-testid={`${task.name
                                                            .split(" ")
                                                            .join("-")}-name`}
                                                    >
                                                        {task.name}
                                                    </span>
                                                    <div className="icons">
                                                        <button
                                                            disabled={
                                                                task.stage === 0
                                                            }
                                                            onClick={() =>
                                                                moveToBack(task)
                                                            }
                                                            className="icon-only x-small mx-2"
                                                            data-testid={`${task.name
                                                                .split(" ")
                                                                .join(
                                                                    "-"
                                                                )}-back`}
                                                        >
                                                            <i className="material-icons">
                                                                arrow_back
                                                            </i>
                                                        </button>
                                                        <button
                                                            disabled={
                                                                task.stage ===
                                                                stagesNames.length -
                                                                    1
                                                            }
                                                            onClick={() =>
                                                                moveToForward(
                                                                    task
                                                                )
                                                            }
                                                            className="icon-only x-small mx-2"
                                                            data-testid={`${task.name
                                                                .split(" ")
                                                                .join(
                                                                    "-"
                                                                )}-forward`}
                                                        >
                                                            <i className="material-icons">
                                                                arrow_forward
                                                            </i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default KanbanBoard;
