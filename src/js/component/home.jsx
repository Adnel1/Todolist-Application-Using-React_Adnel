import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const [ inputValue, setImputValue ] = useState("");
	const [ todos, setTodos ] = useState([]);

	useEffect(() => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/adnel')
		.then(resp => resp.json())
		.then(data => {
			console.log(data);
			setTodos(data);
		})
		.catch(
			error => console.error("There was an error: ", error)
		)
	}, []);

	// This function pushes a todo item to the API
	function addTodo (newTodo) {
		let newTodos = [ ...todos, { label: newTodo, done: false } ];
		
		fetch('https://playground.4geeks.com/apis/fake/todos/user/adnel', {
			method: "PUT",
			body: JSON.stringify(newTodos),
			headers: {
				"Content-Type": "application/json"
			}
			})
			.then(resp => {
				console.log(resp.ok); // Will be true if the response is successful
				console.log(resp.status); // The status code=200 or code=400 etc.
				console.log(resp.text()); // Will try to return the exact result as a string
			})
			.then(data => {
				// Here is where your code should start after the fetch finishes
				setTodos(newTodos);
				console.log(data); // This will print on the console the exact object received from the server
			})
			.catch(error => {
				// Error handling
				console.log(error);
			});
	};

	// This function deletes a todo from the API
	function deleteTodo(index) {
		let newTodos = todos.filter((_, currentIndex) => index !== currentIndex);
		fetch('https://playground.4geeks.com/apis/fake/todos/user/adnel', {
			method: "PUT",
			body: JSON.stringify(newTodos),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(resp => {
			if (!resp.ok) throw Error(resp.statusText);
			return resp.json(); // Return JSON data from the response
		})
		.then(result => {
			setTodos(newTodos);
			console.log("Success", result);
		})
		.catch(error => {
			console.log(error);
		});
	};
	

	// Create a functionality that deletes the entire list from the API
	function deleteAll () {
		let emptyTodos = todos.filter((todo) => todo.label === 'Hidden');
		console.log(emptyTodos);
		fetch('https://playground.4geeks.com/apis/fake/todos/user/adnel', {
			method: "PUT",
			body: JSON.stringify(emptyTodos),
			headers: {
				"Content-Type": "application/json"
			}
			})
			.then(resp => {
				if (!resp.ok) throw Error(resp.statusText)
			})
			.then(result => {
				setTodos(emptyTodos);
				console.log("Success", result)
			})
			.catch(error => {
				console.log(error)
			});
	};

	return (
		<div className="container p-5">
			<div className="col-6 mx-auto">
				<div className="header">
					<div onClick={deleteAll} className="clear text-white">
						CLEAR
					</div>
				</div>
				<div className="p-3 add-to-do">
					<input className="text-center" type="text" 
					onChange={(event) => setImputValue(event.target.value)} 
					value={inputValue} 
					onKeyPress={(element) => {
						if (element.key === "Enter") {
							//setTodos(todos.concat(inputValue));
							if (inputValue === "") {
								return alert("Please type something into the imput field")
							} else {
								addTodo(inputValue);
								setImputValue("");
							}
						};
					}} 
					placeholder="What do you need to do?"></input>
				</div>
				<div className="content">
					<ul className="list-group list-group-flush">
						{todos.filter(todo => todo.label !== 'Hidden').map((item, index) => (
							<li className="list-group-item d-flex justify-content-between" key={index}>
								<span>{item.label}</span>
								<svg className="garbage" onClick={() =>
									deleteTodo(index)
								} width="10px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
									<path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
								</svg>
							</li>
						))}
					</ul>
					<div className="p-3"><strong>{todos.length - 1}</strong> Tasks</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
