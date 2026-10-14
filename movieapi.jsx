//movieapi
import { useState } from "react";
function App() {
  const [movie, setMovie] = useState("");
  const [movies, setMovies] = useState([]);

  async function searchMovie() {
    const res = await fetch(
      `https://api.tvmaze.com/search/shows?q=${movie}`
    );

    const data = await res.json();
    setMovies(data);
  }

  return (
    <div>
      <h1>Movie Search</h1>

      <input
        type="text"
        placeholder="Enter movie name"
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
      />

      <button onClick={searchMovie}>Search</button>

      {movies.map((item) => (
        <div key={item.show.id}>
          <h2>{item.show.name}</h2>

          <p>Language: {item.show.language}</p>

          <p>Status: {item.show.status}</p>

          <p>Rating: {item.show.rating.average}</p>

          {item.show.image && (
            <img
              src={item.show.image.medium}
              alt={item.show.name}
            />
          )}
        </div>
      ))}
    </div>
  );
}


//quiz

import { useState } from "react";

function App() {
  const questions = [
    {
      question: "Which language is used in React?",
      options: ["Python", "JavaScript", "Java", "C"],
      answer: "JavaScript"
    },
    {
      question: "Which hook is used to store state?",
      options: ["useEffect", "useRef", "useState", "useMemo"],
      answer: "useState"
    },
    {
      question: "Which is used to create a React app?",
      options: ["Vite", "MySQL", "MongoDB", "Express"],
      answer: "Vite"
    }
  ];

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  function nextQuestion() {
    if (selected === "") {
      alert("Select an answer");
      return;
    }

    if (selected === questions[index].answer) {
      setScore(score + 1);
    }

    if (index === questions.length - 1) {
      setFinished(true);
    } else {
      setIndex(index + 1);
      setSelected("");
    }
  }

  return (
    <div>
      <h1>Quiz App</h1>

      {finished ? (
        <h2>
          Your Score: {score} / {questions.length}
        </h2>
      ) : (
        <div>
          <h3>{questions[index].question}</h3>

          {questions[index].options.map((option) => (
            <div key={option}>
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selected === option}
                onChange={() => setSelected(option)}
              />
              {option}
            </div>
          ))}

          <button onClick={nextQuestion}>
            {index === questions.length - 1
              ? "Submit"
              : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}

//todo
import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  function addTask() {
    if (task.trim() === "") {
      alert("Enter a task");
      return;
    }

    if (editIndex !== null) {
      const updated = [...todos];
      updated[editIndex].name = task;
      setTodos(updated);
      setEditIndex(null);
    } else {
      setTodos([...todos, { name: task, completed: false }]);
    }

    setTask("");
  }

  function deleteTask(index) {
    setTodos(todos.filter((_, i) => i !== index));
  }

  function editTask(index) {
    setTask(todos[index].name);
    setEditIndex(index);
  }

  function completeTask(index) {
    setTodos(
      todos.map((todo, i) =>
        i === index
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  return (
    <div>
      <h1>Todo List App</h1>

      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTask}>
        {editIndex !== null ? "Update" : "Add"}
      </button>

      {todos.map((todo, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => completeTask(index)}
          />

          <span>
            {todo.completed ? <s>{todo.name}</s> : todo.name}
          </span>

          <button onClick={() => editTask(index)}>
            Edit
          </button>

          <button onClick={() => deleteTask(index)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

//flight

import { useState } from "react";

function App() {
  const flights = [
    {
      id: 1,
      name: "IndiGo",
      from: "Chennai",
      to: "Bangalore",
      time: "09:00 AM",
      price: 3500
    },
    {
      id: 2,
      name: "Air India",
      from: "Chennai",
      to: "Mumbai",
      time: "11:00 AM",
      price: 5000
    },
    {
      id: 3,
      name: "SpiceJet",
      from: "Bangalore",
      to: "Chennai",
      time: "02:00 PM",
      price: 3000
    },
    {
      id: 4,
      name: "IndiGo",
      from: "Chennai",
      to: "Delhi",
      time: "06:00 PM",
      price: 6500
    },
    {
      id: 5,
      name: "Air India",
      from: "Mumbai",
      to: "Delhi",
      time: "08:00 AM",
      price: 4500
    }
  ];

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [result, setResult] = useState([]);

  function searchFlight() {
    const data = flights.filter(
      (f) =>
        f.from.toLowerCase() === from.toLowerCase() &&
        f.to.toLowerCase() === to.toLowerCase()
    );

    setResult(data);
  }

  return (
    <div>
      <h1>Flight Search App</h1>

      <input
        type="text"
        placeholder="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />

      <input
        type="text"
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />

      <button onClick={searchFlight}>Search</button>

      {result.length === 0 ? (
        <p>No flights found</p>
      ) : (
        result.map((f) => (
          <div key={f.id}>
            <h3>{f.name}</h3>
            <p>From: {f.from}</p>
            <p>To: {f.to}</p>
            <p>Departure: {f.time}</p>
            <p>Price: ₹{f.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

//joke

import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [jokes, setJokes] = useState([]);

  async function searchJokes() {
    if (search.trim() === "") {
      alert("Enter a keyword");
      return;
    }

    const res = await fetch(
      `https://icanhazdadjoke.com/search?term=${encodeURIComponent(search)}`,
      {
        headers: {
          Accept: "application/json"
        }
      }
    );

    const data = await res.json();
    setJokes(data.results);
  }

  return (
    <div>
      <h1>Joke Search App</h1>

      <input
        type="text"
        placeholder="Search jokes"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={searchJokes}>Search</button>

      {jokes.length === 0 ? (
        <p>No jokes found</p>
      ) : (
        jokes.map((joke) => (
          <div key={joke.id}>
            <p>{joke.joke}</p>
          </div>
        ))
      )}
    </div>
  );
}


//github user

import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  async function searchUser() {
    const res = await fetch(
      `https://api.github.com/users/${username}`
    );

    const data = await res.json();

    if (data.login) {
      setUser(data);
    } else {
      setUser(null);
      alert("User not found");
    }
  }

  return (
    <div>
      <h1>GitHub User Search</h1>

      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button onClick={searchUser}>Search</button>

      {user && (
        <div>
          <h2>{user.name || user.login}</h2>

          <img
            src={user.avatar_url}
            alt={user.login}
            width="100"
          />

          <p>Username: {user.login}</p>
          <p>Followers: {user.followers}</p>
          <p>Following: {user.following}</p>
          <p>Public Repositories: {user.public_repos}</p>

          <a href={user.html_url} target="_blank" rel="noreferrer">
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
}

//calculotr
import { useState } from "react";

function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState("");

  function calculate(op) {
    let x = Number(a);
    let y = Number(b);

    if (op === "+") setResult(x + y);
    if (op === "-") setResult(x - y);
    if (op === "*") setResult(x * y);
    if (op === "/") {
      setResult(y === 0 ? "Cannot divide by zero" : x / y);
    }
  }

  return (
    <div>
      <h1>Calculator</h1>
      <input value={a} onChange={e => setA(e.target.value)} placeholder="First number" />
      <input value={b} onChange={e => setB(e.target.value)} placeholder="Second number" />
      <button onClick={() => calculate("+")}>+</button>
      <button onClick={() => calculate("-")}>-</button>
      <button onClick={() => calculate("*")}>*</button>
      <button onClick={() => calculate("/")}>/</button>
      <h3>Result: {result}</h3>
    </div>
  );
}

//note

import { useState } from "react";

function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  function addNote() {
    if (note.trim() !== "") {
      setNotes([...notes, note]);
      setNote("");
    }
  }

  return (
    <div>
      <h1>Notes App</h1>
      <input value={note} onChange={e => setNote(e.target.value)} />
      <button onClick={addNote}>Add Note</button>

      {notes.map((n, i) => (
        <p key={i}>
          {n}
          <button onClick={() => setNotes(notes.filter((_, j) => j !== i))}>
            Delete
          </button>
        </p>
      ))}
    </div>
  );
}

//expense tracker

import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  function addExpense() {
    if (name.trim() && amount !== "" && Number(amount) > 0) {
      setExpenses([...expenses, { name, amount: Number(amount) }]);
      setName("");
      setAmount("");
    }
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div>
      <h1>Expense Tracker</h1>
      <input placeholder="Expense name" value={name} onChange={e => setName(e.target.value)} />
      <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <button onClick={addExpense}>Add</button>
      {expenses.map((e, i) => <p key={i}>{e.name}: ₹{e.amount}</p>)}
      <h3>Total: ₹{total}</h3>
    </div>
  );
}

//contact

import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contacts, setContacts] = useState([]);

  function addContact() {
    if (name.trim() && phone.trim()) {
      setContacts([...contacts, { name, phone }]);
      setName("");
      setPhone("");
    }
  }

  return (
    <div>
      <h1>Contact Book</h1>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
      <button onClick={addContact}>Add Contact</button>

      {contacts.map((c, i) => (
        <p key={i}>
          {c.name} - {c.phone}
          <button onClick={() => setContacts(contacts.filter((_, j) => j !== i))}>Delete</button>
        </p>
      ))}
    </div>
  );
}



//bmi

import { useState } from "react";

function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("");

  function calculate() {
    if (Number(weight) > 0 && Number(height) > 0) {
      setBmi((Number(weight) / (Number(height) * Number(height))).toFixed(2));
    } else {
      setBmi("Enter valid values");
    }
  }

  return (
    <div>
      <h1>BMI Calculator</h1>
      <input type="number" placeholder="Weight (kg)" value={weight} onChange={e => setWeight(e.target.value)} />
      <input type="number" placeholder="Height (metres)" value={height} onChange={e => setHeight(e.target.value)} />
      <button onClick={calculate}>Calculate</button>
      <h3>BMI: {bmi}</h3>
    </div>
  );
}

//news

import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [news, setNews] = useState([]);

  async function searchNews() {
    const res = await fetch(
      "https://hn.algolia.com/api/v1/search?query=" +
        encodeURIComponent(search)
    );

    const data = await res.json();
    setNews(data.hits);
  }

  return (
    <div>
      <h1>News App</h1>

      <input
        placeholder="Search news"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <button onClick={searchNews}>Search</button>

      {news.map((n, i) => (
        <div key={n.objectID || i}>
          <h3>{n.title || n.story_title || "Untitled"}</h3>

          <p>Author: {n.author}</p>

          <a
            href={n.url || n.story_url}
            target="_blank"
            rel="noreferrer"
          >
            Read News
          </a>
        </div>
      ))}
    </div>
  );
}

//form

import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function submitForm(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("All fields are required");
    } else if (!email.includes("@")) {
      setMessage("Enter a valid email");
    } else if (password.length < 6) {
      setMessage("Password must contain 6 characters");
    } else {
      setMessage("Form submitted successfully");
    }
  }

  return (
    <div>
      <h1>Form Validation</h1>
      <form onSubmit={submitForm}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

//book finder

import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);

  async function searchBooks() {
    const res = await fetch(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(search)}&limit=10`
    );
    const data = await res.json();
    setBooks(data.docs || []);
  }

  return (
    <div>
      <h1>Book Finder</h1>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Book title" />
      <button onClick={searchBooks}>Search</button>

      {books.map((b, i) => (
        <p key={b.key || i}>
          {b.title} - {b.author_name?.join(", ") || "Unknown author"}
        </p>
      ))}
    </div>
  );
}

//recipe

import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);

  async function findRecipe() {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(search)}`
    );
    const data = await res.json();
    setRecipes(data.meals || []);
  }

  return (
    <div>
      <h1>Recipe Finder</h1>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Enter recipe" />
      <button onClick={findRecipe}>Search</button>

      {recipes.map(r => (
        <div key={r.idMeal}>
          <h3>{r.strMeal}</h3>
          <p>{r.strCategory}</p>
          <img src={r.strMealThumb} alt={r.strMeal} width="100" />
        </div>
      ))}
    </div>
  );
}

//currency

import { useState } from "react";

function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [result, setResult] = useState("");

  async function convert() {
    if (amount === "" || Number(amount) < 0) {
      setResult("Enter a valid amount");
      return;
    }

    try {
      const res = await fetch(
        `https://open.er-api.com/v6/latest/${from}`
      );

      const data = await res.json();

      if (data.result === "success" && data.rates[to]) {
        setResult((Number(amount) * data.rates[to]).toFixed(2));
      } else {
        setResult("Conversion failed");
      }
    } catch {
      setResult("API error");
    }
  }

  return (
    <div>
      <h1>Currency Converter</h1>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />

      <p>From Currency:</p>
      <select value={from} onChange={e => setFrom(e.target.value)}>
        <option value="USD">US Dollar</option>
        <option value="INR">Indian Rupee</option>
        <option value="GBP">British Pound</option>
        <option value="EUR">Euro</option>
        <option value="SAR">Saudi Riyal</option>
      </select>

      <p>To Currency:</p>
      <select value={to} onChange={e => setTo(e.target.value)}>
        <option value="USD">US Dollar</option>
        <option value="INR">Indian Rupee</option>
        <option value="GBP">British Pound</option>
        <option value="EUR">Euro</option>
        <option value="SAR">Saudi Riyal</option>
      </select>

      <br />
      <br />

      <button onClick={convert}>Convert</button>

      <h3>Result: {result !== "" ? `${result} ${to}` : ""}</h3>
    </div>
  );
}

//dictionary

import { useState } from "react";

function App() {
  const [word, setWord] = useState("");
  const [words, setWords] = useState([]);

  async function searchWord() {
    if (word.trim() === "") {
      alert("Enter a word");
      return;
    }

    try {
      const res = await fetch(
        `https://api.datamuse.com/words?ml=${encodeURIComponent(word)}&max=10`
      );

      const data = await res.json();
      setWords(data);
    } catch {
      alert("API error");
    }
  }

  return (
    <div>
      <h1>Word Finder App</h1>

      <input
        type="text"
        placeholder="Enter a word"
        value={word}
        onChange={e => setWord(e.target.value)}
      />

      <button onClick={searchWord}>Search</button>

      {words.length === 0 && <p>No results found</p>}

      {words.map((item, index) => (
        <p key={index}>{item.word}</p>
      ))}
    </div>
  );
}






