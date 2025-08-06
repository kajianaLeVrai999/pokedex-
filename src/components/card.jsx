const Card = ({ pokemon, onPokemonClick }) => {
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
        <div
            onClick={() => onPokemonClick(pokemon)}
            className={`${bgColor} rounded-xl shadow-lg overflow-hidden border border-white/10 cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl hover:z-10`}
        >
            <div className="p-4 flex flex-col items-center">
                <span className="text-xs font-bold text-white/80">#{pokemon.id.toString().padStart(3, '0')}</span>

                <div className="relative w-24 h-24 my-2">
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
                    <img
                        className="relative z-10 w-full h-full object-contain"
                        src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default}
                        alt={pokemon.name}
                    />
                </div>

                <h3 className="text-lg font-bold text-white capitalize text-center">{pokemon.name}</h3>

                <div className="flex gap-2 mt-2">
                    {pokemon.types.map((type, index) => (
                        <span
                            key={index}
                            className={`${typeColors[type.type.name] || 'bg-gray-600'} px-2 py-0.5 rounded-full text-xs text-white font-bold`}
                        >
              {type.type.name}
            </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Card;