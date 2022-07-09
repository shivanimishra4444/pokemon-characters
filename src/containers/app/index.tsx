import 'bootstrap/dist/css/bootstrap.css';

import PokemonLogo from '@/assets/logo.png'
import './app.scss'



const App = () => {

    return (
        <section className='app'>
            <header className="app__global-header" role="banner">
			        <div className="app__global-header__title">
				        <h1 className="app__global-header__site-name">
                            <img src={PokemonLogo} alt="Pokemon" width="130" />
                        </h1>
			        </div>
	        </header>
        </section>
    )
}

export default App