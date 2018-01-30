import Logo from './components/Logo.js';
import RegistrationForm from './components/Registration.js';
import Welcome from './components/Welcome.js';
import './css/index.css';

const App = () => (
    <div className="container">
        <Logo />
        <Welcome />
        <RegistrationForm />
    </div>,
  )

export default App;