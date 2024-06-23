import { useState, useRef, useEffect } from 'react'
import './style.css'

function App() {
  //console logging every time the component is rendered
  console.log('App component rendered')
  // Create state variables for name, email, and password for our first form
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Create a ref for each input element, pass the ref to the input element, and use the ref to access the input DOM element (in the second form)
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  //ref for the blue box element
  const boxRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Focus on the name input field in the second form when the component mounts
  useEffect(() => {
    if (nameRef.current){
      nameRef.current.focus()
    }
  }, [])

  //handling input change of the first form using state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    }else if (name === 'email') {
      setEmail(value);
    }else if (name === 'password') {
      setPassword(value);
    }
  }
  //handling form submit of the first form using state
  const handleStateSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      alert('Please fill in all fields');
    } else {
      alert('Form submitted: ' + name + ' ' + email + ' ' + password);
      setName('');
      setEmail('');
      setPassword('');
    }
  }
    
  //handling form submit of the second form using useRef
  const handleRefSubmit = (e) => {
    e.preventDefault();
    if (nameRef.current.value === '' || emailRef.current.value === '' || passwordRef.current.value === '') {
      alert('Please fill in all fields');
    } else {
      alert('Form submitted: ' + nameRef.current.value + ' ' + emailRef.current.value + ' ' + passwordRef.current.value);
      nameRef.current.value = '';
      emailRef.current.value = '';
      passwordRef.current.value = '';
    }
  };
  //using useRef to start and stop animation by adding and removing the animate class
  const startAnimation = () => {
    if (boxRef.current) {
      boxRef.current.classList.add('animate');
      setTimeout(() => {
        boxRef.current.classList.remove('animate');
      }, 1000); // Remove animation class after 1 second (adjust as needed)
    }
  };
  //using useRef to measure the width and height of the blue box element
  const measureBox = () => {
    const { clientWidth, clientHeight } = boxRef.current;
    setDimensions({ width: clientWidth, height: clientHeight });
  };
  //using useRef to change the width of the blue box element
  const changeBox = () => {
    if (boxRef.current.clientWidth === 200) {
      boxRef.current.style.width = '100px';
    }else{
      boxRef.current.style.width = '200px';
    }
  }
 

  return (
    <>
      <main className="main-container">

        <h2>Form Handling Using State</h2>
        <form className="form-container" onSubmit={handleStateSubmit}>
          <input onChange={handleInputChange} type="text" placeholder="Enter your name" className="form-input" name='name' value={name}/>
          <p>entered name: {name}</p>
          <input onChange={handleInputChange} type="email" placeholder="Enter your email" className="form-input" name='email' value={email}/>
          <input onChange={handleInputChange} type="password" placeholder="Enter your password" className="form-input" name='password' value={password}/>
          <button  type="submit" className="form-button">Submit</button>
        </form>

        <h2>Form Handling Using useRef</h2>
        <form className="form-container" onSubmit={handleRefSubmit}>
          <input ref={nameRef} type="text" placeholder="Enter your name" className="form-input" />

          {/* the following p tag wont render anything until a re-render occurs, which isn't what we want if we want our UI to be updated in real time */}

          {/* <p>entered name: {nameRef.current?.value}</p> */}
          <input ref={emailRef} type="email" placeholder="Enter your email" className="form-input" />
          <input ref={passwordRef} type="password" placeholder="Enter your password" className="form-input" />
          <button  type="submit" className="form-button">Submit</button>
          <button className='focusButton' onClick={() => { nameRef.current.focus() }} type="button" >Focus Name</button>
          <button className='focusButton' onClick={() => { emailRef.current.focus() }} type="button" >Focus Email</button>
          <button className='focusButton' onClick={() => { passwordRef.current.focus() }} type="button" >Focus Password</button>
        </form>
        

        <div className="animation-container">
          {/* Blue box element */}
          <div ref={boxRef} className="box"></div>
          <button onClick={startAnimation} className="button">Start Animation</button>
        </div>

        <form className="form-container"> 
          <p>box width: {dimensions.width}</p>
          <p>box height: {dimensions.height}</p>
        </form>
        {/* when we click this button, the width and height of the blue box will be measured and displayed above.  the measureBox function uses state, which is why the width and height are displayed when this button is clicked. */}
        <button onClick={measureBox} className="button">
        Measure Box
      </button>
      <button onClick={changeBox} className="button">
        Change Box
      </button>
      </main>
    </>
  )
}

export default App



