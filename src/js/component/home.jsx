import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const storedTodos = JSON.parse(localStorage.getItem("todos"));

	const [ inputValue, setImputValue ] = useState("");
	const [ todos, setTodos ] = useState(storedTodos);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	return (
		<div className="container p-5">
			<div className="col-6 mx-auto">
				<div className="header">
					<div onClick={() => setTodos([])} className="clear text-white">
						CLEAR
					</div>
				</div>
				<div className="p-3 add-to-do">
					<input type="text" 
					onChange={(element) => setImputValue(element.target.value)} 
					value={inputValue} 
					onKeyPress={(element) => {
						if (element.key === "Enter") {
							setTodos(todos.concat(inputValue));
							setImputValue("");
						};
					}} 
					placeholder="What do you need to do?"></input>
				</div>
				<div className="content">
					<ul className="list-group list-group-flush">
						{todos.map((item, index) => (
							<li className="list-group-item d-flex justify-content-between">
								<span>{item}</span>
								<svg className="garbage" onClick={() => 
									setTodos(
										todos.filter(
											(t, currentIndex) => 
												index != currentIndex
										)
									)
								} width="10px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
									<path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
								</svg>
							</li>
						))}
					</ul>
					<div className="p-3"><strong>{todos.length}</strong> Tasks</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
