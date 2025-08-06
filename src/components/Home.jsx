import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './card';
import PokemonInfo from './PokemonInfo';

const Home = () => {
    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pokemonSelected, setPokemonSelected] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=120');
                const pokemonData = await Promise.all(
                    res.data.results.map(async (item) => {
                        const result = await axios.get(item.url);
                        return result.data;
                    })
                );
                setPokeData(pokemonData.sort((a, b) => a.id - b.id));
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredPokemon = pokeData.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-gray-100">
            <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-purple-500/20 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
                            alt="Pokémon"
                            className="h-10"
                        />
                    </div>

                    <div className="relative w-64">
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-800/70 border border-purple-400/30 focus:outline-none focus:ring-2 focus:ring-purple-400/50 text-white placeholder-gray-400"
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg className="absolute left-3 top-2.5 h-5 w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className={`lg:w-2/3 ${pokemonSelected ? 'lg:pr-4' : ''}`}>
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-pulse flex flex-col items-center">
                                    <div className="h-20 w-20 bg-purple-500/20 rounded-full flex items-center justify-center">
                                        <div className="h-12 w-12 bg-purple-500/30 rounded-full animate-spin"></div>
                                    </div>
                                    <p className="mt-4 text-lg font-medium text-purple-300">Chargement...</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold text-white mb-4">
                                    {filteredPokemon.length} Pokémon
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {filteredPokemon.map(pokemon => (
                                        <Card
                                            key={pokemon.id}
                                            pokemon={pokemon}
                                            onPokemonClick={setPokemonSelected}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {pokemonSelected && (
                        <div className="lg:w-1/3 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto">
                            <PokemonInfo pokemon={pokemonSelected} />
                        </div>
                    )}
                </div>
            </main>

            <footer className="bg-gray-900/80 border-t border-purple-500/20 py-4 text-center text-sm text-gray-400">
                <p>Pokédex - © {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
};

export default Home;