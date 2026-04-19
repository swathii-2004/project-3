// src/components/HeroSection.tsx
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'

function HeroSection() {
    return (
        <section id="center">
            <div className="hero">
                <img src={reactLogo} className="framework" alt="React logo" />
                <img src={viteLogo} className="vite" alt="Vite logo" />
            </div>
            <div>
                <h1>Get started</h1>
                <p>Edit <code>src/App.tsx</code> and save to test HMR</p>
            </div>

        </section>
    )
}

export default HeroSection