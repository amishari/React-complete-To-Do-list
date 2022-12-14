import React, { useState } from 'react';
import './styles.css';

export default function App() {
	const [lists, setLists] = useState([]);
	const [entered, setEntered] = useState('');
	const [editing, setEditing] = useState(null);
	const [edited, setEdited] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		const newList = {
			id: new Date().getTime(),
			text: entered,
			completed: false
		};
		setLists((preList) => {
			const updated = [...preList];
			updated.unshift(newList);
			return updated;
		});
		setEntered('');
	};

	const inputHandler = (event) => {
		setEntered(event.target.value);
	};

	const delHandler = (id) => {
		setLists((prevList) => {
			const updatedList = prevList.filter((list) => list.id !== id);
			return updatedList;
		});
	};
	const toggleCompleted = (id) => {
		// setLists((prevList) => {
		const updatedList = [...lists].map((list) => {
			if (list.id === id) {
				list.completed = !list.completed;
			}
			return list;
		});
		setLists(updatedList);
	};
	// };

	const editHandler = (id) => {
		const updatedList = [...lists].map((list) => {
			if (list.id === id) {
				list.text = edited;
			}
			return list;
		});
		setLists(updatedList);
		setEditing(null);
		setEdited('');
	};

	let content = <p>Nothing found. Maybe add one?</p>;
	if (lists.length > 0) {
		content = (
			<>
				{lists.map((list) => (
					<div key={list.id}>
						{editing === list.id ? (
							<input
								type="text"
								onChange={(e) => setEdited(e.target.value)}
								value={edited}
								autoFocus
							/>
						) : (
							<div>{list.text}</div>
						)}

						<button onClick={() => delHandler(list.id)}>Delete</button>
						<input
							type="checkbox"
							onChange={() => toggleCompleted(list.id)}
							checked={list.completed}
						/>
						{editing === list.id ? (
							<button onClick={() => editHandler(list.id)}>Save</button>
						) : (
							<button onClick={() => setEditing(list.id)}>Edit</button>
						)}
					</div>
				))}
			</>
		);
	}

	return (
		<div className="App">
			<form onSubmit={submitHandler}>
				<input type="text" onChange={inputHandler} value={entered} autoFocus />
				<button type="submit">Add</button>
			</form>
			{content}
		</div>
	);
}
