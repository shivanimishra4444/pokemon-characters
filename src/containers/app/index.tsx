import 'bootstrap/dist/css/bootstrap.css';
import Route from '../route';
import { BrowserRouter as Router } from 'react-router-dom';
import PokemonLogo from '@/assets/logo.png'
import './app.scss'


const App = () => {
    return (
        <div className='app'>
            <header className="app__global-header" role="banner">
                <div className="app__global-header__title">
                    <h1 className="app__global-header__site-name">
                        <img src={PokemonLogo} alt="Pokemon" width="130" />
                    </h1>
                </div>
            </header>
            <Router>
                <Route />
            </Router>
        </div>
    );
};

export default App;
