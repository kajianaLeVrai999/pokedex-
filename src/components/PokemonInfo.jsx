const PokemonInfo = ({ pokemon }) => {
    if (!pokemon) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-6 rounded-xl bg-gray-800/50 border border-purple-500/20">
                <div className="relative">
                    <div className="absolute -inset-4 bg-purple-500/10 rounded-full blur-md"></div>
                    <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/54.gif"
                        alt="Psyduck"
                        className="relative h-24 mb-4"
                    />
                </div>
                <p className="text-xl font-medium text-purple-400 text-center">Sélectionnez un Pokémon</p>
                <p className="text-gray-400 mt-1 text-sm text-center">Cliquez sur une carte</p>
            </div>
        );
    }

    const typeColors = {
        normal: 'bg-gray-500',
        fire: 'bg-orange-500',
        water: 'bg-blue-500',
        electric: 'bg-yellow-400',
        grass: 'bg-green-500',
        ice: 'bg-cyan-300',
        fighting: 'bg-red-600',
        poison: 'bg-purple-500',
        ground: 'bg-amber-600',
        flying: 'bg-indigo-400',
        psychic: 'bg-pink-500',
        bug: 'bg-lime-500',
        rock: 'bg-amber-700',
        ghost: 'bg-indigo-700',
        dragon: 'bg-gradient-to-r from-indigo-600 to-red-500',
        dark: 'bg-gray-800',
        steel: 'bg-gray-400',
        fairy: 'bg-pink-300',
    };

    const primaryType = pokemon.types[0]?.type?.name || 'normal';
    const bgColor = typeColors[primaryType] || 'bg-gray-600';

    return (
        <div className={`${bgColor} rounded-xl shadow-xl overflow-hidden border border-white/10`}>
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-white/80 font-mono text-sm">#{pokemon.id.toString().padStart(3, '0')}</span>
                    <h1 className="text-2xl font-bold text-white uppercase text-center">
                        {pokemon.name}
                    </h1>
                </div>

                <div className="flex justify-center my-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-lg"></div>
                        <img
                            className="relative z-10 w-48 h-48 object-contain"
                            src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default}
                            alt={pokemon.name}
                        />
                    </div>
                </div>

                <div className="flex justify-center gap-3 mb-6">
                    {pokemon.types.map((t, index) => (
                        <span
                            key={index}
                            className={`${typeColors[t.type.name] || 'bg-gray-600'} px-4 py-1 text-white font-bold rounded-full text-xs uppercase`}
                        >
              {t.type.name}
            </span>
                    ))}
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
                    <h2 className="text-lg font-bold text-white mb-3 text-center">STATS</h2>
                    <div className="space-y-3">
                        {pokemon.stats.map((stat) => (
                            <div key={stat.stat.name}>
                                <div className="flex justify-between text-xs text-white mb-1">
                                    <span className="capitalize">{stat.stat.name.replace('-', ' ')}</span>
                                    <span className="font-bold">{stat.base_stat}</span>
                                </div>
                                <div className="w-full bg-white/20 rounded-full h-2">
                                    <div
                                        className="bg-white h-2 rounded-full"
                                        style={{ width: `${Math.min(100, (stat.base_stat / 255) * 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center gap-6 text-white">
                    <div className="text-center">
                        <p className="text-sm opacity-80">Poids</p>
                        <p className="text-lg font-bold">{(pokemon.weight / 10).toFixed(1)} kg</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm opacity-80">Taille</p>
                        <p className="text-lg font-bold">{(pokemon.height / 10).toFixed(1)} m</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonInfo;